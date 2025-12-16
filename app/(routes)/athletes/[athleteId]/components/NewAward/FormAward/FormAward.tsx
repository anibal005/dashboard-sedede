"use client"

import { useParams, useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import axios from 'axios'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Toast } from '@/components/ui/toast'


import { formSchema } from "./FormAward.form"
import { FormAwardProps } from "./FormAward.types"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"



export function FormAward(props: FormAwardProps) {
    const { setOpen } = props;
    const { toast } = useToast()

    const params = useParams<{ athleteId: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            date: undefined
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/athletes/${params.athleteId}/award`, values)
            toast({ title: "Logro guardado!" })
            router.refresh()
            setOpen(false)
        } catch (error) {
            toast({
                title: "Algo salio mal",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
                {/* Fila 1: Logro y Fecha */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logro</FormLabel>
                            <FormControl>
                                <Input placeholder="Logro obtenido" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha del logro</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                    value={field.value ? field.value.toISOString().slice(0, 10) : ""}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Fila 2: Descripción en una sola columna */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Descripción del logro</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Botón */}
                <div className="md:col-span-2">
                    <Button
                        type="submit"
                        className="w-full md:w-auto"
                        disabled={!form.formState.isValid}
                    >
                        Guardar logro
                    </Button>
                </div>
            </form>
        </Form>
    )
}
