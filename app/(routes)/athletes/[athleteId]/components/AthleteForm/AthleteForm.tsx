"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

import { UploadButton } from "@/utils/uploadthing"

import { AthleteFormProps } from "./AthleteForm.types"
import { formSchema } from "./AthleteForm.form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export function AthleteForm(props: AthleteFormProps) {
    const { athlete } = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: athlete.name,
            discipline: athlete.discipline,
            asociation: athlete.asociation,
            category: athlete.category,
            elite: athlete.elite,
            profileImage: athlete.profileImage,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/athletes/${athlete.id}`, values)
            toast({
                title: "Atleta actualizado!"
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Algo salio mal",
                variant: "destructive"
            })
        }
    }
    const { isValid } = form.formState

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre competo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del atleta..." type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discipline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diciplina</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionala diciplina..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ajedrez">Ajederez</SelectItem>
                                            <SelectItem value="atletismo">Atletismo</SelectItem>
                                            <SelectItem value="batminton">Batminton</SelectItem>
                                            <SelectItem value="basquetbol">Basquetbol</SelectItem>
                                            <SelectItem value="boxeo">Boxeo</SelectItem>
                                            <SelectItem value="deporte_integrado">Derporte Integrado</SelectItem>
                                            <SelectItem value="esgrima">Esgrima</SelectItem>
                                            <SelectItem value="fisiculturismo">Fisiculturismo</SelectItem>
                                            <SelectItem value="futsal">Futsal</SelectItem>
                                            <SelectItem value="gimnasia">Gimnasia</SelectItem>
                                            <SelectItem value="karate">Karate</SelectItem>
                                            <SelectItem value="karting">Karting</SelectItem>
                                            <SelectItem value="kickboxing">Kickboxing</SelectItem>
                                            <SelectItem value="kun_fu">Kun fu</SelectItem>
                                            <SelectItem value="lucha_olimpica">Lucha Olimpica</SelectItem>
                                            <SelectItem value="no_videntes">No videntes</SelectItem>
                                            <SelectItem value="natacion">Natacion</SelectItem>
                                            <SelectItem value="pelota_fronton">Pelota Fronton</SelectItem>
                                            <SelectItem value="raquetbol">Raquetbol</SelectItem>
                                            <SelectItem value="squash">Squash</SelectItem>
                                            <SelectItem value="tenis">Tenis</SelectItem>
                                            <SelectItem value="tenis_mesa">Tenis de mesa</SelectItem>
                                            <SelectItem value="triatlon">Triatlon</SelectItem>
                                            <SelectItem value="voleibol">Voleibol</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="asociation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Asociacion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingrese la asociacion..." type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Categoria..." type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="elite"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Atleta de elite</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(value === "si")}
                                            defaultValue={field.value ? "si" : "no"}
                                            className="flex space-x-4"
                                        >
                                            <FormItem className="flex items-center space-x-2">
                                                <RadioGroupItem value="si" id="elite-si" />
                                                <FormLabel htmlFor="elite-si" className="font-normal">
                                                    SI
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="elite-no" />
                                                <FormLabel htmlFor="elite-no" className="font-normal">
                                                    NO
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fotografia</FormLabel>
                                    <FormControl>
                                        {photoUploaded ? (
                                            <p className="text-sm">Imagen subida!</p>
                                        ) : (
                                            <UploadButton
                                                className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                                                {...field}
                                                endpoint="profileImage"
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("profileImage", res?.[0].url)
                                                    toast({
                                                        title: "Imagen Subida!"
                                                    })
                                                    setPhotoUploaded(true)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        title: "Error al subir la foto"
                                                    })
                                                }}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button type="submit" disabled={!isValid}>Actualizar</Button>
                </form>
            </Form>
    )
}
