import { CustomIcon } from "@/components/CustomIcon";
import { PenLine } from "lucide-react";
import { SupportsTable } from '../SupportsTable/SupportsTable';




export function LastSupports() {
    return (
        <div className="p-5 rounded-lg shadow-sm bg-background">
            <div className="flex items-center gap-x-2">
                <CustomIcon icon={PenLine} />
                <p className="text-xl">Ultimos Apoyos Agregados</p>
            </div>
            <div>
                <SupportsTable />
            </div>
        </div>
    )
}
