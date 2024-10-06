import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ratingStyle } from "../../../layout/ratingStyle";
import { Rating } from "primereact/rating";

const Card = ({ product }) => {
  const rating = Math.round(product.rating);
  return (
    <div className="group relative rounded-lg p-4 ring-1 ring-slate-200 sm:p-6 hover:ring-1 hover:ring-sky-300 hover:shadow-lg hover:shadow-sky-300/50 transition">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg group-hover:opacity-75">
        <img
          alt="Xiaomi 11 Lite"
          className="h-full w-full object-cover object-center"
          src={product.gallery[0].url}
          width="600"
          height="600"
        />
      </div>
      <div className="pb-4 pt-10 text-center">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
          <Link to={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.title}
          </Link>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">1 out of 5 stars</p>
          <div className="flex items-center">
            <Rating value={rating} readOnly cancel={false} pt={ratingStyle} />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {product.numReviews} reviews
          </p>
        </div>
        <p className="mt-4 text-base font-medium text-slate-900">
          $ {product.price}
        </p>
      </div>
    </div>
  );
};

export default Card;
