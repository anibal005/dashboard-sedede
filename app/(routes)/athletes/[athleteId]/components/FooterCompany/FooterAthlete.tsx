"use client"

import { useRouter } from "next/navigation";

import axios from "axios";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FooterCompanyProps } from "./FooterAthlete.types";
import { useToast } from '@/hooks/use-toast'
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useState, useTransition } from "react";
// import { toast } from "@/components/ui/use-toast";

export function FooterAthlete(props: FooterCompanyProps) {
    const { athleteId } = props
    const router = useRouter();
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [deletingId, setDeletingId] = useState<string | null>(null)


    const onDeleteathlete = async () => {
        try {
            setDeletingId(athleteId)
            await axios.delete(`/api/athletes/${athleteId}`)
            startTransition(() => {
                router.push("/athletes");
            })
            toast({
                title: "Atleta eliminado",
                description: "El Atleta fue eliminado correctamente.",
            })
        } catch (error) {
            toast({
                title: "Error al eliminar",
                description: "Hubo un problema al intentar eliminar el Atleta.",
                variant: "destructive",
            })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="flex justify-end mt-5">

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash className="w-4 h-4 mr-2" />
                        Eliminar Atleta
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar a este atleta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => onDeleteathlete()}
                            disabled={isPending && deletingId === athleteId}
                        >
                            {isPending && deletingId === athleteId
                                ? "Eliminando..."
                                : "Confirmar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
