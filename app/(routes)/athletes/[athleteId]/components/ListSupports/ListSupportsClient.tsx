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
import { Edit, Pencil, Trash } from 'lucide-react'
import { EditSupport } from '../NewSupport/FormSupport/EditSupport/EditSupport';

export function ListSupportsClient({
  supports, athleteId
}: {
  supports: any[],
  athleteId: string
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(supportId: string) {
    try {
      setDeletingId(supportId)
      await axios.delete(`/api/athletes/${athleteId}/support/${supportId}`)
      startTransition(() => {
        router.refresh()
      })
      toast({
        title: "Apoyo eliminado",
        description: "El apoyo fue eliminado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al intentar eliminar el apoyo.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (supports.length === 0) {
    return <p>Actualmente no tiene ningún apoyo</p>
  }

  return (
    <div>
      {/* Encabezado */}
      <div className="grid grid-cols-[2fr_1fr_1.5fr_2fr_100px] p-2 px-4 mt-4 mb-2 rounded-lg bg-slate-400/20 items-center">
        <p className="font-semibold text-left">Apoyo</p>
        <p className="font-semibold text-center">Fecha</p>
        <p className="font-semibold text-center">Monto Bs.</p>
        <p className="font-semibold text-center">Detalle</p>
        <div className="flex justify-center items-center">
          <p className="font-semibold text-center">Acción</p>
        </div>
      </div>

      {/* Filas */}
      {supports.map((support) => (
        <div key={support.id}>
          <div className="grid grid-cols-[2fr_1fr_1.5fr_2fr_100px] px-4 gap-x-3 items-center">
            {/* Apoyo */}
            <p
              className="truncate overflow-hidden whitespace-nowrap text-left"
              title={support.name}
            >
              {support.name}
            </p>

            {/* Fecha */}
            <p className="text-center">
              {new Date(support.date).toLocaleDateString("es-BO")}
            </p>

            {/* Monto */}
            <p
              className="truncate overflow-hidden whitespace-nowrap text-center"
              title={support.amount}
            >
              {support.amount}
            </p>

            {/* Detalle */}
            <p
              className="truncate overflow-hidden whitespace-nowrap text-left"
              title={support.description}
            >
              {support.description}
            </p>

            {/* Acción */}
            <div className="flex justify-center items-center gap-2">
              <EditSupport supportId={support.id}/>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full hover:scale-105 transition-transform"
                    title="Eliminar apoyo"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar este apoyo?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(support.id)}
                      disabled={isPending && deletingId === support.id}
                    >
                      {isPending && deletingId === support.id
                        ? "Eliminando..."
                        : "Confirmar"}
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