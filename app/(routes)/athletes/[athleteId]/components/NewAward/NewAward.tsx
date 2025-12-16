"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormAward } from "./FormAward"


export function NewAward() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Agregar nuevo logro</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Agregar nuevo logro</DialogTitle>
                    <DialogDescription>
                        Agrega nuevos logros para gestionarlos más tarde.
                    </DialogDescription>
                </DialogHeader>
                <FormAward setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
