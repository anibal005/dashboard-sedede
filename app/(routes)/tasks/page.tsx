import { auth } from '@clerk/nextjs'

import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Calendar } from './components/Calendar/Calendar';

export default async function TaskPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/')
  }
  const athletes = await db.athlete.findMany({
    where: {
      userId: userId
    }
  })

  const events = await db.event.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log(events)

  return (
    <div>
      <Calendar athletes= {athletes} events= {events}/>
    </div>
  )
}
