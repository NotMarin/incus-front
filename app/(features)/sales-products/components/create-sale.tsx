"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
};

type CreateSaleProps = {
  onCreated?: () => void;
};

export function CreateSale({ onCreated }: CreateSaleProps) {
  const [productoId, setProductoId] = useState("");
  const [cliente, setCliente] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://10.50.50.12:3002/api/productos");
      if (!response.ok) throw new Error("No se pudieron cargar los productos");

      const data = await response.json();
      if (data?.productos && Array.isArray(data.productos)) {
        setProducts(data.productos);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else if (typeof data === "object" && data !== null) {
        setProducts(Object.values(data) as Product[]);
      }
    } catch (error) {
      toast.error("Error al cargar productos");
    }
  };

  const handleProductChange = (id: string) => {
    setProductoId(id);
    const product = products.find((p) => p._id === id) || null;
    setSelectedProduct(product);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productoId) {
      toast.error("Selecciona un producto");
      return;
    }

    const cantidadValue = Number(cantidad);
    if (Number.isNaN(cantidadValue) || cantidadValue < 1) {
      toast.error("Ingresa una cantidad válida");
      return;
    }

    if (!cliente.trim()) {
      toast.error("Ingresa el nombre del cliente");
      return;
    }

    if (selectedProduct && cantidadValue > selectedProduct.stock) {
      toast.error(`Stock insuficiente. Disponible: ${selectedProduct.stock}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://10.50.50.12:3003/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoId,
          cliente: cliente.trim(),
          cantidad: cantidadValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo crear la venta");
      }

      toast.success("Venta registrada");
      setProductoId("");
      setCliente("");
      setCantidad("");
      setSelectedProduct(null);
      setIsOpen(false);
      onCreated?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo crear la venta";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const valorTotal = selectedProduct && cantidad ? selectedProduct.precio * Number(cantidad) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Nueva venta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Nueva venta</DialogTitle>
          <DialogDescription>Registra una nueva venta seleccionando un producto.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field className="gap-1">
              <FieldLabel htmlFor="producto">Producto</FieldLabel>
              <Select value={productoId} onValueChange={handleProductChange}>
                <SelectTrigger id="producto">
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.nombre} - Stock: {product.stock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProduct && (
                <FieldDescription>
                  Precio: ${selectedProduct.precio.toLocaleString("es-CO")} | Stock:{" "}
                  {selectedProduct.stock}
                </FieldDescription>
              )}
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="cliente">Cliente</FieldLabel>
              <Input
                id="cliente"
                type="text"
                placeholder="Nombre del cliente"
                required
                value={cliente}
                onChange={(event) => setCliente(event.target.value)}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="cantidad">Cantidad</FieldLabel>
              <Input
                id="cantidad"
                type="number"
                placeholder="1"
                required
                value={cantidad}
                min="1"
                max={selectedProduct?.stock || 999}
                step="1"
                onChange={(event) => setCantidad(event.target.value)}
              />
              {valorTotal > 0 && (
                <FieldDescription>
                  Valor total: ${valorTotal.toLocaleString("es-CO")}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar venta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
