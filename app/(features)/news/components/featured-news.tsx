import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "./image-with-fallback";

interface FeaturedNewsProps {
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export function FeaturedNews({
  title,
  description,
  category,
  date,
  author,
  image,
}: FeaturedNewsProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden md:h-full">
          <ImageWithFallback
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="border-0 bg-red-500 text-white">Destacado</Badge>
          </div>
        </div>
        <CardContent className="flex flex-col justify-center p-8">
          <Badge className="mb-4 w-fit">{category}</Badge>
          <h2 className="mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>
          <div className="text-muted-foreground mb-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{author}</span>
            </div>
            <span className="text-sm">{date}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
