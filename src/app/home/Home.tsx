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
import { motion } from "framer-motion";
import { ResultsCard } from "@/components/component/results-card";
import { useToast } from "@/components/ui/use-toast";
import Chatbot from "@/components/component/Chatbot";

export default function Home() {
  const [base64Image, setBase64Image] = useState<string>("");
  const [prediction, setPrediction] = useState<Prediction>();
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

  const { toast } = useToast();

  const onSubmit = async (leafImage: LeafImage) => {
    setLoading(true);

    // Ensure an image file is selected
    const file = leafImage.image;
    if (!file) {
      toast({
        title: "Error",
        description: "No image file selected.",
        variant: "destructive",
        duration: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://treesbe.firstasia.edu.ph:5000/upload",
        {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch");
      }

      const result: Prediction = await response.json();

      console.log("Result", result);
      console.log("Confidence", result.confidence);

      if (result.leaf_detected) {
        toast({
          title: "Leaf Detected",
          description: `Leaf detected with confidence: ${
            result.confidence ? result.confidence * 100 : "N/A"
          }%`,
          variant: "default",
          duration: 5000,
        });

        setPrediction(result);

        setToggleResult(true);
      } else {
        toast({
          title: "No Leaf Detected",
          description: "The image does not contain a detectable leaf.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to upload the file. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <>
      <div id="leaves">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      {prediction && (
        <motion.div
          className={`${
            toggleResult ? "block" : "hidden"
          } fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-30 text-white`}
          onClick={() => {
            setToggleResult(!toggleResult);
            setBase64Image("");
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeIn" }}
          exit={{ opacity: 0 }}
        >
          <ResultsCard prediction={prediction} base64Image={base64Image} />
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
                    <div className="ml-2">Classify</div>
                  </LoadingButton>
                </form>
              </Form>
            </div>
            <div className="bg-white rounded-lg shadow-md max-w-md flex justify-center items-center w-full h-full p-6 border">
              <Instructions />
            </div>
          </motion.div>
        </section>
        <Chatbot />
      </main>
    </>
  );
}
