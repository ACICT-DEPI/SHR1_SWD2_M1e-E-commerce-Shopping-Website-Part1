import React from "react";
import ReviewsDataTable from "../../components/Admin/DataTabel/ReviewsDataTabel";

const Reviews = () => {
  return (
    <div>
      <div
        className="p-4 mb-4 text-3xl text-blue-800 rounded-lg font-bold bg-blue-50 dark:bg-gray-800 dark:text-yellow-500"
        role="alert"
      >
        Reviews Task
      </div>

      {/* Use the ReviewsDataTable component */}
      <div>
        <ReviewsDataTable />
      </div>
    </div>
  );
};

export default Reviews;
