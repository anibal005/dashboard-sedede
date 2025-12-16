"use client"

import * as React from "react"
import Image from "next/image"
import {
    ChevronUp,
} from "lucide-react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

import { TableIntegrationsProps } from "./TableIntegrations.types"
import { formatPrice } from "@/lib/formatPrice"


const data: TableIntegrationsProps[] = [
    {
        name: "Guadalupe Torrez",
        icon: "/images/guadalupe.jpg",
        discipline: "Finance",
        achievements: 90,
        support: 20000,
    },
    {
        name: "Jhoselyn Camargo",
        icon: "/images/jhoselyn.jpg",
        discipline: "CRM",
        achievements: 20,
        support: 10000,
    },
    {
        name: "Conrado Moscoso",
        icon: "/images/conrado.jpg",
        discipline: "Marketplace",
        achievements: 80,
        support: 50000,
    }
]

export function TableIntegrations() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    const columns: ColumnDef<TableIntegrationsProps>[] = [
        {
            accessorKey: "icon",
            header: "FOTO",
            cell: ({ row }) => {
                const imageUrl = row.getValue("icon")
                return (
                    <div className="cursor-pointer" onClick={() => setSelectedImage(imageUrl as string)}>
                        <Image src={imageUrl as string} alt="Logo" width={25} height={25} />
                    </div>
                )
            },
        },
        {
            accessorKey: "name",
            header: "NOMBRE",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "discipline",
            header: () => <div>DICIPLINA</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("discipline")}</div>,
        },
        {
            accessorKey: "achievements",
            header: () => <div className="text-right">Logros</div>,
            cell: ({ row }) => (
                <div className="flex items-center gap-1 font-medium text-right">
                    <Progress value={row.getValue("achievements")} className="h-2" />
                </div>
            )
        },
        {
            accessorKey: "support",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="px-0 float-end"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Apoyo Bs.
                    <ChevronUp className="w-4 h-4 ml-2" />
                </Button>
            ),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("support"))
                return (
                    <div className="font-medium text-right">{formatPrice(amount)}</div>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full mt-5">
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Modal para mostrar imagen ampliada */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="relative">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-white text-3xl font-bold"
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Ampliado"
                            width={800}
                            height={600}
                            className="h-auto w-auto max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}