import { Fragment, useRef, useState, useEffect } from "react";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { InputText } from "primereact/inputtext";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import { Button } from "primereact/button";
import CustomEditor from "../../../components/Admin/CustomEditor";
import { Toast } from "primereact/toast";
import MediaUpload from "../../../components/Admin/MediaUpload/MediaUpload";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ActionButton from "../../../components/Admin/Buttons/ActionButton";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
 // State for error messages
  const [errors, setErrors] = useState({});
  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`, {
          withCredentials: true,
        });

        const product = response.data.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setQuantity(product.quantity);
        setExcerpt(product.excerpt);
        setExistingImage(product.image?.url);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch product data",
        });
      }
    };

    fetchProductData();
  }, [id]);

  // Handle image changes
  const handleImageChange = (file) => {
    setNewImage(file);
    setExistingImage(URL.createObjectURL(file));
  };

  // Submit form to update product data
  const submitForm = async (e) => {
    e.preventDefault();

    try {
        // Send PATCH request to update product
        const updateResponse = await axios.patch(
            `http://localhost:5000/api/v1/products/${id}`,
            { title, description, excerpt, discount, price , quantity},
            {
                withCredentials: true,
            }
        );
        toast.current.show({ severity: "success", summary: "Success", detail: "Product updated successfully", life: 3000 });
        window.location.reload();
         // Navigate to another page or refresh as needed
         setTimeout(() => {
          navigate('/admin/products');
      }, 2000);

        console.log("Update Response:", updateResponse.data);
    } catch (error) {
       const data = error.response?.data || {};

       setErrors((prev) => ({
        ...prev,
        title: data.errors?.title?.message || "",
        description: data.description?.category?.message || "",
        excerpt: data.errors?.excerpt?.message || "",
        price: data.errors?.price?.message || "",
        discount: data.errors?.discount?.message || "",
        quantity: data.errors?.quantity?.message || "",
        category: data.errors?.category?.message || "",
      }));
        // Show error message if the update fails
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Failed to update product",
        });
    }
};


  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <div>
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-white">Update Product</h1>
        </div>
      </div>

      <div className="col-span-3 xl:col-span-2 space-y-6">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form encType="multipart/form-data" onSubmit={submitForm}>
            <div className="grid grid-cols-1 gap-4 p-6">
              {/* Title Input */}
              <div className="mb-2">
                <label htmlFor="title" className="w-full mb-2 block text-black dark:text-white">Title</label>
                <InputText
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  className="w-full"
                  pt={inputTextStyle}
                  unstyled={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <small className="p-error">{errors.title}</small>}

              </div>

              {/* Price Input */}
              <div className="mb-2">
                <label htmlFor="price" className="w-full mb-2 block text-black dark:text-white">Price</label>
                <InputText
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  className="w-full"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))} // Convert to number
                />
              {errors.price && <small className="p-error">{errors.price}</small>}

              </div>

              {/* Discount Input */}
              <div className="mb-2">
                <label htmlFor="discount" className="w-full mb-2 block text-black dark:text-white">Discount</label>
                <InputText
                  id="discount"
                  type="number"
                  placeholder="Enter discount percentage"
                  className="w-full"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))} // Convert to number
                />
               {errors.discount && <small className="p-error">{errors.discount}</small>}

              </div>

              {/* Quantity Input */}
              <div className="mb-2">
                <label htmlFor="quantity" className="w-full mb-2 block text-black dark:text-white">Quantity</label>
                <InputText
                  id="quantity"
                  type="number"
                  placeholder="Enter product quantity"
                  className="w-full"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))} // Convert to number
                />
              {errors.quantity && <small className="p-error">{errors.quantity}</small>}

              </div>

              {/* Excerpt Input */}
              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">Excerpt</label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  className="w-full"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
               {errors.excerpt && <small className="p-error">{errors.excerpt}</small>}

              </div>

              {/* Description Editor */}
              <div className="mb-2">
                <label htmlFor="description" className="w-full mb-2 block text-black dark:text-white">Description</label>
                <CustomEditor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)} // Ensure e.htmlValue is used correctly
                />
               {errors.description && <small className="p-error">{errors.description}</small>}

              </div>

              {/* Image Upload */}
              <div className="mb-2">
                <label htmlFor="image-upload" className="w-full mb-2 block text-black dark:text-white">Image</label>
                <MediaUpload
                  onChange={handleImageChange}
                  maxFiles={1}
                  existingImage={existingImage}
                  showImage={existingImage}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3 rounded-b-md sm:rounded-b-lg">
                <div className="flex items-center justify-end">
                <ActionButton 
            type="delete" 
            label="Delete" 
          />
                  <Button label="Save Changes" size="normal" className="text-base" pt={buttonsStyle} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Toast ref={toast} position="bottom-left"></Toast>
    </Fragment>
  );
};

export default SingleProductPage;
