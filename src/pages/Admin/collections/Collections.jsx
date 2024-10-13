import { Fragment } from "react";
import AddButton from "../../../components/Admin/Buttons/AddButton";
import CollectionsDataTabel from "../../../components/Admin/DataTabel/CollectionsDataTabel";

const Collections = () => {
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <h1 className="text-3xl dark:text-whiten	">Collections</h1>
        <AddButton label={"Create Collection"} path={"add"} />
      </div>
      <div>
        <CollectionsDataTabel />
      </div>
    </Fragment>
  );
};
export default Collections;
