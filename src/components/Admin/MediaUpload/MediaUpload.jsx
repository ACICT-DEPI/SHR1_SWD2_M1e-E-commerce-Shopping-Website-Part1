import { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";

const MediaUpload = ({ onChange, maxFiles }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // لحفظ مسار المعاينة

  const onDrop = (acceptedFiles) => {
    // السماح برفع صورة واحدة فقط
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      if (onChange) {
        // تمرير الصورة المرفوعة إلى المكون الأب
        onChange(file);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // قبول فقط الصور
    maxFiles: maxFiles, // السماح برفع صورة واحدة فقط
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await axios.post("/api/categories", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Category created:", response.data);
  //   } catch (error) {
  //     console.error("Error creating category:", error);
  //   }
  // };

  return (
    <Fragment>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-form-strokedark p-4 text-center cursor-pointer hover:border-primary hover:text-blue-500"
      >
        <input {...getInputProps()} />
        {image ? (
          <img src={preview} alt="Uploaded" className="mx-auto my-4 max-w-xs" />
        ) : (
          <p>Drag & drop an image, or click to select one</p>
        )}
      </div>
    </Fragment>
  );
};

export default MediaUpload;
