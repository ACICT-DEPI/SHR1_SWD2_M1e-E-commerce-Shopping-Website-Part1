import { Fragment, useRef, useState, useEffect } from "react";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { InputText } from "primereact/inputtext";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import { Button } from "primereact/button";
import CustomEditor from "../../../components/Admin/CustomEditor";
import { Toast } from "primereact/toast";
import MediaUpload from "../../../components/Admin/MediaUpload/MediaUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories

  const toast = useRef(null);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/categories", {
          withCredentials: true,
        });
        // Update categories state based on the response structure
        setCategories(response.data.data.categories); // Access categories directly
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch categories",
          life: 3000,
        });
      }
    };
    fetchCategories();
  }, []);

  // Clean up image URL when unmounted
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleImageChange = (file) => {
    setImage(file);
    console.log("File selected:", file);
  };

  const handleGalleryChange = (files) => {
    setGallery(files);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/products", // Update the URL to your products API
        {
          title,
          description,
          excerpt,
          price,
          discount,
          quantity,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (response.data.status === "success") {
        const productId = response.data.data._id;
  
        // Upload image if present
        if (image) {
          const formData = new FormData();
          formData.append("image", image);
  
          const imageResponse = await axios.patch(
            `http://localhost:5000/api/v1/products/product-photo-upload/${productId}`,
            formData,
            { withCredentials: true }
          );
  
          if (imageResponse.data.status !== "success") {
            throw new Error(imageResponse.data.message || "Image upload failed");
          }
        }
  
        // Upload gallery if present
        if (gallery.length > 0) {
          const galleryFormData = new FormData();
          gallery.forEach((file) => galleryFormData.append("gallery", file));
  
          const galleryResponse = await axios.patch(
            `http://localhost:5000/api/v1/products/product-gallery-upload/${productId}`,
            galleryFormData,
            { withCredentials: true }
          );
  
          if (galleryResponse.data.status !== "success") {
            throw new Error(galleryResponse.data.message || "Gallery upload failed");
          }
        }
  
        // Show success toast
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Product created successfully",
          life: 3000, // Show toast for 3 seconds
        });
  
        // Wait for the toast duration and then navigate
        setTimeout(() => {
          navigate(`/admin/products`); // Navigate to admin/products
        }, 3000);
      } else {
        handleErrors(response.data);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data.message || "An error occurred",
        life: 3000,
      });
    }
  };
  

  const handleErrors = (data) => {
    const errorMessage = data.message || "An error occurred";
    const errorDetails = data.errors || {};

    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: 3000,
    });

    if (errorDetails.title) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Title error: ${errorDetails.title.message}`,
        life: 3000,
      });
    }
  };

  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <div>
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-white">
            Add Product
          </h1>
        </div>
      </div>

      <div className="col-span-3 xl:col-span-2 space-y-6">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={submitForm}>
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
                  placeholder="Enter product name"
                  className="w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
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
                  htmlFor="excerpt"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Excerpt
                </label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  className="w-full"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="price"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Price
                </label>
                <InputText
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  className="w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="discount"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Discount
                </label>
                <InputText
                  id="discount"
                  type="number"
                  placeholder="Enter discount percentage"
                  className="w-full"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="quantity"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Quantity
                </label>
                <InputText
                  id="quantity"
                  type="number"
                  placeholder="Enter product quantity"
                  className="w-full"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
              </div>

              <div className="mb-2">
  <label
    htmlFor="category"
    className="w-full mb-2 block text-black dark:text-white"
  >
    Category
  </label>
  <select
    id="category"
    className={`w-full p-2 border rounded ${
      category ? 'bg-white dark:bg-gray-800 text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    } border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="" disabled>Select a category</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.title}
      </option>
    ))}
  </select>
</div>


              <MediaUpload
                onImageChange={handleImageChange}
                onGalleryChange={handleGalleryChange}
              />

              <Button
                type="submit"
                label="Add Product"
                className={`w-full mt-4 ${buttonsStyle}`}
              />
            </div>
          </form>
        </div>
      </div>
      <Toast ref={toast} />
    </Fragment>
  );
};

export default AddProduct;
