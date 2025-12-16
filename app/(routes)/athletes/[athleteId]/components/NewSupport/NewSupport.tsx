"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormSupport } from "./FormSupport"



export function NewSupport() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Agregar nuevo apoyo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Agregar nuevo apoyo</DialogTitle>
                    <DialogDescription>
                        Agrega nuevos apoyos para gestionarlos más tarde.
                    </DialogDescription>
                </DialogHeader>
                <FormSupport setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
