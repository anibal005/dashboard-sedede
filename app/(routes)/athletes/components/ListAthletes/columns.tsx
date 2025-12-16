"use client"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"

import { Athlete } from "@prisma/client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"


import Link from 'next/link'
import Image from 'next/image'

export const columns: ColumnDef<Athlete>[] = [
    {
        accessorKey: "profileImage",
        header: "Imagen de perfil",
        cell: ({ row }) => {
            const image = row.getValue("profileImage")
            const imageUrl = image && typeof image === 'string' && image.trim() !== "" ? image : "/images/user-icon.png"
    
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Image 
                            src={imageUrl}
                            width={40}
                            height={40}
                            alt="Image"
                            className="w-10 h-10 rounded-full cursor-pointer object-cover"
                        />
                    </DialogTrigger>
                    <DialogContent className="flex justify-center items-center">
                        <Image 
                            src={imageUrl}
                            width={300}
                            height={300}
                            alt="Image ampliada"
                            className="rounded-xl object-contain"
                        />
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Nombre
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
    },
    {
        accessorKey: "discipline",
        header: "Disciplina",
    },
    {
        accessorKey: "asociation",
        header: "Asociación",
    },
    {
        accessorKey: "category",
        header: "Categoría",
    },
    {
        accessorKey: "elite",
        header: "Elite",
        cell: ({ row }) => {
          const value = row.getValue("elite")
          return <span>{value ? "Sí" : "No"}</span>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Abrir Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/athletes/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-2" />
                                Editar
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]