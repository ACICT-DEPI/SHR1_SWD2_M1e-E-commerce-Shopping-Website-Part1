import { FilterMatchMode } from 'primereact/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ORDER, EDIT_ORDER } from '../../redux/Action';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { inputTextStyle } from '../../layout/inputTextStyle';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { dataTabelStyle } from '../../layout/dataTabelStyle';
import { Column } from 'primereact/column';
import { confirmPopup } from 'primereact/confirmpopup';

export const OrderDataTabel = () => {
    const allOrders = useSelector((state) => state.allOrders);
    const dispatch = useDispatch(); 

    const [filter, setFilter] = useState({ id: { value: null, matchMode: FilterMatchMode.CONTAINS } });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [editOrder, setEditOrder] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
  
    // Handle filter input changes
    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      setFilter({ ...filter, id: { value, matchMode: FilterMatchMode.CONTAINS } });
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
      };
    
      const handleEditOrder = (order) => {
        dispatch({ type: EDIT_ORDER, payload: order });
      };
    
      const confirmDeleteOrder = (event, id) => {
        confirmPopup({
          target: event.currentTarget,
          message: "Are you sure you want to delete this order?",
          icon: 'pi pi-exclamation-triangle',
          accept: () => handleDeleteOrder(id),
          reject: () => console.log("Action canceled"),
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
        <InputIcon className="pi pi-search absolute top-4 left-3" />
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
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
      rowData.paymentStatus === "Paid"
        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
    }`}>
      {rowData.paymentStatus}
    </span>
  );

  const shippingStatusTemplate = (rowData) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
      rowData.shippingStatus === "Shipped"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
    }`}>
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
    <div> <DataTable
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
    <Column field="id" header="#" body={idTemplate} style={{ minWidth: "12rem" }} />
    <Column field="customer" header="Customer" body={nameTemplate} style={{ minWidth: "12rem" }} />
    <Column field="paymentStatus" header="Payment Status" body={paymentStatusTemplate} style={{ minWidth: '12rem' }} />
    <Column field="shippingStatus" header="Shipping Status" body={shippingStatusTemplate} style={{ minWidth: "12rem" }} />
    <Column field="totalQuantity" header="Items" style={{ minWidth: "12rem" }} />
    <Column field="total" header="Total" body={totalBodyTemplate} />
    <Column field="date" header="Date" style={{ minWidth: "12rem" }} />
    <Column body={actionBodyTemplate} header="Actions" style={{ minWidth: "12rem" }} />
  </DataTable></div>
  )
}
