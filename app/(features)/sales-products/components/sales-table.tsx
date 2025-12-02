"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Sale = {
  id: string;
  code: string;
  date: string;
  product: string;
  client: string;
  quantity: number;
  totalValue: number;
};

const salesData: Sale[] = [
  {
    id: "1",
    code: "V-001",
    date: "2024-12-01",
    product: "Laptop Gamer X",
    client: "Juan Pérez",
    quantity: 1,
    totalValue: 1500.0,
  },
  {
    id: "2",
    code: "V-002",
    date: "2024-11-30",
    product: "Monitor 4K",
    client: "Ana Gómez",
    quantity: 2,
    totalValue: 800.0,
  },
  {
    id: "3",
    code: "V-003",
    date: "2024-11-29",
    product: "Teclado Mecánico",
    client: "Carlos Ruiz",
    quantity: 5,
    totalValue: 500.0,
  },
];

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "product",
    header: "Producto",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "totalValue",
    header: "Valor Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalValue"));
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
];

function SalesTable() {
  return (
    <Card className="@container/card">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Tabla de ventas</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">Ventas en los últimos 3 meses</span>
          </CardDescription>
        </div>
        <Button>
          <Plus />
          Nueva venta
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={salesData} />
      </CardContent>
    </Card>
  );
}

export default SalesTable;
