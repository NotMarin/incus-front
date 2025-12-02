import SalesTable from "./sales-table";
import SectionCards from "./section-cards";

function SalesManagement() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div>
            <SalesTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesManagement;
