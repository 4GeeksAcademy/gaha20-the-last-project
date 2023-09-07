import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Context } from "../store/appContext";
import moment from "moment";

export default function ListUserSchedule() {
  const { store, actions } = useContext(Context);
  const { allUser } = store;
  console.log("allUser", allUser);
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const data = [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
        orders: [
          {
            id: "1000-0",
            productCode: "f230fh0g3",
            date: "2020-09-13",
            amount: 65,
            quantity: 1,
            customer: "David James",
            status: "PENDING",
          },
          {
            id: "1000-1",
            productCode: "f230fh0g3",
            date: "2020-05-14",
            amount: 130,
            quantity: 2,
            customer: "Leon Rodrigues",
            status: "DELIVERED",
          },
          {
            id: "1000-2",
            productCode: "f230fh0g3",
            date: "2019-01-04",
            amount: 65,
            quantity: 1,
            customer: "Juan Alejandro",
            status: "RETURNED",
          },
          {
            id: "1000-3",
            productCode: "f230fh0g3",
            date: "2020-09-13",
            amount: 195,
            quantity: 3,
            customer: "Claire Morrow",
            status: "CANCELLED",
          },
        ],
      },
      {
        id: "1001",
        code: "nvklal433",
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        price: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
        orders: [
          {
            id: "1001-0",
            productCode: "nvklal433",
            date: "2020-05-14",
            amount: 72,
            quantity: 1,
            customer: "Maisha Jefferson",
            status: "DELIVERED",
          },
          {
            id: "1001-1",
            productCode: "nvklal433",
            date: "2020-02-28",
            amount: 144,
            quantity: 2,
            customer: "Octavia Murillo",
            status: "PENDING",
          },
        ],
      },
    ];
    setProducts(allUser);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status.toLowerCase()}
        severity={getOrderSeverity(rowData)}
      ></Tag>
    );
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        width="64px"
        className="shadow-4"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getProductSeverity(rowData)}
      ></Tag>
    );
  };

  const getProductSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const getOrderSeverity = (order) => {
    switch (order.status) {
      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "danger";

      case "PENDING":
        return "warning";

      case "RETURNED":
        return "info";

      default:
        return null;
    }
  };

  const allowExpansion = (rowData) => {
    return rowData.court_schedule.length > 0;
  };
  const start_date = (rowData) => {
    const fecha = moment(rowData.start_date);
    return fecha.format("DD/MM/YY h:mm a");
  };
  const end_date = (rowData) => {
    const fecha = moment(rowData.end_date);
    return fecha.format("DD/MM/YY h:mm a");
  };
  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>
          Schedule for {data.first_name} {data.last_name}
        </h5>
        <DataTable value={data.court_schedule}>
          <Column field="id" header="ID" />
          <Column field="court_id" header="COURT" />
          <Column field="user_id" header="USER" />
          <Column
            field="start_date"
            header="START DATE"
            body={start_date}
            dataType="date"
          />
          <Column
            field="end_date"
            header="END DATE"
            body={end_date}
            dataType="date"
          />
          <Column
            field="status"
            header="Status"
            body={statusOrderBodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field="email" header="email" sortable />
      </DataTable>
    </div>
  );
}
