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

import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"


// tu esquema
const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    amount: z.number().min(0),
    date: z.date().optional()
})

type FormSupportProps = {
    setOpen: (open: boolean) => void
    supportId?: string // 👈 opcional
}

export function FormSupport({ setOpen, supportId }: FormSupportProps) {
    const { toast } = useToast()
    const params = useParams<{ athleteId: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            amount: 0,
            date: undefined
        }
    })

    // 👇 Si hay supportId → traer datos para precargar
    useEffect(() => {
        const fetchSupport = async () => {
            if (supportId) {
                try {
                    const { data } = await axios.get(
                        `/api/athletes/${params.athleteId}/support/${supportId}`
                    )
                    form.reset({
                        name: data.name,
                        description: data.description,
                        amount: data.amount,
                        date: data.date ? new Date(data.date) : undefined
                    })
                } catch (error) {
                    toast({
                        title: "No se pudo cargar el apoyo",
                        variant: "destructive"
                    })
                }
            }
        }
        fetchSupport()
    }, [supportId, params.athleteId, form, toast])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (supportId) {
                // editar
                await axios.put(
                    `/api/athletes/${params.athleteId}/support/${supportId}`,
                    values
                )
                toast({ title: "Apoyo actualizado!" })
            } else {
                // crear
                await axios.post(
                    `/api/athletes/${params.athleteId}/support`,
                    values
                )
                toast({ title: "Apoyo guardado!" })
            }

            router.refresh()
            setOpen(false)
        } catch (error) {
            toast({
                title: "Algo salió mal",
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
                        <FormItem className="md:col-span-2">
                            <FormLabel>Nombre del apoyo</FormLabel>
                            <FormControl>
                                <Input placeholder="El apoyo es debido a...." {...field} />
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
                            <FormLabel>Fecha del apoyo</FormLabel>
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
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto en Bs.</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Monto a apoyar Bs....."
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))} // 👈 convertir a number
                                    onFocus={(e) => e.target.select()}
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
                            <FormLabel>Descripción del Apoyo</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción del apoyo económico..." {...field} />
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
                        {supportId ? "Actualizar apoyo" : "Guardar apoyo"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
