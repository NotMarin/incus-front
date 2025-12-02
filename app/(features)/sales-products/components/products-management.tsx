import ProductsTable from "./products-table";
import SectionCardsProducts from "./section-cards-products";

function ProductsManagement() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCardsProducts />
          <div>
            <ProductsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsManagement;
