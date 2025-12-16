import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { athleteId: string; supportId: string } }
) {
  try {
    const support = await db.support.findUnique({
      where: { id: params.supportId }
    })
    if (!support) {
      return new NextResponse("Apoyo no encontrado", { status: 404 })
    }
    return NextResponse.json(support)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error al obtener apoyo", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { athleteId: string; supportId: string } }
) {
  try {
    const body = await req.json()
    const { name, description, amount, date } = body

    const support = await db.support.update({
      where: { id: params.supportId },
      data: { name, description, amount, date }
    })

    return NextResponse.json(support)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error al actualizar apoyo", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { athleteId: string; supportId: string } }
) {
  try {
    await db.support.delete({
      where: { id: params.supportId }
    })
    return new NextResponse("Apoyo eliminado", { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Error al eliminar apoyo", { status: 500 })
  }
}