import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // استيراد axios

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
  //  تخزين البيانات التي يتم جلبها من الـ API
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل

  // for filtering data on table
  const [filter, setFilter] = useState({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // جلب البيانات من الـ API عند تحميل المكون
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories"
        );
        const fetchedCategories = response.data.data.categories; // جلب الفئات
        setCategories(fetchedCategories); // تعيين الفئات في الحالة
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); // استدعاء الدالة لجلب البيانات
  }, []); // سيتم جلب البيانات مرة واحدة عند تحميل المكون

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };

    _filter["title"].value = value;

    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  // table header section
  const header = () => {
    return (
      <div className="flex flex-col justify-content-end">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search absolute top-4 mt-0 left-3" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by Title"
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

  // body template for the first row
  const cllectionBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <img
          src={`${rowData.image.url}`}
          alt={rowData.title}
          className="h-12.5 w-15 rounded-md	inline-block	mr-5"
          style={{ width: "64px" }}
        />
        <Link
          to={`/admin/collections/${rowData._id}`}
          className="hover:text-primary"
        >
          {rowData.title}
        </Link>
      </Fragment>
    );
  };

  return (
    <div>
      <DataTable
        value={categories}
        rows={5}
        size="small"
        dataKey="_id"
        filters={filter}
        filterDisplay="menu"
        globalFilterFields={["title"]}
        header={header}
        paginator
        paginatorTemplate=" CurrentPageReport PrevPageLink  NextPageLink "
        currentPageReportTemplate=" Showing {first} to {last} of {totalRecords} results"
        className="custom-paginator"
        pt={dataTabelStyle}
        loading={loading} // إظهار حالة التحميل
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
          header="Description"
          style={{ minWidth: "12rem" }}
          sortable
          body={(rowData) => (
            <span
              className="truncate overflow-hidden w-full  inline-block"
              dangerouslySetInnerHTML={{
                __html: rowData.description,
              }}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default CollectionsDataTabel;
