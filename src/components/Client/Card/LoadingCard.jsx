import { Skeleton } from "primereact/skeleton";

const LoadingCard = ({ count }) => {
  const loadingCards = [];

  // Loop to generate the required number of loading cards
  for (let i = 0; i < count; i++) {
    loadingCards.push(
      <div
        key={i}
        className=" text-center group relative rounded-lg p-4  border-1 border-slate-200 sm:p-6 "
      >
        {/* Skeleton for image */}
        <Skeleton className="mx-auto" width="90%" height="150px" />

        {/* Skeleton for title and content */}
        <div className="pb-4 pt-5 text-center">
          <Skeleton className="mx-auto" width="12rem" height="20px" />

          <div className="mt-3 flex flex-col items-center">
            {/* Skeleton for rating */}
            <div className="flex items-center">
              <Skeleton className="mx-auto" width="10rem" height="20px" />
            </div>

            {/* Skeleton for reviews count */}

            <Skeleton className="mt-1" width="3rem" height="20px" />
          </div>

          {/* Skeleton for price */}

          <Skeleton className="mx-auto mt-1" width="4rem" height="20px" />
        </div>
      </div>
    );
  }

  return <>{loadingCards}</>;
};

export default LoadingCard;
