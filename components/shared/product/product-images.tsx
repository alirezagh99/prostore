"use client";

import { cn } from "cn";
import Image from "next/image";
import React from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="Product Image"
        width={1000}
        height={1000}
        className={"min-h-75 object-cover object-center"}
      />
      <div className={"flex"}>
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "cursor-pointer border mr-2 hover:border-orange-600",
              current === index && "border-orange-500",
            )}
          >
            <Image src={image} alt={"image"} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
