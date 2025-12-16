import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
  { params }: { params: { awardId: string } }) {
  try {
    const { userId } = auth();
    const {awardId} = params;


    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // Eliminamos solo el Award
    const award = await db.award.delete({
      where: {
        id:awardId, // 👈 el ID que recibes en el body
      },
    });

    return NextResponse.json(award);
  } catch (error) {
    console.log("[AWARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}