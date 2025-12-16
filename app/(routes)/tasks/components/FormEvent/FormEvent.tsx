"use client"

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Button } from "@/components/ui/button";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'

import { FormEventProps } from "./FormEvent.types";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    eventName: z.string()
        .min(3, { message: "El nombre del evento debe tener al menos 3 caracteres." })
        .max(200, { message: "El nombre del evento no puede superar los 200 caracteres." }),
    athleteSelected: z.object({
        name: z.string()
            .min(3, { message: "Debe seleccionar al deportista." }),
        id: z.string()
    })
})

export function FormEvent(props: FormEventProps) {
    const { athletes, setNewEvent, setOnSaveNewEvent, setOpen } = props
    const [selectedAthlete, setSelectedAthlete] = useState({
        name: "",
        id: ""
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            athleteSelected: {
                name: "",
                id: ""
            }
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setNewEvent(values)
        setOpen(false)
        setOnSaveNewEvent(true)
    }

    const handleAthleteChange = (newValue: string) => {
        const selectedAthlete = athletes.find(athlete => athlete.name === newValue)
        if (selectedAthlete) {
            setSelectedAthlete({
                name: selectedAthlete.name,
                id: selectedAthlete.id
            })
            form.setValue("athleteSelected.name", selectedAthlete.name)
            form.setValue("athleteSelected.id", selectedAthlete.id)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Escribe una descripción del evento..."
                                    className="min-h-[70px]" // 👈 para que tenga buena altura
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Este es el nombre o la descripción del evento.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="athleteSelected.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del deportista</FormLabel>
                            <Select onValueChange={(newValue) => {
                                field.onChange(newValue)
                                handleAthleteChange(newValue)
                            }} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona al deportista" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {athletes.map((athlete) => (
                                        <SelectItem key={athlete.id} value={athlete.name}>
                                            {athlete.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Crear evento</Button>
            </form>
        </Form>
    )
}