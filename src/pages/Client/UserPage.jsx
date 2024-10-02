import React from "react";
import UserHeader from "../../components/Client/UserHeader";
// import Register from "../../pages/User/Register";
import ImageSlider from "../../components/Client/Gallary/ImageSlider";

const slideData = [
  {
    image:
      "https://sendbird.imgix.net/cms/20230621_Tips-for-developing-a-successful-ecommerce-app-blog-cover.png?auto=format,compress&crop=faces",
    title: "Slide 1",
    buttonText: "Click Me",
    buttonAction: "Action 1",
  },
  {
    image:
      "https://www.aimprosoft.com/wp-content/uploads/2023/07/How-to-Build-an-eCommerce-App-Features-Tech-Stack-Costs.jpg",
    title: "Slide 2",
    buttonText: "Click Here",
    buttonAction: "Action 2",
  },
  // Add more slides as needed
];

const UserPage = () => {
  return (
    <div className="user-page">
      <UserHeader />
      <main className="main-content">
        <ImageSlider slides={slideData} />
      </main>
    </div>
  );
};

export default UserPage;
