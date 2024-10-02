import { Fragment, useRef, useState } from "react";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { InputText } from "primereact/inputtext";
import { inputTextStyle } from "../../../layout/inputTextStyle";
// import axios from "axios";

import { buttonsStyle } from "../../../layout/buttonsStyle";
import { Button } from "primereact/button";
import CustomEditor from "../../../components/Admin/CustomEditor";

import { Toast } from "primereact/toast";
import MediaUpload from "../../../components/Admin/MediaUpload/MediaUpload";
import { useNavigate } from "react-router-dom";

const AddCollection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const toast = useRef(null);
  const navigate = useNavigate(); // استخدام useNavigate لإعادة التوجيه

  const handleImageChange = (file) => {
    setImage(file); // استلام الصورة المرفوعة من MediaUpload
  };

  // submit the form
  const submitForm = async (e) => {
    // e.preventDefault();
    // try {
    //   const { data } = await axios.post("/api/collections/create", {
    //     title,
    //     description,
    //     image,
    //   });
    //   if (data.success === true) {
    //     const collectionId = data.collection._id;
    //     setTitle("");
    //     setDescription("");
    //     setImage("");
    //     toast.current.show({
    //       severity: "info",
    //       summary: "Success",
    //       detail: "Collection created successfully",
    //       life: 3000
    //     });
    // الانتظار لمدة 3 ثوانٍ قبل إعادة التوجيه
    // setTimeout(() => {
    //   navigate(`/collections/update/${collectionId}`); // إعادة التوجيه إلى صفحة update collection باستخدام الـ id
    // }, 3000);
    //   }
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Error",
    //     detail: `error : ${error}`,
    //     life: 3000
    //   });
    // }
  };
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <div>
          <GoBackButton />
          <h1 className=" inline-block ml-4 text-3xl dark:text-whiten	">
            Create Collection
          </h1>
        </div>
      </div>

      <div className="col-span-3 xl:col-span-2 space-y-6">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form enctype="multipart/form-data" onSubmit={submitForm}>
            <div className="grid grid-cols-1 gap-4 p-6">
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Title
                </label>
                <InputText
                  id="title"
                  type="text"
                  placeholder="Enter collection name"
                  className="w-full"
                  pt={inputTextStyle}
                  unstyled={true}
                  value={title}
                  onChange={(e) => setTitle(e.value)}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Description
                </label>
                <CustomEditor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="image-upload"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Image
                </label>
                <MediaUpload onChange={handleImageChange} maxFiles={1} />
              </div>
              <div className="pt-3 rounded-b-md sm:rounded-b-lg">
                <div className="flex items-center justify-end">
                  <Button
                    label="add collection"
                    size="normal"
                    className="text-base"
                    pt={buttonsStyle}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Toast ref={toast}></Toast>
    </Fragment>
  );
};
export default AddCollection;
