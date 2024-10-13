import React, { Fragment, useEffect, useState } from "react";
import { DataForTest } from "./DataForTest"; // Import your data
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import { Rating } from "primereact/rating";

// Custom styles
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";

const ReviewsDataTable = () => {
  // Fetching data from DataForTest
  const Product = DataForTest.getData();

  // State for filtering
  const [filter, setFilter] = useState({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };

    _filter["title"].value = value;

    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  // Custom header with filter input
  const header = () => {
    return (
      <div className="flex justify-content-end focus:shadow-none">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search absolute top-4 left-3" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Filter reviews"
            className="pl-10"
            pt={inputTextStyle}
          />
        </IconField>
      </div>
    );
  };

  // UseEffect to customize paginator buttons
  useEffect(() => {
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      " <i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  // Product column template (thumbnail + title)
  const productBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <img
          src={rowData.thumbnail}
          alt={rowData.title}
          className="h-12.5 w-15 rounded-md	inline-block	mr-5"
          style={{ width: "64px" }}
        />
        <span>{rowData.title}</span>
      </Fragment>
    );
  };

  // Rating column template (star rating)
  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
  };

  return (
    <div>
      <DataTable
        value={Product} // Data source
        rows={5}
        size="small"
        dataKey="id"
        filters={filter}
        filterDisplay="menu"
        globalFilterFields={["title"]}
        header={header()}
        paginator
        paginatorTemplate="CurrentPageReport PrevPageLink NextPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
        className="custom-paginator"
        pt={dataTabelStyle}
      >
        <Column
          field="title"
          header="Product"
          style={{ minWidth: "12rem" }}
          body={productBodyTemplate}
        />
        <Column
          field="rating"
          header="Rating"
          style={{ minWidth: "12rem" }}
          body={ratingBodyTemplate}
        />
        <Column field="review" header="Review" style={{ minWidth: "12rem" }} />
        <Column field="status" header="Status" style={{ minWidth: "12rem" }} />
      </DataTable>
    </div>
  );
};

export default ReviewsDataTable;
