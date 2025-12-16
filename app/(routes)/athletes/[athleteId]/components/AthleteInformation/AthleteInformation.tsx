import Image from "next/image";
import { AthleteInformationProps } from "./AthleteInformation.types";
import { HandCoins, Medal } from "lucide-react";
import { NewAward } from "../NewAward";
//import { ListContacts } from "../ListContacts";
import { AthleteForm } from "../AthleteForm";
import { ListAwardsServer } from "../ListAwards";
import { NewSupport } from "../NewSupport";
import { ListSupportsServer } from "../ListSupports";


export function AthleteInformation(props: AthleteInformationProps) {
    const { athlete } = props

    const profileImage = athlete.profileImage || "/images/user-icon.png";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
  {/* Columna izquierda */}
  <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg">
    <div>
      <Image
        src={profileImage}
        alt="athlete Image"
        width={50}
        height={50}
        className="mb-3 rounded-lg"
      />

      <AthleteForm athlete={athlete} />
    </div>
  </div>

  {/* Columna derecha */}
  <div className="flex flex-col gap-y-4">
    {/* Primer bloque: Logros */}
    <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <Medal className="w-5 h-5" />
          Logros
        </div>
        <div>
          <NewAward />
        </div>
      </div>
      <ListAwardsServer athleteId={athlete.id} />
    </div>

    {/* Segundo bloque: Apoos (Support) */}
    <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <HandCoins className="w-5 h-5" />
          Apoyos
        </div>
        <div>
          <NewSupport />
        </div>
      </div>
      <ListSupportsServer athleteId={athlete.id} />
    </div>
  </div>
</div>
    )
}