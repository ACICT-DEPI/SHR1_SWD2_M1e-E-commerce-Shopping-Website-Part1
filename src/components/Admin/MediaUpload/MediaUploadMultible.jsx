import { Fragment, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const MediaUploadMultible = ({ onChange, maxFiles, showImages }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // تحديث الصور الممررة للمكون
  useEffect(() => {
    if (showImages && showImages.length > 0) {
      setPreviews(showImages);
    }
  }, [showImages]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error("Rejected files:", rejectedFiles);
      return;
    }

    if (acceptedFiles.length > 0) {
      const newImages = [...images, ...acceptedFiles];
      setImages(newImages);

      // تحديث المعاينات (previews)
      const newPreviews = newImages.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);

      if (onChange) {
        onChange(newImages); // تمرير الصور الجديدة للمكون الأب
      }
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: maxFiles || 5, // عدد الملفات المسموح بها افتراضيًا 5
  });

  // تنظيف المعاينات عند إلغاء المكون أو تغيير الصور
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <Fragment>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-form-strokedark p-4 text-center cursor-pointer hover:border-primary hover:text-blue-500"
      >
        <input {...getInputProps()} />
        {previews.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt="Uploaded" className="mx-auto my-4 max-w-xs" />
            ))}
          </div>
        ) : (
            <p>Drag & drop images, or click to select files</p>
        )}
      </div>
      {fileRejections.length > 0 && (
        <div className="text-red-500">Invalid file type or size.</div>
      )}
    </Fragment>
  );
};

export default MediaUploadMultible;
