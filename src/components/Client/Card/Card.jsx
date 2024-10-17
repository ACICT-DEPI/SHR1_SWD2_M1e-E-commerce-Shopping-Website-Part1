import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ratingStyle } from "../../../layout/ratingStyle";
import { Rating } from "primereact/rating";

const Card = ({ product }) => {
  const rating = Math.round(product.rating);
  return (
    <div className="group relative rounded-lg p-4  ring-1 ring-slate-200 sm:p-6 dark:ring-slate-600 hover:ring-1 hover:ring-sky-300 hover:shadow-lg hover:shadow-sky-300/50 transition">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg group-hover:opacity-75">
        <img
          alt="Xiaomi 11 Lite"
          className="h-full w-full object-cover object-center"
          src={product.gallery[0].url}
        />
      </div>
      <div className="pb-4 pt-10 text-center">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
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
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-200">
            {product.numReviews} reviews
          </p>
        </div>
        <p className="mt-4 text-base font-medium text-slate-900 dark:text-slate-100">
          {(product.price * (1 - (product.discount / 100))).toFixed(2)} EGP  
        </p>
        <span className="text-xs font-normal line-through text-start dark:text-slate-400 text-slate-600">{product.price} EGP</span>
      </div>
      {product.discount > 0 && (<div className="absolute w-9 text-center font-medium  border-2 border-red-600 text-red-600 rounded-md text-sm py-1 top-1 right-1">{product.discount}%</div>)}

    </div>
  );
};

export default Card;
