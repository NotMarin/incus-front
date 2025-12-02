import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ImageWithFallback } from "./image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { categoryLabels } from "../types";

interface NewsCardProps {
  imagenProducto: string;
  categoriaProducto: string;
  nombreProducto: string;
  descripcionProducto: string;
  fecha: string;
}

export function NewsCard({
  imagenProducto,
  categoriaProducto,
  nombreProducto,
  descripcionProducto,
  fecha,
}: NewsCardProps) {
  const formattedDate = new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={imagenProducto}
          alt={nombreProducto}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge>{categoryLabels[categoriaProducto] ?? categoriaProducto}</Badge>
        </div>
      </div>
      <CardHeader>
        <h3 className="line-clamp-2">{nombreProducto}</h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{descripcionProducto}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="text-muted-foreground flex items-center gap-4">
          <span className="text-sm">{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
