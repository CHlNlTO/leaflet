"use client";

import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { LoadingButton } from "../../components/ui/loading-button";
import { LeafImage, Prediction, PredictionResponse } from "@/lib/types";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload } from "lucide-react";
import { Instructions } from "@/components/component/Instructions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Profiles from "@/components/component/Profiles";

export default function Home() {
  const [base64Image, setBase64Image] = useState<string>("");
  const [svmPredictions, setSvmPredictions] = useState<Prediction[]>([]);
  const [rfPredictions, setRfPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleResult, setToggleResult] = useState<boolean>(false);

  const form = useForm<LeafImage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBase64Image(reader.result);
          form.setValue("image", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (leafImage: LeafImage) => {
    setLoading(true);
    if (!base64Image) return;
    setToggleResult(!toggleResult);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch");
      }

      const result: PredictionResponse = await response.json();

      setSvmPredictions(result.svm_predictions);
      setRfPredictions(result.rf_predictions);
      setLoading(false);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {svmPredictions.length !== 0 && (
        <div
          className={`${
            toggleResult ? "block" : "hidden"
          } fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-30 text-white`}
          onClick={() => setToggleResult(!toggleResult)}
        >
          <Card
            className="w-full h-full max-w-xl max-h-[600px] m-6 p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="font-yeseva_one text-green-900 font-normal">
              Result
            </CardTitle>
            <CardContent>
              <div className="h-56 w-full pb-5 aspect-square flex justify-center items-center">
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
              <div className="text-green-900 w-full grid grid-cols-7 justify-center p-6 border border-green-200">
                <CardTitle className="flex flex-col font-yeseva_one text-xs sm:text-sm justify-start items-start col-span-3 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[7px] sm:text-[10px] font-normal pb-3">
                      Support Vector Machine Model
                    </span>
                    {svmPredictions.map((pred, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-2xl">
                          {pred.class.charAt(0).toUpperCase() +
                            pred.class.slice(1)}
                        </span>
                        <span className="text-xs text-green-700 font-normal">
                          {pred.probability.toFixed(2)}% Probability
                        </span>
                      </div>
                    ))}
                  </div>
                </CardTitle>
                <div className="flex justify-center col-span-1">
                  <Separator
                    orientation="vertical"
                    className="flex justify-center"
                  />
                </div>
                <CardTitle className="flex flex-col font-yeseva_one text-xs sm:text-sm justify-start items-start col-span-3 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[7px] sm:text-[10px] font-normal pb-3">
                      Random Forest Classifier Model
                    </span>
                    {rfPredictions.map((pred, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-2xl">
                          {pred.class.charAt(0).toUpperCase() +
                            pred.class.slice(1)}
                        </span>
                        <span className="text-xs text-green-700 font-normal">
                          {pred.probability.toFixed(2)}% Probability
                        </span>
                      </div>
                    ))}
                  </div>
                </CardTitle>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <main className="bg-[#e2fce6] py-12 px-6 md:px-8 lg:px-12 h-screen">
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex flex-col gap-2 mb-5 sm:mb-20">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-green-950 font-yeseva_one">
              Identify Leaves with Ease
            </h1>
            <p className="text-green-950 text-md font-cormorant_garamond font-semibold">
              Upload an image of a leaf and our classifier will identify the
              plant species.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 sm:gap-28">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="relative h-56 z-10 opacity-0 cursor-pointer"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  handleFileChange(e);
                                  field.onChange(e.target.files?.[0]);
                                }}
                              />
                              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0 border border-dashed border-green-400">
                                {base64Image.length === 0 ? (
                                  <div className="flex justify-center items-center w-full gap-4 flex-col">
                                    <Upload
                                      size={24}
                                      className="text-green-950"
                                    />
                                    <FormLabel className="text-xs text-green-950 font-yeseva_one">
                                      Upload a Leaf Image
                                    </FormLabel>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-2 justify-center items-center">
                                    <div className="h-full w-full">
                                      <Image
                                        src={base64Image}
                                        alt="Uploaded"
                                        width={200}
                                        height={300}
                                        className="w-full h-48 object-cover bg-gray-100"
                                        style={{
                                          objectPosition: "center",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <LoadingButton
                    className="w-full text-white bg-green-900 hover:bg-green-950 font-yeseva_one"
                    loading={loading}
                    type="submit"
                    disabled={base64Image.length === 0}
                  >
                    Classify
                  </LoadingButton>
                </form>
              </Form>
            </div>
            <div className="bg-white rounded-lg shadow-md max-w-md flex justify-center items-center w-full h-full p-6">
              <Instructions />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
