import { generateReactHelpers } from "@uploadthing/react";

// Update the path below to the correct relative path if needed
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
