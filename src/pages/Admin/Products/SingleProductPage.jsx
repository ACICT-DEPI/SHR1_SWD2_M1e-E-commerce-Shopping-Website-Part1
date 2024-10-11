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

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`, {
          withCredentials: true,
        });
        const {
          title,
          description,
          price,
          discount,
          quantity,
          excerpt,
          rating,
          numReviews,
          image,
          isFeatured,
        } = response.data.data;

        setTitle(title);
        setDescription(description);
        setPrice(price);
        setDiscount(discount);
        setQuantity(quantity);
        setExcerpt(excerpt);
        setRating(rating);
        setNumReviews(numReviews);
        setIsFeatured(isFeatured);
        setExistingImage(image?.url);
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

  const handleImageChange = (file) => {
    setNewImage(file);
    setExistingImage(URL.createObjectURL(file));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("quantity", quantity);
        formData.append("excerpt", excerpt);
        formData.append("isFeatured", isFeatured);

        console.log("Form Data:", Object.fromEntries(formData)); // For debugging

        const updateResponse = await axios.patch(
            `http://localhost:5000/api/v1/products/${id}`,
            formData,
            {
                withCredentials: true,
            }
        );

        if (updateResponse.data.status === "success") {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Product updated successfully",
            });

            // Navigate to admin/products after showing the toast
            setTimeout(() => {
                navigate('/admin/products'); // Redirect to the products page
                window.location.reload(); // Refresh the page
            }, 2000); // Wait for 2 seconds

            // Only upload the new image if it exists
            if (newImage) {
                const imageFormData = new FormData();
                imageFormData.append("image", newImage);

                const imageResponse = await axios.patch(
                    `http://localhost:5000/api/v1/products/product-photo-upload/${id}`,
                    imageFormData,
                    {
                        withCredentials: true,
                    }
                );

                if (imageResponse.data.status !== "success") {
                    throw new Error(imageResponse.data.message || "Image upload failed");
                }
            }
        } else {
            throw new Error("Failed to update product");
        }
    } catch (error) {
        console.error("Error updating product:", error.response || error.message);
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
              <div className="mb-2">
                <label htmlFor="title" className="w-full mb-2 block text-black dark:text-white">
                  Title
                </label>
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
              </div>

              <div className="mb-2">
                <label htmlFor="price" className="w-full mb-2 block text-black dark:text-white">
                  Price
                </label>
                <InputText
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  className="w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="discount" className="w-full mb-2 block text-black dark:text-white">
                  Discount
                </label>
                <InputText
                  id="discount"
                  type="number"
                  placeholder="Enter discount percentage"
                  className="w-full"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="quantity" className="w-full mb-2 block text-black dark:text-white">
                  Quantity
                </label>
                <InputText
                  id="quantity"
                  type="number"
                  placeholder="Enter product quantity"
                  className="w-full"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="excerpt" className="w-full mb-2 block text-black dark:text-white">
                  Excerpt
                </label>
                <InputText
                  id="excerpt"
                  type="text"
                  placeholder="Enter product excerpt"
                  className="w-full"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="description" className="w-full mb-2 block text-black dark:text-white">
                  Description
                </label>
                <CustomEditor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="image-upload" className="w-full mb-2 block text-black dark:text-white">
                  Image
                </label>
                <MediaUpload
                  onChange={handleImageChange}
                  maxFiles={1}
                  existingImage={existingImage}
                  showImage={existingImage}
                />
              </div>

              <div className="pt-3 rounded-b-md sm:rounded-b-lg">
                <div className="flex items-center justify-end">
                  <Button label="Save Changes" size="normal" className="text-base" pt={buttonsStyle} />
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

export default SingleProductPage;
