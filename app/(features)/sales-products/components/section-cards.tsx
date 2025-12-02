import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, ShoppingBag, ShoppingCart } from "lucide-react";

type SectionCardsProps = {
  ingresosTotales: number;
  totalVentas: number;
  productosVendidos: number;
};

function SectionCards({ ingresosTotales, totalVentas, productosVendidos }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card gap-1">
        <CardHeader>
          <CardDescription>Ingresos totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(ingresosTotales)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="rounded-full [&>svg]:size-4">
              <DollarSign />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            De {totalVentas} ventas realizadas
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-1">
        <CardHeader>
          <CardDescription>Total de ventas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalVentas.toLocaleString("es-CO")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="rounded-full [&>svg]:size-4">
              <ShoppingBag />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Transacciones completadas</div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-1">
        <CardHeader>
          <CardDescription>Productos vendidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {productosVendidos.toLocaleString("es-CO")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="rounded-full [&>svg]:size-4">
              <ShoppingCart />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Unidades totales</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SectionCards;
