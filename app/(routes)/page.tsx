import { CardSummary } from './components/CardSummary';
import { Flame, List, UsersRound, Waypoints } from "lucide-react";
import { LastSupports } from './components/LastSupports';
import { AthleteAwards } from './components/AthleteAwards';
import { TotalSuscribers } from './components/TotalSuscribers';
import { ListIntegrations } from './components/ListItengrations';

export default function Home() {
  const dataCardsSummary = [
    {
      icon: UsersRound,
      total: "12.450",
      average: 15,
      title: "Atletas Inscritos",
      tooltipText: "Mira a todos los atletas"
    },
    {
      icon: Waypoints,
      total: "86.5%",
      average: 80,
      title: "Cantidad de Logros",
      tooltipText: "See all of the summary"
    },
    {
      icon: Flame,
      total: "363",
      average: 30,
      title: "Deportistas Elite",
      tooltipText: "See all of the bounce rate"
    },
  ]
  return (
    <div>
      <h2 className="mb-4 text-2xl">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
        {dataCardsSummary.map(({ icon, total, average, title, tooltipText }) => (
          <CardSummary
            key={title}
            icon={icon}
            total={total}
            average={average}
            title={title}
            tooltipText={tooltipText}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 mt-12 xl:grid-cols-2 md:gap-x-10">
        <LastSupports />
        <AthleteAwards />
      </div>
      <div className="flex-col justify-center mt-12 md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 md:mb-10">
        <TotalSuscribers />
        <ListIntegrations />
      </div>
    </div>
  );
}
