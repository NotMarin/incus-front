"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { CreateProduct } from "./create-product";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: "electronica" | "libros";
  precio: number;
  stock: number;
};

export type { Product };

type ProductsTableProps = {
  data: Product[];
  onCreated?: () => void;
};

function ProductsTable({ data, onCreated }: ProductsTableProps) {
  const [categoryFilter, setCategoryFilter] = useState<"todos" | "electronica" | "libros">("todos");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    setDeletingId(productId);
    try {
      const response = await fetch(`http://10.50.50.12:3002/api/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      toast.success("Producto eliminado");
      onCreated?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo eliminar el producto";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",
      },
      {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({ row }) => {
          const category = row.getValue<Product["categoria"]>("categoria");
          const label = category === "electronica" ? "Electrónica" : "Libros";
          return <div className="font-medium">{label}</div>;
        },
      },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: ({ row }) => {
          const amount = Number(row.getValue("precio"));
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
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <CreateProduct product={row.original} onCreated={onCreated} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.original._id)}
              disabled={deletingId === row.original._id}
            >
              <Trash />
            </Button>
          </div>
        ),
      },
    ],
    [deletingId, onCreated]
  );

  const filteredData = useMemo(() => {
    if (categoryFilter === "todos") {
      return data;
    }

    return data.filter((product) => product.categoria === categoryFilter);
  }, [categoryFilter, data]);

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div>
            <CardTitle>Tabla de productos</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">Gestión de inventario</span>
            </CardDescription>
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value as "todos" | "electronica" | "libros")
            }
          >
            <SelectTrigger className="min-w-[120px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="electronica">Electrónica</SelectItem>
              <SelectItem value="libros">Libros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateProduct onCreated={onCreated} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filteredData} />
      </CardContent>
    </Card>
  );
}

export default ProductsTable;
