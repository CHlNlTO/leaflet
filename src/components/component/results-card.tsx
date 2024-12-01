import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Prediction } from "@/lib/types";

export function ResultsCard({
  prediction,
  base64Image,
}: {
  prediction: Prediction;
  base64Image: string;
}) {
  return (
    <Card className="w-full max-w-md mx-2 text-green-950">
      <CardHeader>
        <CardTitle>Leaf Species Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full pb-5 aspect-square flex justify-center items-center">
          <Image
            width={200}
            height={300}
            src={base64Image}
            alt=""
            className="w-full h-48 object-cover"
            style={{
              objectPosition: "50% 20%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="space-y-4 mt-6">
            <h2 className="text-sm font-bold">YoloV8 Model</h2>
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs sm:text-sm">
                {prediction.label.charAt(0).toUpperCase() +
                  prediction.label.slice(1)}
              </span>
              <div className="flex flex-row justify-center items-center gap-6 ">
                <Progress
                  className="w-[170px] sm:w-[220px] shadow-sm shadow-green-300 h-2"
                  value={parseInt(prediction.confidence.toFixed(2))}
                />
                <span className="font-medium text-xs sm:text-sm">
                  {prediction.confidence.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
