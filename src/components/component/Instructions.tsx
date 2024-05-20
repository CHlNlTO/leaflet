import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "../ui/label";
import { instructions, instructionsImages } from "@/lib/const";
import Image from "next/image";

export function Instructions() {
  return (
    <Carousel className="w-full max-w-md relative">
      <div className="absolute top-0 left-0 mx-auto w-full z-10 text-green-950 font-yeseva_one">
        <Label className="flex justify-center items-start">Instructions</Label>
      </div>
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-square items-start justify-center p-6 relative">
                  <div className="h-full w-full pb-5">
                    <Image
                      src={instructionsImages[index].url}
                      alt="Uploaded"
                      className="h-full w-full object-cover relative"
                      style={{
                        objectPosition: "center",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Label className="absolute bottom-0 font-cormorant_garamond font-semibold px-4 text-sm text-green-950">
                    {instructions[index]}
                  </Label>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  );
}
