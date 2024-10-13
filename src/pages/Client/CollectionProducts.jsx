import { useParams } from "react-router-dom";
import CollectionProduct from "../../components/Client/Collections/CollectionProduct";

const CollectionProducts = () => {
  const { param } = useParams();
  return (
    <main>
      <CollectionProduct collection={param} />
    </main>
  );
};
export default CollectionProducts;
