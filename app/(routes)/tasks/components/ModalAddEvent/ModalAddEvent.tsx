"use client"

import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog'

import { ModalAddEventProps } from "./ModalAddEvent.types";
import { FormEvent } from '../FormEvent';

export function ModalAddEvent(props: ModalAddEventProps) {
    const { open, athletes, setNewEvent, setOnSaveNewEvent, setOpen } = props

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[425px'>
                <DialogHeader>
                    <DialogTitle>Agregar nuevo evento</DialogTitle>
                </DialogHeader>
                <FormEvent setOnSaveNewEvent={setOnSaveNewEvent}
                    athletes={athletes}
                    setNewEvent={setNewEvent}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}