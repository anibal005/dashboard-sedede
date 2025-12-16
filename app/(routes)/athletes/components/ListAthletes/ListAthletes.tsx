import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

import { DataTable } from './data-table'
import { columns } from './columns'

export async function ListAthletes() {
    const { userId } = auth()

    if (!userId) {
        return redirect("/")
    }

    const althetes = await db.athlete.findMany({
        // where: {
        //     userId,
        // },
        orderBy: {
            createdAt: "desc"
        }
    })
    //console.log(althetes)



    return (
        <DataTable columns={columns} data={althetes} />
    )
}
