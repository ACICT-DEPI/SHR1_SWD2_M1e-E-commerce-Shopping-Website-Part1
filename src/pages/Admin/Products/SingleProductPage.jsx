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

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
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
        setExistingGallery(product.gallery?.map(item => item.url) || []); // Assuming gallery is an array of objects
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

  // Handle main image change
  const handleImageChange = (file) => {
    setNewImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // Show preview of the selected image
  };

  // Handle gallery changes
  const handleGalleryChange = (files) => {
    setNewGallery(files);
    setGalleryPreviewUrls(files.map(file => URL.createObjectURL(file))); // Show previews of the selected gallery images
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data for product update
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description); // Send as HTML
      formData.append("excerpt", excerpt); // Send as HTML
      formData.append("price", price); // Send as HTML
      formData.append("discount", discount); // Send as HTML
      formData.append("quantity", quantity); // Send as HTML
      // Update product details
      const updateResponse = await axios.patch(`http://localhost:5000/api/v1/products/${id}`, formData, {
        withCredentials: true,
      });

      // Upload new product image if selected
      if (newImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", newImage);

        await axios.patch(`http://localhost:5000/api/v1/products/product-photos-upload/${id}`, imageFormData, {
          withCredentials: true,
        });
      }

      // Upload new gallery images if selected
      if (newGallery.length > 0) {
        const galleryFormData = new FormData();
        newGallery.forEach((file) => {
          galleryFormData.append("gallery", file);
        });

        await axios.patch(`http://localhost:5000/api/v1/products/product-photos-upload/${id}`, galleryFormData, {
          withCredentials: true,
        });
      }

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Product updated successfully",
        life: 3000,
      });
      navigate("/admin/products"); // Redirect to products list
    } catch (error) {
      const data = error.response?.data || {};
      setErrors({
        title: data.errors?.title?.message || "",
        description: data.errors?.description?.message || "",
      });
      console.error("Error updating product:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update product",
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
                  className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                  pt={inputTextStyle}
                  unstyled={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <small className="p-error">{errors.title}</small>}
              </div>

              {/* Price, Discount, and Quantity Fields on the same line */}
              <div className="mb-2 grid grid-cols-3 gap-4">
                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="w-full mb-2 block text-black dark:text-white">Price ($)</label>
                  <InputText
                    id="price"
                    type="number"
                    value={price}
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
                  <label htmlFor="discount" className="w-full mb-2 block text-black dark:text-white">Discount (%)</label>
                  <InputText
                    id="discount"
                    type="number"
                    value={discount}
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
                  <label htmlFor="quantity" className="w-full mb-2 block text-black dark:text-white">Quantity</label>
                  <InputText
                    id="quantity"
                    type="number"
                    value={quantity}
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

              {/* Excerpt Input */}
              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">Excerpt</label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  className={`w-full ${errors.excerpt ? 'border-red-500' : ''}`}
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
                  onChange={(value) => setDescription(value)}
                />
                {errors.description && <small className="p-error">{errors.description}</small>}
              </div>

              {/* Image Upload */}
              <div className="mb-2">
                <MediaUpload
                  onChange={handleImageChange}
                  existingImage={existingImage}
                  previewUrl={previewUrl}
                />
              </div>

              {/* Gallery Upload */}
              <div className="mb-2">
                <label htmlFor="gallery" className="w-full mb-2 block text-black dark:text-white">Gallery</label>
                <MediaUpload
                  onChange={handleGalleryChange}
                  existingGallery={existingGallery}
                  galleryPreviewUrls={galleryPreviewUrls}
                  multiple={true}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  label="Update Product"
                  type="submit"
                  className={buttonsStyle}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toast ref={toast} position="bottom-left"/>
    </Fragment>
  );
};

export default SingleProductPage;
