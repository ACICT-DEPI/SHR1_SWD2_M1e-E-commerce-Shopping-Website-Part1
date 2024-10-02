import React from "react";
import { Link } from "react-router-dom";

const OurCollectionSection = ({ data }) => {
  const card = data.slice(0, 5).map((colection) => {
    return (
      <Link
        to={`/collections/smartphones`}
        class="group relative flex h-64 w-56 flex-col overflow-hidden rounded-lg p-6 xl:w-auto"
      >
        <span aria-hidden="true" class="absolute inset-0">
          <img
            src={colection.images[0]}
            alt={colection.title}
            class="h-full w-full object-cover object-center transition duration-500 group-hover:scale-125"
            style={{ width: "500px" }}
          />
        </span>
        <span
          aria-hidden="true"
          class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-800 opacity-50"
        ></span>
        <span class="relative mt-auto text-center text-xl font-bold text-white">
          {colection.title}
        </span>
      </Link>
    );
  });
  return (
    <section class="bg-white px-4 pt-24 space-y-5 sm:px-6 sm:pt-32 xl:mx-auto xl:max-w-7xl lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-slate-900">
          Our collections
        </h2>
        <Link
          to={"/collections"}
          class="hidden text-sm font-semibold text-sky-700 hover:text-sky-600 sm:block"
        >
          Browse all collections <span aria-hidden="true"> →</span>
        </Link>
      </div>
      <div>
        <div class="mt-5 flow-root">
          <div class="-my-2">
            <div class="relative box-content h-64 overflow-x-auto py-2 xl:overflow-visible">
              <div class="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-8 xl:space-x-0 xl:px-0">
                {card}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCollectionSection;
