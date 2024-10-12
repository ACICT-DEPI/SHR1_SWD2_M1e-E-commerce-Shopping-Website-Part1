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
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for error messages
  const [errors, setErrors] = useState({});

  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/categories', {
          withCredentials: true,
        });
        console.log("Response from categories:", response.data);
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        showErrorToast(error.response?.data?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleGalleryChange = (files) => {
    setGallery(files);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/products",
        { title, description, excerpt, price, discount, quantity, category },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data.status === "success") {
        const productId = response.data.data._id;
        await uploadImage(productId);
        await uploadGallery(productId);

        showSuccessToast("Product created successfully");
        setTimeout(() => {
          navigate(`/admin/products`);
        }, 3000);
      } 
    } catch (error) {
      const data = error.response?.data || {};
      showErrorToast("Failed to fetch categories");
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
      showErrorToast(error.response?.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (productId) => {
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
  };

  const uploadGallery = async (productId) => {
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
  };

  const showSuccessToast = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showErrorToast = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <div>
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-white">Add Product</h1>
        </div>
      </div>

      <div className="col-span-3 xl:col-span-2 space-y-6">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={submitForm}>
            <div className="grid grid-cols-1 gap-4 p-6">
              {/* Title Field */}
              <div className="mb-2">
                <label htmlFor="title" className="w-full mb-2 block text-black dark:text-white">
                  Title
                </label>
                <InputText
                  id="title"
                  type="text"
                  placeholder="Enter product name"
                  className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
                {errors.title && <small className="p-error">{errors.title}</small>}
              </div>

              {/* Description Field */}
              <div className="mb-2">
                <label htmlFor="description" className="w-full mb-2 block text-black dark:text-white">
                  Description
                </label>
                <CustomEditor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                />
                {errors.description && <small className="p-error">{errors.description}</small>}
              </div>

              {/* Excerpt Field */}
              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">
                  Excerpt
                </label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  className={`w-full ${errors.excerpt ? 'border-red-500' : ''}`}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
                {errors.excerpt && <small className="p-error">{errors.excerpt}</small>}
              </div>

              {/* Price, Discount and Quantity Fields on the same line */}
              <div className="mb-2 grid grid-cols-3 gap-4">
                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="w-full mb-2 block text-black dark:text-white">
                    Price ($)
                  </label>
                  <InputText
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    className={`w-full ${errors.price ? 'border-red-500' : ''}`}
                    onChange={(e) => setPrice(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.price && <small className="p-error">{errors.price}</small>}
                </div>

                {/* Discount Field */}
                <div>
                  <label htmlFor="discount" className="w-full mb-2 block text-black dark:text-white">
                    Discount (%)
                  </label>
                  <InputText
                    id="discount"
                    type="number"
                    placeholder="Enter discount percentage"
                    min={0}
                    max={100}
                    className={`w-full ${errors.discount ? 'border-red-500' : ''}`}
                    onChange={(e) => setDiscount(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.discount && <small className="p-error">{errors.discount}</small>}
                </div>

                {/* Quantity Field */}
                <div>
                  <label htmlFor="quantity" className="w-full mb-2 block text-black dark:text-white">
                    Quantity
                  </label>
                  <InputText
                    id="quantity"
                    type="number"
                    placeholder="Enter product quantity"
                    min={1}
                    max={100}
                    className={`w-full ${errors.quantity ? 'border-red-500' : ''}`}
                    onChange={(e) => setQuantity(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.quantity && <small className="p-error">{errors.quantity}</small>}
                </div>
              </div>

             {/* Category Selection */}
            
             <div className="mb-4">
      <label htmlFor="category" className="block text-lg font-semibold mb-2 text-black dark:text-white">
        Category
      </label>
      <Dropdown
        id="category"
        value={category}
        options={categories}
        onChange={(e) => setCategory(e.value)}
        placeholder="Select category"
        optionLabel="title" // Display property for dropdown options
        className={`w-full ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
        panelClassName="bg-white dark:bg-gray-800 border dark:border-gray-600" // Dropdown panel styling
        itemTemplate={(option) => (
          <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
            {option.title}
          </div>
        )}
        style={{
          backgroundColor: 'var(--background-color)', // Custom variable for background
          border: errors.category ? '1px solid #e3342f' : '1px solid #d1d5db', // Error handling
          borderRadius: '0.375rem',
        }}
      />
      {errors.category && <small className="text-red-500 mt-1">{errors.category}</small>}
    </div>


              {/* Image Upload */}
              <div className="mb-2">
                <MediaUpload onImageChange={handleImageChange} />
              </div>

              {/* Gallery Upload */}
              <div className="mb-2">
                <label className="w-full mb-2 block text-black dark:text-white">Gallery</label>
                <MediaUpload onGalleryChange={handleGalleryChange} multiple />
              </div>

              {/* Submit Button */}
              <Button label="Add Product" type="submit" loading={loading} className={buttonsStyle} />
            </div>
          </form>
        </div>
      </div>

      <Toast ref={toast} position="bottom-left" />
    </Fragment>
  );
};

export default AddProduct;
