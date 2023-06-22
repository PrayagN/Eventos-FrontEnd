import  { toast } from "react-hot-toast";

export  const validateImage = (file) => {
    const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    // Check file format
    if (!supportedFormats.includes(file.type)) {
      toast.error(
        "Unsupported image format. Please choose a JPEG, PNG, or GIF image."
      );
      return false;
    }

    // Check file size
    if (file.size > maxSizeInBytes) {
      toast.error("The image size exceeds the maximum allowed limit of 5MB.");
      return false;
    }

    return file;
  };