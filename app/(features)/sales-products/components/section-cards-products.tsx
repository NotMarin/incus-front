import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers, PackageSearch } from "lucide-react";

type SectionCardsProductsProps = {
  totalProducts: number;
  totalStock: number;
};

function SectionCardsProducts({ totalProducts, totalStock }: SectionCardsProductsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card gap-1">
        <CardHeader>
          <CardDescription>Total Productos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalProducts.toLocaleString("es-CO")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="rounded-full [&>svg]:size-4">
              <PackageSearch />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Productos en inventario</div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-1">
        <CardHeader>
          <CardDescription>Stock total</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalStock.toLocaleString("es-CO")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="rounded-full [&>svg]:size-4">
              <Layers />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Unidades disponibles</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SectionCardsProducts;
