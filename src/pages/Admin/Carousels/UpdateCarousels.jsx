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

const UpdateCarousels = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // For redirecting after update
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Handle as HTML text
  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null); // For new image upload
  const [errors, setErrors] = useState({});

  const toast = useRef(null);

  useEffect(() => {
    // Fetch carousel data on component mount
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/carousels/${id}`, // Ensure correct endpoint
          {
            withCredentials: true,
          }
        );
        const { title, description, image } = response.data.data; // Access data correctly
        setTitle(title);
        setDescription(description); // Set description as HTML
        setExistingImage(image.url); // Set existing image URL
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch carousel data",
          life: 3000,
        });
      }
    };

    fetchCarouselData();
  }, [id]);

  const handleImageChange = (file) => {
    setNewImage(file); // Store new image
    setExistingImage(URL.createObjectURL(file)); // Preview new image
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Check if the form is submitted

    try {
        // Create FormData object for carousel data
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description); // Send description as HTML

        // If a new image was selected, append it to the form data
        if (newImage) {
            formData.append("image", newImage);
        }

        // Update carousel using PATCH request
        const updateResponse = await axios.patch(
            `http://localhost:5000/api/v1/carousels/${id}`, // Ensure correct endpoint
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Set correct content type
                },
                withCredentials: true, // Add this line
            }
        );

        console.log("Update response:", updateResponse.data); // Log the response

        const updatedCarousel = updateResponse.data.data; // Get updated carousel from response
        setTitle(updatedCarousel.title);
        setDescription(updatedCarousel.description);
        setExistingImage(updatedCarousel.image.url); // Update existing image URL

        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Carousel updated successfully",
            life: 3000,
        });

        // Redirect after updating
        navigate("/admin/carousels");
    } catch (error) {
        console.error("Error during update:", error); // Log the error for debugging
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
                <MediaUpload
                  onChange={handleImageChange}
                  maxFiles={1}
                  existingImage={existingImage} // Pass existing image
                  showImage={existingImage}
                />
              </div>

              <div className="pt-3 rounded-b-md sm:rounded-b-lg">
                <div className="flex items-center justify-end">
                  <Button
                    label="Save Changes"
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

      <Toast ref={toast} position="bottom-left"></Toast>
    </Fragment>
  );
};

export default UpdateCarousels;
