import { ChartAreaInteractive } from "@/components/layouts/home-layout/ChartAreaInteractive";
import { DataTable } from "@/components/layouts/home-layout/DataTable";
import { SectionCards } from "@/components/layouts/home-layout/SectionCards";
import data from "@/components/layouts/home-layout/data.json";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
