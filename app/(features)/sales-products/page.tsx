import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesManagement from "./components/sales-management";
import ProductsManagement from "./components/products-management";

function SalesProductsPage() {
  return (
    <Tabs defaultValue="sales" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="sales">Ventas</TabsTrigger>
        <TabsTrigger value="products">Productos</TabsTrigger>
      </TabsList>

      <TabsContent value="sales">
        <SalesManagement />
      </TabsContent>

      <TabsContent value="products">
        <ProductsManagement />
      </TabsContent>
    </Tabs>
  );
}

export default SalesProductsPage;
