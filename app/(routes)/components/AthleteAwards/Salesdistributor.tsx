import { CustomIcon } from "@/components/CustomIcon"
import { BarChart } from "lucide-react"
import { GraphicAwards } from "../GraphicsAwards"
//import { GraphicSuscribers } from "../GraphicSuscribers"


export function AthleteAwards() {
    return (
        <div className="shadow-sm bg-background rounded-lg p-5">
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={BarChart} />
                <p className="text-xl">Logros de los Atletas</p>
            </div>
            <GraphicAwards />
        </div>
    )
}
