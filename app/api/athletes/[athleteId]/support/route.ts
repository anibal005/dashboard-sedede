import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    { params }: { params: { athleteId: string } }	
) {
    try {
        const {userId} = auth();
        const data = await req.json();
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const athlete = await db.athlete.findUnique({
            where: {
                id: params.athleteId,
            },
        })
        if (!athlete) {
            return new NextResponse("Athlete not found", { status: 404 });
        }
        const support = await db.support.create({
            data: {
                athleteId: params.athleteId,
                ...data
            },
        })
        return NextResponse.json(support);
    } catch (error) {
        console.error("[support]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
        
    }
}