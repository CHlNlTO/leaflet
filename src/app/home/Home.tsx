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
import { motion } from "framer-motion";
import { ResultsCard } from "@/components/component/results-card";

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
        <motion.div
          className={`${
            toggleResult ? "block" : "hidden"
          } fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-30 text-white`}
          onClick={() => setToggleResult(!toggleResult)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeIn" }}
          exit={{ opacity: 0 }}
        >
          <ResultsCard
            svmPredictions={svmPredictions}
            rfPredictions={rfPredictions}
            base64Image={base64Image}
          />
        </motion.div>
      )}
      <main className="py-12 px-6 md:px-8 lg:px-12 min-h-screen mb-16">
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <motion.div
            className="flex flex-col gap-2 mb-5 sm:mb-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold text-green-900 font-yeseva_one">
              Identify leaves with ease
            </h1>
            <p className="text-green-950 text-md font-cormorant_garamond font-semibold">
              Upload an image of a leaf and our classifier will identify the
              plant species.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col lg:flex-row justify-center items-center gap-10 sm:gap-28"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border">
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
                    className="w-full text-white bg-green-900 hover:bg-green-950 font-yeseva_one disabled:opacity-100"
                    loading={loading}
                    type="submit"
                    disabled={base64Image.length === 0}
                  >
                    Classify
                  </LoadingButton>
                </form>
              </Form>
            </div>
            <div className="bg-white rounded-lg shadow-md max-w-md flex justify-center items-center w-full h-full p-6 border">
              <Instructions />
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
