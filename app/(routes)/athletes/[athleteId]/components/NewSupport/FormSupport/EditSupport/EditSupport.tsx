"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormSupport } from "../FormSupport"
import { Pencil } from "lucide-react"




export function EditSupport({supportId}: {supportId: string}) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:scale-105 transition-transform"
                title="Editar apoyo"
                onClick={() => { }} // 👈 tu función para editar
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Editar apoyo</DialogTitle>
                    <DialogDescription>
                        Edita los apoyos si hubo algun error.
                    </DialogDescription>
                </DialogHeader>
                <FormSupport setOpen={setOpen} supportId={supportId}/>
            </DialogContent>
        </Dialog>
    )
}
