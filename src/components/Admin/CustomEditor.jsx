import { Editor } from "primereact/editor";
import { Fragment, useState } from "react";

const CustomEditor = ({ value, onTextChange }) => {
  const [textEditor, setTextEditor] = useState(value);
  // Editor Header
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
        </span>
      </Fragment>
    );
  };
  const header = editorHeader();

  return (
    <Fragment>
      <Editor
        value={textEditor}
        onTextChange={onTextChange}
        headerTemplate={header}
        placeholder="Write something ..."
      />
    </Fragment>
  );
};
export default CustomEditor;
