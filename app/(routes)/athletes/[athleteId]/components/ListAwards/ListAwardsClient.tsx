'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'
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
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

export function ListAwardsClient({
  awards,
  athleteId
}: {
  awards: any[],
  athleteId: string
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(awardId: string) {
    try {
      setDeletingId(awardId)
      await axios.delete(`/api/awards/${awardId}`)
      startTransition(() => {
        router.refresh()
      })
      toast({
        title: "Logro eliminado",
        description: "El logro fue eliminado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al intentar eliminar el logro.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (awards.length === 0) {
    return <p>Actualmente no tiene ningún logro</p>
  }

  return (
    <div>
  {/* Encabezado */}
  <div className="grid grid-cols-[2fr_1fr_1.5fr_100px] p-2 px-4 mt-4 mb-2 rounded-lg bg-slate-400/20 items-center">
    <p className="font-semibold text-left">Logro</p>
    <p className="font-semibold text-center">Fecha</p>
    <p className="font-semibold text-right">Detalle</p>
    <div className="flex justify-center items-center">
      <p className="font-semibold text-center">Acción</p>
    </div>
  </div>

  {/* Fila por cada logro */}
  {awards.map((award) => (
    <div key={award.id}>
      <div className="grid grid-cols-[2fr_1fr_1.5fr_100px] px-4 gap-x-3 items-center text-center">
        <p
          className="truncate overflow-hidden whitespace-nowrap text-left"
          title={award.name}
        >
          {award.name}
        </p>
        <p>
          {new Date(award.date).toLocaleDateString("es-BO")}
        </p>
        <p
          className="truncate overflow-hidden whitespace-nowrap text-right"
          title={award.description}
        >
          {award.description}
        </p>

        <div className="flex justify-center items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full hover:scale-105 transition-transform"
                title="Eliminar logro"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar este logro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(award.id)}
                  disabled={isPending && deletingId === award.id}
                >
                  {isPending && deletingId === award.id ? "Eliminando..." : "Confirmar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Separator className="my-3" />
    </div>
  ))}
</div>
  )
}