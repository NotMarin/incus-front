"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";

type ChartDataPoint = {
  date: string;
  electronica: number;
  libros: number;
};

const chartConfig = {
  ventas: {
    label: "Ventas",
  },
  electronica: {
    label: "Electrónica",
    color: "var(--primary)",
  },
  libros: {
    label: "Libros",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const API_URL = "http://10.50.50.12:3005/api/dashboard/grafica-comparativa";

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90");
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7");
    }
  }, [isMobile]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}?dias=${timeRange}`);
        const json = await response.json();
        setChartData(json.chartData ?? []);
      } catch {
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  const timeRangeLabel = React.useMemo(() => {
    switch (timeRange) {
      case "7":
        return "Últimos 7 días";
      case "30":
        return "Últimos 30 días";
      case "90":
      default:
        return "Últimos 3 meses";
    }
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Ventas por Categoría</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">{timeRangeLabel}</span>
          <span className="@[540px]/card:hidden">{timeRangeLabel}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90">3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30">30 días</ToggleGroupItem>
            <ToggleGroupItem value="7">7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Seleccionar periodo"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <Skeleton className="h-[450px] w-full rounded-lg" />
        ) : chartData.length === 0 ? (
          <div className="text-muted-foreground flex h-[450px] items-center justify-center">
            No hay datos disponibles para este periodo.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[450px] w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillElectronica" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-electronica)" stopOpacity={1.0} />
                  <stop offset="95%" stopColor="var(--color-electronica)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillLibros" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-libros)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-libros)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("es-ES", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="libros"
                type="natural"
                fill="url(#fillLibros)"
                stroke="var(--color-libros)"
                stackId="a"
              />
              <Area
                dataKey="electronica"
                type="natural"
                fill="url(#fillElectronica)"
                stroke="var(--color-electronica)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
