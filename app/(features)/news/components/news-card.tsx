import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { ImageWithFallback } from "./image-with-fallback";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  date: string;
}

export function NewsCard({ title, description, category, author, image, date }: NewsCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge>{category}</Badge>
        </div>
      </div>
      <CardHeader>
        <h3 className="line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="text-muted-foreground flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="text-sm">{author}</span>
          </div>
          <span className="text-sm">{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
