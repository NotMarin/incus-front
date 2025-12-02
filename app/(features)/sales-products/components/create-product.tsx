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
import { Edit, Plus } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: "electronica" | "libros";
  precio: number;
  stock: number;
};

const categoryOptions = [
  { value: "electronica", label: "Electrónica" },
  { value: "libros", label: "Libros" },
];

type CreateProductProps = {
  onCreated?: () => void;
  product?: Product | null;
};

export function CreateProduct({ onCreated, product }: CreateProductProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setNombre(product.nombre);
      setDescripcion(product.descripcion);
      setPrecio(product.precio.toString());
      setCategoria(product.categoria);
      setStock(product.stock.toString());
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setStock("");
    }
  }, [product, isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const precioValue = Number(precio);
    if (Number.isNaN(precioValue) || precioValue <= 0) {
      toast.error("Ingresa un precio válido");
      return;
    }

    const stockValue = Number(stock);
    if (Number.isNaN(stockValue) || stockValue < 0) {
      toast.error("Ingresa un stock válido");
      return;
    }

    if (!categoria) {
      toast.error("Selecciona una categoría");
      return;
    }

    setIsSubmitting(true);

    try {
      const isEdit = !!product;
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `http://10.50.50.12:3002/api/productos/${product._id}`
        : "http://10.50.50.12:3002/api/productos";

      const body = isEdit
        ? {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            precio: precioValue,
          }
        : {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            precio: precioValue,
            categoria,
            stock: stockValue,
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || (isEdit ? "No se pudo actualizar" : "No se pudo crear el producto")
        );
      }

      toast.success(isEdit ? "Producto actualizado" : "Producto creado");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setStock("");
      setIsOpen(false);
      onCreated?.();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : product
            ? "No se pudo actualizar"
            : "No se pudo crear el producto";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {product ? (
          <Button variant="ghost" size="icon">
            <Edit className="size-4" />
          </Button>
        ) : (
          <Button>
            <Plus />
            Crear producto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>{product ? "Editar producto" : "Nuevo producto"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Actualiza los datos del producto."
              : "Completa los datos del producto y guárdalos en el inventario."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field className="gap-1">
              <FieldLabel htmlFor="nombre">Nombre del producto</FieldLabel>
              <Input
                id="nombre"
                type="text"
                placeholder="iPhone 15 Pro"
                required
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
              <Input
                id="descripcion"
                type="text"
                placeholder="Smartphone Apple"
                required
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="precio">Precio</FieldLabel>
              <Input
                id="precio"
                type="number"
                placeholder="1299"
                required
                value={precio}
                min="0"
                step="0.01"
                onChange={(event) => setPrecio(event.target.value)}
              />
              <FieldDescription>Ingresa el precio en tu moneda local.</FieldDescription>
            </Field>
            {!product && (
              <>
                <Field className="gap-1">
                  <FieldLabel htmlFor="categoria">Categoría</FieldLabel>
                  <Select value={categoria} onValueChange={(value) => setCategoria(value)} required>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>Escoge entre electrónica o libros.</FieldDescription>
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="stock">Stock</FieldLabel>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="15"
                    required
                    value={stock}
                    min="0"
                    step="1"
                    onChange={(event) => setStock(event.target.value)}
                  />
                  <FieldDescription>Unidades disponibles en el inventario.</FieldDescription>
                </Field>
              </>
            )}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? product
                  ? "Actualizando..."
                  : "Guardando..."
                : product
                  ? "Actualizar"
                  : "Guardar producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
