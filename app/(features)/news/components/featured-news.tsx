import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "./image-with-fallback";
import { categoryLabels } from "../types";

interface FeaturedNewsProps {
  imagenProducto: string;
  categoriaProducto: string;
  nombreProducto: string;
  descripcionProducto: string;
  fecha: string;
}

export function FeaturedNews({
  imagenProducto,
  categoriaProducto,
  nombreProducto,
  descripcionProducto,
  fecha,
}: FeaturedNewsProps) {
  const formattedDate = new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden md:h-full">
          <ImageWithFallback
            src={imagenProducto}
            alt={nombreProducto}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="border-0 bg-red-500 text-white">Destacado</Badge>
          </div>
        </div>
        <CardContent className="flex flex-col justify-center p-8">
          <Badge className="mb-4 w-fit">
            {categoryLabels[categoriaProducto] ?? categoriaProducto}
          </Badge>
          <h2 className="mb-4">{nombreProducto}</h2>
          <p className="text-muted-foreground mb-6">{descripcionProducto}</p>
          <div className="text-muted-foreground mb-6 flex items-center gap-6">
            <span className="text-sm">{formattedDate}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
