import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { athleteId: string } }
) {
  try {
    const { userId } = auth();
    const { athleteId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const athlete = await db.athlete.update({
      where: {
        id: athleteId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(athlete);
  } catch (error) {
    console.log("[athlete ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { athleteId: string } }
) {
  try {
    const { userId } = auth();
    const { athleteId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedathlete = await db.athlete.delete({
      where: {
        id: athleteId,
      },
    });

    return NextResponse.json(deletedathlete);
  } catch (error) {
    console.log("[DELETE athlete ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}