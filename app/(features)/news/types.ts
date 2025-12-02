export enum NewsCategory {
  ALL = "all",
  ELECTRONICA = "electronica",
  LIBROS = "libros",
}

export interface NewsArticle {
  _id: string;
  imagenProducto: string;
  categoriaProducto: "electronica" | "libros";
  nombreProducto: string;
  descripcionProducto: string;
  fecha: string;
  createdAt: string;
}

export const categoryLabels: Record<string, string> = {
  all: "Todos",
  electronica: "Electrónica",
  libros: "Libros",
};
