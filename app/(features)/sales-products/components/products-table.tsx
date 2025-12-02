"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  category: "Electronica" | "Libro";
  price: number;
  stock: number;
};

const productsData: Product[] = [
  {
    id: "1",
    name: "Laptop Gamer X",
    description: "Potente laptop para juegos",
    category: "Electronica",
    price: 1500.0,
    stock: 10,
  },
  {
    id: "2",
    name: "El Señor de los Anillos",
    description: "Trilogía completa",
    category: "Libro",
    price: 50.0,
    stock: 100,
  },
  {
    id: "3",
    name: "Monitor 4K",
    description: "Monitor de alta resolución",
    category: "Electronica",
    price: 400.0,
    stock: 25,
  },
];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
];

function ProductsTable() {
  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tabla de productos</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">Gestión de inventario</span>
          </CardDescription>
        </div>
        <Button>
          <Plus />
          Nuevo producto
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={productsData} />
      </CardContent>
    </Card>
  );
}

export default ProductsTable;
