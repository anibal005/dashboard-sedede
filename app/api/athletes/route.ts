import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    console.log(data)

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const athlete = await db.athlete.create({
      data: {
        userId,
        ...data,
      },
    });

    return NextResponse.json(athlete);
  } catch (error) {
    console.log("[ATHLETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}