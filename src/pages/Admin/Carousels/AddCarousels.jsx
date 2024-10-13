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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SelectButton } from "primereact/selectbutton";
import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";

const AddCarousels = () => {
  const { carouselId } = useParams(); // Get carousel ID from URL parameters
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); 
  const [buttonText, setButtonText] = useState(""); 
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const showOptions = ["Show", "Hide"];
  const [showValue, setShowValue] = useState(showOptions[1]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/categories', {
          withCredentials: true,
        });
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleBannerChange = (file) => {
    setBanner(file);
  };

  // Submit the form
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/carousels/${carouselId}`, // Update the endpoint to use PUT
        {
          title,
          description,
          category,
          buttonText,
          isBannerVisible: showValue === "Show", // Convert showValue to boolean
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        if (image) {
          const formImageData = new FormData();
          formImageData.append("image", image);
          await axios.patch(
            `http://localhost:5000/api/v1/carousels/carousel-photo-upload/${carouselId}`,
            formImageData,
            { withCredentials: true }
          );
        }

        if (banner) {
          const formBannerData = new FormData();
          formBannerData.append("banner", banner);
          await axios.patch(
            `http://localhost:5000/api/v1/carousels/carousel-photo-upload/${carouselId}`,
            formBannerData,
            { withCredentials: true }
          );
        }

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Carousel updated successfully",
          life: 3000,
        });

        setTimeout(() => {
          navigate(`/admin/carousels/${carouselId}`);
        }, 3000);
      }
    } catch (error) {
      const data = error.response?.data || {};
      setErrors((prev) => ({
        ...prev,
        title: data.errors?.title?.message || "",
        description: data.errors?.description?.message || "",
        buttonText: data.errors?.buttonText?.message || "",
        category: data.errors?.category?.message || ""
      }));
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data.message || "An error occurred",
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
            Update Carousel
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
                  optionLabel="title"
                  className={`w-full ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  panelClassName="bg-white dark:bg-gray-800 border dark:border-gray-600"
                  itemTemplate={(option) => (
                    <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
                      {option.title}
                    </div>
                  )}
                  style={{
                    backgroundColor: 'var(--background-color)',
                    border: errors.category ? '1px solid #e3342f' : '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                  }}
                />
                {errors.category && <small className="text-red-500 mt-1">{errors.category}</small>}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="buttonText"
                  className="w-full mb-2 block text-black dark:text-white"
                >
                  Button Text
                </label>
                <InputText
                  id="buttonText"
                  type="text"
                  placeholder="Enter button text"
                  className={`w-full ${errors.buttonText ? 'border-red-500' : ''}`}
                  pt={inputTextStyle}
                  unstyled={true}
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
                {errors.buttonText && <small className="p-error">{errors.buttonText}</small>}
              </div>

              <div className="mb-4">
                <span className="block mb-2 text-black dark:text-white">Show Banner</span>
                <SelectButton
                  value={showValue}
                  options={showOptions}
                  onChange={(e) => {
                    setShowValue(e.value);
                    setIsBannerVisible(e.value === "Show");
                  }}
                />
              </div>

              <MediaUpload
                title="Image"
                onFileChange={handleImageChange}
              />
              <MediaUpload
                title="Banner"
                onFileChange={handleBannerChange}
              />

<div className="pt-3 rounded-b-md sm:rounded-b-lg">
                <div className="flex items-center justify-end">
                  <Button
                    label="Add Carousel"
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
      <Toast ref={toast}  position="bottom-left"/>
    </Fragment>
  );
};

export default AddCarousels;
