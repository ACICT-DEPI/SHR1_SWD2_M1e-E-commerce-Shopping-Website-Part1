import { Fragment, useEffect, useRef, useState } from "react";
import GoBackButton from "../../components/Admin/Buttons/GoBackButton";
import { InputText } from "primereact/inputtext";
import { inputTextStyle } from "../../layout/inputTextStyle";
import axios from "axios";
import { buttonsStyle } from "../../layout/buttonsStyle";
import { Button } from "primereact/button";
import CustomEditor from "../../components/Admin/CustomEditor";

import { Toast } from "primereact/toast";

const AddCollection = ({ product }) => {
  const [title, setTitle] = useState("");
  const [urlHandler, setUrlHandler] = useState("");
  const [price, setPrice] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const toast = useRef(null);

  // Load existing product data into form fields when product prop is available
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price || "");
      setExcerpt(product.excerpt || "");
      setDescription(product.description || "");
      setImage(product.image || null);
    }
  }, [product]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  // Submit the form
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/product/create", {
        title,
        price,
        excerpt,
        description,
        image,
      });
      if (data.success === true) {
        setTitle("");
        setUrlHandler("");
        setPrice("");
        setExcerpt("");
        setDescription("");
        setImage(null);

        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: "Product updated successfully",
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <div>
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-whiten">
            {product ? "Update Product" : "Add Product"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 xl:col-span-2 space-y-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form encType="multipart/form-data" onSubmit={submitForm}>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter collection name"
                    className="w-full"
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="Price"
                    className="w-full mb-2 block text-black dark:text-white"
                  >
                    Price
                  </label>
                  <div className="p-inputgroup mt-1 flex rounded-md shadow-sm w-full">
                    <InputText
                      id="Price"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      pt={inputTextStyle}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="Excerpt"
                    className="w-full mb-2 block text-black dark:text-white"
                  >
                    Excerpt
                  </label>
                  <div className="p-inputgroup mt-1 flex rounded-md shadow-sm w-full">
                    <InputText
                      id="Excerpt"
                      type="text"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      pt={inputTextStyle}
                      className="w-full"
                    />
                  </div>
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
                  <input
                    onChange={handleImage}
                    type="file"
                    id="image-upload"
                    name="image"
                    className="form-control"
                  />
                  {image && (
                    <img
                      className="img-fluid mt-2"
                      src={image}
                      alt="Uploaded"
                    />
                  )}
                </div>

                <div className="pt-3 rounded-b-md sm:rounded-b-lg">
                  <div className="flex items-center justify-end">
                    <Button
                      label={product ? "Save Changes" : "Add Product"}
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
        <div className="col-span-3 xl:col-span-1 space-y-6"></div>
      </div>
      <Toast ref={toast}></Toast>
    </Fragment>
  );
};

export default AddCollection;
