import { Skeleton } from "primereact/skeleton";

const SimpleLoadingCard = ({ count }) => {
  const loadingCards = [];

  // Loop to generate the required number of loading cards
  for (let i = 0; i < count; i++) {
    loadingCards.push(
      <div
        key={i}
        className=" group relative flex h-64 w-56 flex-col overflow-hidden rounded-lg p-6 xl:w-auto"
      >
        {/* Skeleton for image */}
        <Skeleton
          className=" group relative flex h-64 w-56 flex-col overflow-hidden rounded-lg p-6 xl:w-auto"
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  return <>{loadingCards}</>;
};

export default SimpleLoadingCard;
