import { db } from '@/lib/db'
import { ListAwardsClient } from './ListAwardsClient'


export async function ListAwardsServer({ athleteId }: { athleteId: string }) {
  const awards = await db.award.findMany({
    where: {
      athlete: {
        id: athleteId
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  return <ListAwardsClient awards={awards} athleteId={athleteId} />
}