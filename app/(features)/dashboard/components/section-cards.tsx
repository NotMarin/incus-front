"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, TrendingUp } from "lucide-react";

type Metrica = {
  valor: number;
  cambio: number;
  anterior: number;
};

type DashboardMetricas = {
  mesActual: {
    mes: number;
    year: number;
    nombreMes: string;
  };
  metricas: {
    totalVendido: Metrica;
    electronica: Metrica;
    libros: Metrica;
  };
};

const API_URL = "http://10.50.50.12:3005/api/dashboard/metricas";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);

const formatPercent = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

export function SectionCards() {
  const [data, setData] = useState<DashboardMetricas | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-muted-foreground px-4 py-8 text-center lg:px-6">
        No se pudieron cargar las métricas.
      </div>
    );
  }

  const { metricas, mesActual } = data;

  const cards = [
    {
      title: "Total Vendido",
      value: formatCurrency(metricas.totalVendido.valor),
      change: metricas.totalVendido.cambio,
      footer: `Mes anterior: ${formatCurrency(metricas.totalVendido.anterior)}`,
    },
    {
      title: "Ventas Electrónica",
      value: formatCurrency(metricas.electronica.valor),
      change: metricas.electronica.cambio,
      footer: `Mes anterior: ${formatCurrency(metricas.electronica.anterior)}`,
    },
    {
      title: "Ventas Libros",
      value: formatCurrency(metricas.libros.valor),
      change: metricas.libros.cambio,
      footer: `Mes anterior: ${formatCurrency(metricas.libros.anterior)}`,
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {cards.map((card) => {
        const isPositive = card.change >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={card.title} className="@container/card">
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon />
                  {formatPercent(card.change)}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {isPositive ? "Tendencia al alza" : "Tendencia a la baja"}{" "}
                <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground capitalize">
                {mesActual.nombreMes} {mesActual.year} · {card.footer}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
