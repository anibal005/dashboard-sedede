import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { athleteId: string } }
) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const athlete = await db.athlete.findUnique({
      where: {
        id: params.athleteId,
      },
    });

    if (!athlete) {
      return new NextResponse("atleta no encontrado", { status: 404 });
    }

    const event = await db.event.create({
      data: {
        athleteId: params.athleteId,
        ...data,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENT]", error);
    return new NextResponse("Interanl Error", { status: 500 });
  }
}