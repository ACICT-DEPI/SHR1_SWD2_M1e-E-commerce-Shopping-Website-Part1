import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// get data from redux store
import { useSelector } from "react-redux";
// import prime react icon and components
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

// import Custome style
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";

const CollectionsDataTabel = () => {
  //  get data from redux store
  const Product = useSelector((state) => state.allCollections);

  // for filtering data on tabel
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

  // tabel header section
  const header = () => {
    return (
      <div className="flex flex-col justify-content-end">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search absolute top-4 mt-0 left-3" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by ID"
            className="pl-10"
            pt={inputTextStyle}
          />
        </IconField>
      </div>
    );
  };
  // useEffect to change content for paginator next and prev buttons
  useEffect(() => {
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      " <i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  //  first row body
  const cllectionBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <img
          src={`${rowData.thumbnail}`}
          alt={rowData.image}
          className="h-12.5 w-15 rounded-md	inline-block	mr-5"
          style={{ width: "64px" }}
        />
        <Link to={`collections/${rowData._id}`} className="hover:text-primary">
          {rowData.title}
        </Link>
      </Fragment>
    );
  };


  return (
    <div>
      <DataTable
        value={Product}
        rows={5}
        size="small"
        dataKey="id"
        filters={filter}
        filterDisplay="menu"
        globalFilterFields={["title"]}
        header={header}
        paginator
        paginatorTemplate=" CurrentPageReport PrevPageLink  NextPageLink "
        currentPageReportTemplate=" Showing {first} to {last} of {totalRecords} results"
        className="custom-paginator"
        pt={dataTabelStyle}
      >
        <Column
          field="title"
          header="Collection"
          style={{ minWidth: "12rem" }}
          body={cllectionBodyTemplate}
          sortable
        />
        <Column
          field="description"
          header="description"
          style={{ minWidth: "12rem" }}
          sortable
        />
        <Column
          field="products"
          header="Products"
          style={{ minWidth: "12rem" }}
          sortable
        />
      </DataTable>
    </div>
  );
};

export default CollectionsDataTabel;
