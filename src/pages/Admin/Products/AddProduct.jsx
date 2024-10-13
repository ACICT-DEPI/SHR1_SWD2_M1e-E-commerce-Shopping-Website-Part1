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
import 'primereact/resources/themes/saga-blue/theme.css';
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
  const [errors, setErrors] = useState({});

  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/categories', { withCredentials: true });
        setCategories(response.data.data.categories);
      } catch (error) {
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

  const handleImageChange = (file) => setImage(file);
  const handleGalleryChange = (files) => setGallery(files);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post("http://localhost:5000/api/v1/products", {
        title, description, excerpt, price, discount, quantity, category
      }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

      if (response.data.status === "success") {
        const productId = response.data.data._id;
        if (image) {
          await uploadImage(productId);
        }
        if (gallery.length > 0) {
          await uploadGallery(productId);
        }
        showSuccessToast("Product added successfully!");
        setTimeout(() => navigate(`/admin/products/${productId}`), 3000);
      } else {
        handleErrors(response.data);
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (productId) => {
    const formImageData = new FormData();
    formImageData.append("image", image);
    const imageResponse = await axios.patch(`http://localhost:5000/products/product-photos-upload/${productId}`, formImageData, { withCredentials: true });
    if (imageResponse.data.status !== "success") throw new Error(imageResponse.data.message || "Image upload failed");
  };

  const uploadGallery = async (productId) => {
    const galleryFormData = new FormData();
    gallery.forEach((file) => galleryFormData.append("gallery", file));
    const galleryResponse = await axios.patch(`http://localhost:5000/api/v1/products/product-gallery-upload/${productId}`, galleryFormData, { withCredentials: true });
    if (galleryResponse.data.status !== "success") throw new Error(galleryResponse.data.message || "Gallery upload failed");
  };

  const handleErrorResponse = (error) => {
    const data = error.response?.data || {};
    setErrors((prev) => ({
      ...prev,
      title: data.errors?.title?.message || "",
      description: data.errors?.description?.message || "",
      excerpt: data.errors?.excerpt?.message || "",
      price: data.errors?.price?.message || "",
      discount: data.errors?.discount?.message || "",
      quantity: data.errors?.quantity?.message || "",
      category: data.errors?.category?.message || "",
    }));
    showErrorToast(data.message || "An error occurred");
  };

  const handleErrors = (data) => {
    const errorMessage = data.message || "An error occurred";
    toast.current.show({ severity: "error", summary: "Error", detail: errorMessage, life: 3000 });
  };

  const showSuccessToast = (message) => {
    toast.current.show({ severity: "success", summary: "Success", detail: message, life: 3000 });
  };

  const showErrorToast = (message) => {
    toast.current.show({ severity: "error", summary: "Error", detail: message, life: 3000 });
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
                <label htmlFor="title" className="w-full mb-2 block text-black dark:text-white">Title</label>
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
                <label htmlFor="description" className="w-full mb-2 block text-black dark:text-white">Description</label>
                <CustomEditor value={description} onTextChange={(e) => setDescription(e.htmlValue)} />
                {errors.description && <small className="p-error">{errors.description}</small>}
              </div>
              {/* Excerpt Field */}
              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">Excerpt</label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter excerpt"
                  className={`w-full ${errors.excerpt ? 'border-red-500' : ''}`}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
                {errors.excerpt && <small className="p-error">{errors.excerpt}</small>}
              </div>
              {/* Price, Discount, and Quantity Fields on the same line */}
              <div className="mb-2 grid grid-cols-3 gap-4">
                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="w-full mb-2 block text-black dark:text-white">Price ($)</label>
                  <InputText
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    className={`w-full ${errors.price ? 'border-red-500' : ''}`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.price && <small className="p-error">{errors.price}</small>}
                </div>
                {/* Discount Field */}
                <div>
                  <label htmlFor="discount" className="w-full mb-2 block text-black dark:text-white">Discount (%)</label>
                  <InputText
                    id="discount"
                    type="number"
                    placeholder="Enter discount"
                    className={`w-full ${errors.discount ? 'border-red-500' : ''}`}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.discount && <small className="p-error">{errors.discount}</small>}
                </div>
                {/* Quantity Field */}
                <div>
                  <label htmlFor="quantity" className="w-full mb-2 block text-black dark:text-white">Quantity</label>
                  <InputText
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    className={`w-full ${errors.quantity ? 'border-red-500' : ''}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.quantity && <small className="p-error">{errors.quantity}</small>}
                </div>
              </div>
              {/* Category Dropdown */}
              <div className="mb-2">
                <label htmlFor="category" className="w-full mb-2 block text-black dark:text-white">Category</label>
                <Dropdown
                  id="category"
                  value={category}
                  options={categories}
                  onChange={(e) => setCategory(e.value)}
                  placeholder="Select a category"
                  optionLabel="title"
 
                  className={`w-full ${errors.category ? 'border-red-500' : ''}`}
                />
                {errors.category && <small className="p-error">{errors.category}</small>}
              </div>
              {/* Image Upload */}
              <MediaUpload image={image} onImageChange={handleImageChange} />
              {/* Gallery Upload */}
              <MediaUpload gallery={gallery} onGalleryChange={handleGalleryChange} />
              {/* Submit Button */}
              <Button label="Submit" type="submit" className={`${buttonsStyle} w-full`} loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;
