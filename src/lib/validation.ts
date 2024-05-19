import { z } from "zod";

const isImageFile = (file: File | undefined | null): boolean => {
  return file instanceof File && file.type.startsWith("image/");
};

const isFileSizeValid = (file: File | undefined | null): boolean => {
  return file instanceof File && file.size < 1024 * 1024 * 10;
};

export const formSchema = z.object({
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "Invalid file",
    })
    .refine(isImageFile, {
      message: "Please upload an image file",
    })
    .refine(isFileSizeValid, {
      message: "File size should be less than 10MB",
    }),
});
