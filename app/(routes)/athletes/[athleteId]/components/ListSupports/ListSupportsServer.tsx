import { db } from '@/lib/db'
import { ListSupportsClient } from './ListSupportsClient'



export async function ListSupportsServer({ athleteId }: { athleteId: string }) {
  const supports = await db.support.findMany({
    where: {
      athlete: {
        id: athleteId
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  return <ListSupportsClient supports={supports} athleteId={athleteId}/>
}