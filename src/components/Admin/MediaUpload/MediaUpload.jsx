import { Fragment, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ProgressBar } from 'primereact/progressbar';

const MediaUpload = ({ onChange, maxFiles, showImage, loading }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // استخدام useEffect لتحديث الـ preview بناءً على showImage
  useEffect(() => {
    if (showImage) {
      setPreview(showImage);
    }
  }, [showImage]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error("Rejected files:", rejectedFiles);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      if (onChange) {
        onChange(file); // تمرير الملف إلى المكون الأب
      }
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/*", // قبول فقط الصور
    maxFiles: maxFiles, // تحديد عدد الملفات المسموح رفعها
  });

  // استخدام useEffect لتنظيف مسار الـ preview عند إلغاء المكون أو تغيير الصورة
  useEffect(() => {
    return () => {
      if (preview && !showImage) {
        URL.revokeObjectURL(preview); // تنظيف مسار الصورة عند إلغاء المكون
      }
    };
  }, [preview, showImage]);

  return (
    <Fragment>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-form-strokedark p-4 text-center cursor-pointer hover:border-primary hover:text-blue-500"
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Uploaded" className="mx-auto my-4 max-w-xs" />
        ) : (
          <p>Drag & drop an image, or click to select one</p>
        )}
      </div>
      {fileRejections.length > 0 && (
        <div className="text-red-500">Invalid file type or size.</div>
      )}
      <div>
        {loading && (<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>)}
      </div>

    </Fragment>
  );
};

export default MediaUpload;
