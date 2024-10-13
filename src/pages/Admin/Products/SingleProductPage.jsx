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
import { Dropdown } from "primereact/dropdown";

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
  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://server-esw.up.railway.app/api/v1/categories', { withCredentials: true });
        setCategories(response.data.data.categories);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch categories",
        })
      } finally {
      }
    };
    fetchCategories();
  }, []);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://server-esw.up.railway.app/api/v1/products/${id}`, {
          withCredentials: true,
        });
        const product = response.data.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setQuantity(product.quantity);
        setExcerpt(product.excerpt);
        setCategory(product.category); // Assuming category is a foreign key reference
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

  // Handle gallery changes
  const handleGalleryChange = (files) => {
    setNewGallery(files);
    // Set previews separately from existingGallery
    setExistingGallery((prevGallery) => [
      ...prevGallery, 
      ...files.map(file => URL.createObjectURL(file))
    ]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      // Prepare form data for product update
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description); // Send as HTML
      formData.append("excerpt", excerpt); // Send as HTML
      formData.append("price", price); // Send as HTML
      formData.append("discount", discount); // Send as HTML
      formData.append("quantity", quantity); // Send as HTML
      formData.append("category", category); // Send as HTML
      // Update product details
      const updateResponse = await axios.patch(`https://server-esw.up.railway.app/api/v1/products/${id}`, formData, {
        withCredentials: true,
      });

      // Upload new gallery images if selected
      if (newGallery.length > 0) {
        const galleryFormData = new FormData();
        newGallery.forEach((file) => {
          galleryFormData.append("gallery", file);
        });

        const imageResponse = await axios.patch(`https://server-esw.up.railway.app/api/v1/products/product-photos-upload/${id}`, galleryFormData, {
          withCredentials: true,
        });

        if (imageResponse.data.status === "success") {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Images uploaded successfully",
            life: 3000,
          });
        } else {
          throw new Error(imageResponse.data.message || "Image upload failed");
        }
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
      setErrors((prev) => ({
        ...prev,
        title: data.errors?.title?.message || "",
        description: data.errors?.description?.message || "",
        excerpt: data.errors?.excerpt?.message || "",
        price: data.errors?.price?.message || "",
        discount: data.errors?.discount?.message || "",
        quantity: data.errors?.quantity?.message || "",
        category: data.errors?.category?.message || "",
        gallery: data.errors?.gallery || [],
      }));

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
                    onChange={(e) => setPrice(Number(e.target.value))}
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
                    onChange={(e) => setDiscount(Number(e.target.value))}
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
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    pt={inputTextStyle}
                    unstyled={true}
                  />
                  {errors.quantity && <small className="p-error">{errors.quantity}</small>}
                </div>
              </div>
                {/* Category Dropdown */}
                
              <div className="mb-4">
                <label htmlFor="category" className="block text-lg font-semibold mb-2 text-black dark:text-white">
                  Category
                </label>
                <Dropdown
  id="category"
  value={category} // State holding selected category ID
  options={categories.map(cat => ({ label: cat.title, value: cat._id }))} // Mapping categories to required format
  onChange={(e) => setCategory(e.value)} // Sets the selected category ID
  placeholder="Select a category"
  className={`w-full ${errors.category ? 'border-red-500' : ''}`}
/>
                {errors.category && <small className="text-red-500 mt-1">{errors.category}</small>}
              </div>

              {/* Excerpt Input */}
              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">Excerpt</label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  value={excerpt}
                  className={`w-full ${errors.excerpt ? 'border-red-500' : ''}`}
                  onChange={(e) => setExcerpt(e.target.value)}
                  pt={inputTextStyle}
                  unstyled={true}
                />
                {errors.excerpt && <small className="p-error">{errors.excerpt}</small>}
              </div>

              {/* Description Editor */}
              <div className="mb-2">
                <label htmlFor="description" className="w-full mb-2 block text-black dark:text-white">Description</label>
                <CustomEditor
                  value={description}
                  onTextChange={(content) => setDescription(content)}
                />
                {errors.description && <small className="p-error">{errors.description}</small>}
              </div>

              {/* Media Upload Section */}
              <div className="mb-2">
                <label className="w-full mb-2 block text-black dark:text-white">Gallery</label>
                <MediaUpload
                  existingImages={existingGallery} // Use existingGallery for displaying existing images
                  onChange={handleGalleryChange} // Handle gallery image changes
                />
                {errors.gallery && <small className="p-error">{errors.gallery}</small>}
              </div>

              {/* Submit Button */}
              <Button label="Update Product" type="submit" className={buttonsStyle} />
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast ref={toast}  position="bottom-left"/>
    </Fragment>
  );
};

export default SingleProductPage;
