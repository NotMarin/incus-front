import Image from "next/image";
import { useState } from "react";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  if (!src || typeof src !== "string") {
    return (
      <div className={`inline-block bg-gray-100 ${className ?? ""}`} style={style}>
        <div className="relative flex h-full w-full items-center justify-center">
          <Image src="/placeholder.svg" alt="No image provided" fill className="object-cover" />
        </div>
      </div>
    );
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src="/placeholder.svg"
          alt="Error loading image"
          fill
          data-original-url={src}
          className="object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        fill
        src={src}
        alt={alt ?? ""}
        className={`object-cover ${className ?? ""}`}
        style={style}
        onError={handleError}
        {...Object.fromEntries(
          Object.entries(rest).filter(([k]) => k !== "width" && k !== "height")
        )}
      />
    </div>
  );
}
