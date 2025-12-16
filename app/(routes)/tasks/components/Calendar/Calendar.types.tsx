import { Athlete, Event } from "@prisma/client"

export type CalendarProps = {
    athletes : Athlete[];
    events: Event[];
}