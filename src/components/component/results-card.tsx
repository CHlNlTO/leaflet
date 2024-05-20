import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Prediction } from "@/lib/types";

export function ResultsCard({
  svmPredictions,
  rfPredictions,
  base64Image,
}: {
  svmPredictions: Prediction[];
  rfPredictions: Prediction[];
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
            <h2 className="text-sm font-bold">Support Vector Machine Model</h2>
            {svmPredictions.map((pred: Prediction, index: number) => (
              <div className="flex items-center justify-between" key={index}>
                <span className="font-medium text-xs sm:text-sm">
                  {pred.class.charAt(0).toUpperCase() + pred.class.slice(1)}
                </span>
                <div className="flex flex-row justify-center items-center gap-6 ">
                  <Progress
                    className="w-[170px] sm:w-[220px] shadow-sm shadow-green-300 h-2"
                    value={parseInt(pred.probability.toFixed(2))}
                  />
                  <span className="font-medium text-xs sm:text-sm">
                    {pred.probability.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 mt-6">
            <h2 className="text-sm font-bold">
              Random Forest Classifier Model
            </h2>
            {rfPredictions.map((pred: Prediction, index: number) => (
              <div className="flex items-center justify-between" key={index}>
                <span className="font-medium text-xs sm:text-sm">
                  {pred.class.charAt(0).toUpperCase() + pred.class.slice(1)}
                </span>
                <div className="flex flex-row justify-center items-center gap-6 ">
                  <Progress
                    className="w-[170px] sm:w-[220px] shadow-sm shadow-green-300 h-2"
                    value={parseInt(pred.probability.toFixed(2))}
                  />
                  <span className="font-medium text-xs sm:text-sm">
                    {pred.probability.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
