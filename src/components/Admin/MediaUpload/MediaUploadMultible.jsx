import { Fragment, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ProgressBar } from 'primereact/progressbar';

const MediaUploadMultiple = ({ onChange, maxFiles, showImages = [], loading }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // تحديث المعاينة بناءً على الصور المخزنة (القديمة) فقط عند عدم وجود صور جديدة
  useEffect(() => {
    if (showImages.length > 0 && images.length === 0) {
      setPreviews(showImages); // عرض الصور المخزنة للمنتج عند فتح صفحة التعديل
    }
  }, [showImages, images]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error("Rejected files:", rejectedFiles);
      return;
    }

    if (acceptedFiles.length > 0) {
      // تحديث حالة الصور المحلية التي تم تحميلها
      const newImages = [...images, ...acceptedFiles].slice(0, maxFiles);
      setImages(newImages);

      // إنشاء معاينات جديدة للصور الجديدة فقط
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);

      // تمرير الصور الجديدة فقط (لن يتم رفعها حتى يتم الضغط على زر submit)
      if (onChange) {
        onChange(newImages);
      }
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/*", // قبول فقط الصور
    maxFiles: maxFiles, // الحد الأقصى للملفات المسموح بها
  });

  // تنظيف معاينات الصور عند إلغاء المكون
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
          <div className="flex flex-wrap justify-center gap-4">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Uploaded ${index + 1}`}
                className="mx-auto my-4 max-w-xs"
              />
            ))}
          </div>
        ) : (
            <p>Drag & drop images, or click to select them</p>
        )}
      </div>
      {fileRejections.length > 0 && (
        <div className="text-red-500">Invalid file type or size.</div>
      )}
      <div>
        {loading ? (<ProgressBar mode="indeterminate"></ProgressBar>) : <div></div>}
      </div>

    </Fragment>
  );
};

export default MediaUploadMultiple;
