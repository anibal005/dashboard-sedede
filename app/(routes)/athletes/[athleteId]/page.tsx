import { db } from "@/lib/db"
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { Header } from "./components/Header"
import { AthleteInformation } from "./components/AthleteInformation"
import { FooterAthlete } from "./components/FooterCompany"



export default async function AthleteIdPage({ params }: { params: { athleteId: string } }) {
    const { userId } = auth()

    if (!userId) {
        return redirect("/")
    }


    const athlete = await db.athlete.findUnique({
        where: {
            id: params.athleteId,
            userId
        }
    })
    // console.log(athlete)

    if (!athlete) {
        return redirect("/")
    }

    return (
        <div>
            <Header />
            <AthleteInformation athlete={athlete} />
            <FooterAthlete athleteId={athlete.id} />  
        </div>
    )
}
