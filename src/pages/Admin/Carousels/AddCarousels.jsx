import { Fragment, useRef, useState, useEffect } from "react";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { InputText } from "primereact/inputtext";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import Cookies from "js-cookie";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import { Button } from "primereact/button";
import CustomEditor from "../../../components/Admin/CustomEditor";
import { Toast } from "primereact/toast";
import MediaUpload from "../../../components/Admin/MediaUpload/MediaUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectButton } from "primereact/selectbutton";

import "primeicons/primeicons.css";

const AddCarousels = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const showOptions = ["Show", "Hide"];
  const [showValue, setShowValue] = useState(showOptions[1]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(""); // State for image upload error
  const [bannerError, setBannerError] = useState(""); // State for banner upload error

  // Update the image path on component unmount
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image); // Clean up the image URL
      }
      if (banner) {
        URL.revokeObjectURL(banner); // Clean up the banner URL
      }
      setIsBannerVisible(showValue === showOptions[0]);
    };
  }, [image, banner]);

  const handleImageChange = (file) => {
    setImage(file);
    setImageError(""); // Clear the image error
    console.log("Image selected:", file);
  };

  const handleBannerChange = (file) => {
    setBanner(file);
    setBannerError(""); // Clear the banner error
    console.log("Banner selected:", file);
  };

  // Submit the form
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/carousels", // Assuming the endpoint is /carousels
        {
          title,
          description,
          isBannerVisible,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Check the response status
      if (response.data.status === "success") {
        const { data } = response.data; // Destructure the data from the response

        // Handle image upload if present
        if (image) {
          const formImageData = new FormData();
          formImageData.append("image", image);

          try {
            const imageResponse = await axios.patch(
              `http://localhost:5000/api/v1/carousels/carousel-photo-upload/${data._id}`,
              formImageData,
              {
                withCredentials: true,
              }
            );

            if (imageResponse.data.status !== "success") {
              throw new Error(imageResponse.data.message || "Image upload failed");
            }
          } catch (imageUploadError) {
            setImageError(imageUploadError.response?.data.message || "Image upload failed"); // Set image error
            throw imageUploadError; // Rethrow the error to handle it below
          }
        }

        // Handle banner upload if present
        if (banner) {
          const formBannerData = new FormData();
          formBannerData.append("banner", banner);

          try {
            const bannerResponse = await axios.patch(
              `http://localhost:5000/api/v1/carousels/carousel-banner-upload/${data._id}`,
              formBannerData,
              {
                withCredentials: true,
              }
            );

            if (bannerResponse.data.status !== "success") {
              throw new Error(bannerResponse.data.message || "Banner upload failed");
            }
          } catch (bannerUploadError) {
            setBannerError(bannerUploadError.response?.data.message || "Banner upload failed"); // Set banner error
            throw bannerUploadError; // Rethrow the error to handle it below
          }
        }

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Carousel created successfully",
          life: 3000,
        });

        // Wait for 3 seconds before navigating
        setTimeout(() => {
          navigate(`/admin/carousels/${data._id}`); // Redirect to the created carousel's detail page
        }, 3000);
      } else {
        handleErrors(response.data);
      }
    } catch (error) {
      const data = error.response?.data || {};
      setErrors((prev) => ({
        ...prev,
        title: data.errors?.title?.message || "",
        description: data.errors?.description?.message || "",
      }));
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
            Create Carousel
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
                  placeholder="Enter carousel title"
                  className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                  pt={inputTextStyle}
                  unstyled={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <small className="p-error">{errors.title}</small>}
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
                {errors.description && <small className="p-error">{errors.description}</small>}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="image-upload"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Image
                </label>
                <MediaUpload onChange={handleImageChange} maxFiles={1} />
                {imageError && <small className="p-error">{imageError}</small>} {/* Display image error */}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="banner-upload"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Banner
                </label>
                <MediaUpload onChange={handleBannerChange} maxFiles={1} />
                {bannerError && <small className="p-error">{bannerError}</small>} {/* Display banner error */}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="show-in-home-page"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Show in Home Page
                </label>
                <SelectButton
                  value={showValue}
                  onChange={(e) => setShowValue(e.value)}
                  options={showOptions.map((option) => ({ label: option, value: option }))}
                />
              </div>

              <div className="flex flex-row justify-end mt-4">
                <Button type="button" className="mr-2" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" label="Create" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toast ref={toast}  position="bottom-left"/>
    </Fragment>
  );
};

export default AddCarousels;
