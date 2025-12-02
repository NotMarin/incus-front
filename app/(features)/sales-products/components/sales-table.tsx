"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CreateSale } from "./create-sale";
import { useMemo } from "react";

type Sale = {
  _id: string;
  codigo: string;
  fecha: string;
  productoNombre: string;
  productoCategoria: string;
  cliente: string;
  cantidad: number;
  precioUnitario: number;
  valorTotal: number;
};

export type { Sale };

type SalesTableProps = {
  data: Sale[];
  onCreated?: () => void;
};

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "codigo",
    header: "Código",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("fecha"));
      return <div>{date.toLocaleDateString("es-CO")}</div>;
    },
  },
  {
    accessorKey: "productoNombre",
    header: "Producto",
  },
  {
    accessorKey: "productoCategoria",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.getValue<string>("productoCategoria");
      const label = category === "electronica" ? "Electrónica" : "Libros";
      return <div className="font-medium">{label}</div>;
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
  },
  {
    accessorKey: "valorTotal",
    header: "Valor Total",
    cell: ({ row }) => {
      const amount = Number(row.getValue("valorTotal"));
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
];

function SalesTable({ data, onCreated }: SalesTableProps) {
  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Tabla de ventas</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">Historial de ventas</span>
          </CardDescription>
        </div>
        <CreateSale onCreated={onCreated} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}

export default SalesTable;
