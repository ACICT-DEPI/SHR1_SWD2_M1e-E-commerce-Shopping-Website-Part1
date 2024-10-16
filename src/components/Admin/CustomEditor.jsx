import { Editor } from "primereact/editor";
import { Fragment, useEffect, useState } from "react";
import DOMPurify from "dompurify"; // استيراد مكتبة DOMPurify

const CustomEditor = ({ value, onTextChange }) => {
  const [textEditor, setTextEditor] = useState("");

  // تعقيم الـ HTML المستلم
  useEffect(() => {
    if (value) {
      const cleanHtml = DOMPurify.sanitize(value); // تعقيم HTML
      setTextEditor(cleanHtml); // تعيين النص المعقم
    }
  }, [value]);


  const changeTextColor = (color) => {
    const quill = textEditor.getEditor();
    quill.format('color', color);
  };

  const changeBackgroundColor = (color) => {
    const quill = textEditor.getEditor();
    quill.format('background', color);
  };

  // التعامل مع تغييرات المحرر
  const handleTextChange = (e) => {
    setTextEditor(e.htmlValue); // تحديث القيمة المحلية
    onTextChange(e); // تمرير التغييرات إلى المكون الأب
  };

  // Editor Heade
  const editorHeader = () => {
    return (
      <Fragment>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
          <button className="ql-header" value="1" aria-label="header1"></button>
          <button className="ql-header" value="2" aria-label="header2"></button>
          <button
            className="ql-list"
            value="bullet"
            aria-label="bullet list"
          ></button>
          <button
            className="ql-list"
            value="ordered"
            aria-label="ordered list"
          ></button>
          <select className="ql-align" aria-label="align"></select>
          <button className="ql-link" aria-label="link"></button>
          <button className="ql-blockquote" aria-label="blockquote"></button>
          <button className="ql-image" aria-label="image"></button>


          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>



      </Fragment>
    );
  };

  const header = editorHeader();

  return (
    <Fragment>
      <Editor
        value={textEditor} // استخدام القيمة المعقمة هنا
        onTextChange={handleTextChange} // تمرير التغيير
        headerTemplate={header}
        placeholder="Write something ..."
      />
    </Fragment>
  );
};

export default CustomEditor;
