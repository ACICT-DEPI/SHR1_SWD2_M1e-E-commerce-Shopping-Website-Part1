import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import SingleOrderDetails from "./SingleOrderDetails";
import EditOrderForm from "./EditOrderForm";
import { DELETE_ORDER, EDIT_ORDER } from "../../../redux/Action";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { Toast } from "primereact/toast";

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);
  const toast = useRef(null);

  const testOrders = [
    {
      id: "12345",
      customer: "John Doe",
      paymentStatus: "Paid",
      shippingStatus: "Shipped",
      totalQuantity: 3,
      total: 150.99,
      date: "2024-09-30",
    },
    {
      id: "67890",
      customer: "Jane Smith",
      paymentStatus: "Pending",
      shippingStatus: "Processing",
      totalQuantity: 5,
      total: 250.49,
      date: "2024-10-01",
    },
  ];

  const [filter, setFilter] = useState({
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Handle filter input changes
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      id: { value, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue(value);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleBack = () => {
    setShowOrderDetails(false);
    resetOrderStates();
  };

  const handleDeleteOrder = (id) => {
    dispatch({ type: DELETE_ORDER, payload: id });
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Order deleted successfully",
      life: 2000,
    });
  };

  const handleEditOrder = (order) => {
    dispatch({ type: EDIT_ORDER, payload: order });
  };

  const confirmDeleteOrder = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this order?",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteOrder(id),
      reject: () =>
        toast.current.show({
          severity: "warn",
          summary: "Canceled",
          detail: "Order deletion was canceled", // Custom message for cancellation
          life: 2000,
        }),
    });
  };

  const handleEditOrderClick = (order) => {
    setEditOrder(order);
    setShowEditForm(true);
  };

  const handleSaveOrder = (updatedOrder) => {
    // Save edited order logic
    setShowEditForm(false);
    setEditOrder(null);
  };

  const handleCancelEdit = () => {
    resetOrderStates();
  };

  const resetOrderStates = () => {
    setSelectedOrder(null);
    setEditOrder(null);
    setShowEditForm(false);
  };

  // Header for the DataTable
  const header = () => (
    <div className="flex flex-col justify-content-end">
      <IconField iconPosition="left" className="relative">
        <InputIcon className="pi pi-search" />
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

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        className="mr-2"
        aria-label="Edit order"
        onClick={() => handleEditOrderClick(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        aria-label="Delete order"
        onClick={(e) => confirmDeleteOrder(e, rowData.id)}
      />
    </>
  );

  const totalBodyTemplate = (rowData) => `$${rowData.total.toFixed(2)}`;

  const idTemplate = (rowData) => (
    <Link
      to={`/admin/orders/${rowData.id}`}
      className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
      onClick={(e) => {
        e.preventDefault();
        handleOrderClick(rowData);
      }}
    >
      {rowData.id}
    </Link>
  );

  const nameTemplate = (rowData) => (
    <Link
      to={`/admin/orders/${rowData.customer}`}
      className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
    >
      {rowData.customer}
    </Link>
  );

  const paymentStatusTemplate = (rowData) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        rowData.paymentStatus === "Paid"
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      }`}
    >
      {rowData.paymentStatus}
    </span>
  );

  const shippingStatusTemplate = (rowData) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        rowData.shippingStatus === "Shipped"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      }`}
    >
      {rowData.shippingStatus}
    </span>
  );

  useEffect(() => {
    // Customize pagination button text
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      " <i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  return (
    <div>
      <Toast ref={toast} position="bottom-right" />

      {showOrderDetails && selectedOrder ? (
        <SingleOrderDetails order={selectedOrder} onBack={handleBack} />
      ) : showEditForm && editOrder ? (
        <EditOrderForm
          order={editOrder}
          onSave={handleSaveOrder}
          onCancel={handleCancelEdit}
          onBack={handleBack}
        />
      ) : (
        <Fragment>
          <div className="flex flex-nowrap justify-between mb-5">
            <h1 className="text-3xl dark:text-whiten	">Orders</h1>
          </div>
          <div>
            <DataTable
              value={allOrders}
              rows={5}
              size="small"
              dataKey="id"
              filters={filter}
              filterDisplay="menu"
              globalFilterFields={["id", "customer", "paymentStatus"]}
              header={header}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
              className="custom-paginator"
              pt={dataTabelStyle}
            >
              <Column
                field="id"
                header="#"
                body={idTemplate}
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="customer"
                header="Customer"
                body={nameTemplate}
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="paymentStatus"
                header="Payment Status"
                body={paymentStatusTemplate}
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="shippingStatus"
                header="Shipping Status"
                body={shippingStatusTemplate}
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="totalQuantity"
                header="Items"
                style={{ minWidth: "12rem" }}
              />
              <Column field="total" header="Total" body={totalBodyTemplate} />
              <Column
                field="date"
                header="Date"
                style={{ minWidth: "12rem" }}
              />
              <Column
                body={actionBodyTemplate}
                header="Actions"
                style={{ minWidth: "12rem" }}
              />
            </DataTable>
          </div>
        </Fragment>
      )}
      <ConfirmPopup />
    </div>
  );
};

export default Orders;
