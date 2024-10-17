import React, { Fragment } from "react";
import { ReviewsDataTabel } from "../../../components/Admin/DataTabel/ReviewsDataTabel";

const Reviews = () => {
  return (
    <Fragment>
    <div className="flex flex-nowrap justify-between mb-5">
      <h1 className="text-3xl dark:text-whiten	">Reviews</h1>
    </div>
    <div>
      <ReviewsDataTabel />
    </div>
  </Fragment>
  );
};

export default Reviews;
