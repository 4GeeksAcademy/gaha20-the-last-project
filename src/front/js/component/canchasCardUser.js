import React, { useEffect, useRef, useState, useContext } from "react";
import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";
import { FaAccessibleIcon } from "react-icons/fa";
import { Context } from "../store/appContext";

export default function CourtUser() {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);
  const ds = useRef(null);

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
      },
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
      },
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
      },
    ];
    setProducts(store.allSportCenter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const getSeverity = (product) => {
  //   switch (product.inventoryStatus) {
  //     case "INSTOCK":
  //       return "success";

  //     case "LOWSTOCK":
  //       return "warning";

  //     case "OUTOFSTOCK":
  //       return "danger";

  //     default:
  //       return null;
  //   }
  // };

  const itemTemplate = (data) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={data.url_img}
            alt={data.name}
          />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2xl font-bold text-900">{data.name}</div>
                <div className="text-700">{data.sport}</div>
              </div>
              <div className="flex flex-column gap-2">
                {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag product-category-icon"></i>
                  {/* <span className="font-semibold">{data.category}</span> */}
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-2xl font-semibold">
                {data.phone_number}
              </span>
              {/* <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                disabled={data.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
              <Tag
                value={data.inventoryStatus}
                severity={getSeverity(data)}
              ></Tag> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const footer = (
  //   <Button
  //     type="text"
  //     onClick={() => ds.current.load()}
  //   ><FaAccessibleIcon/></Button>
  // );

  return (
    <div className="card">
      <DataScroller
        ref={ds}
        value={products}
        itemTemplate={itemTemplate}
        rows={5}
        loader
        // footer={footer}
        // header="Click Load Button at Footer to Load More"
      />
    </div>
  );
}
