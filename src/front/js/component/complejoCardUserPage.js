import React, { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Context } from "../store/appContext";
import CourtScheduleAdminForm from "./courtScheduleAdminForm";
import { MdAdd, MdLocationOn } from "react-icons/md";

export default function ComponenteMiguel() {
  const { store, actions } = useContext(Context);
  const { allSportCenter } = store;
  console.log(allSportCenter);

  const [sportCenters, setSportCenters] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSportCenters(allSportCenter);
  }, []);

  const getSeverity = (sportCenter) => {
    switch (sportCenter.inventoryStatus) {
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

  const listItem = (sportCenter) => {
    const numAleatorio = Math.floor(Math.random() * 5);
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-1 gap-1">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={sportCenter.url_img}
            alt={sportCenter.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {sportCenter.name}
              </div>
              <Rating value={numAleatorio} readOnly cancel={false}></Rating>
              <div className="text-2xl font-light">
                {" "}
                <MdLocationOn className="text-red-400" />
                {sportCenter.address}
              </div>
              {/* <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{sportCenter.category}</span>
                </span>
                <Tag
                  value={sportCenter.inventoryStatus}
                  severity={getSeverity(sportCenter)}
                ></Tag>
              </div> */}
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {sportCenter.court.map((court, index) => {
                return (
                  <span className="px-1" key={index}>
                    {/* {index !== 0 && "| "} */}
                    {primeraLetraMayuscula(court.sport)}
                    {/* {court} */}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  function primeraLetraMayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const gridItem = (sportCenter) => {
    const numAleatorio = Math.floor(Math.random() * 5);
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          {/* <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{sportCenter.category}</span>
            </div>
            <Tag
              value={sportCenter.inventoryStatus}
              severity={getSeverity(sportCenter)}
            ></Tag>
          </div> */}
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={sportCenter.url_img}
              alt={sportCenter.name}
              style={{ height: "200px" }}
            />
            <div className="text-2xl font-bold">{sportCenter.name}</div>
            <Rating
              value={numAleatorio}
              readOnly
              cancel={false}
              style={{ color: "red" }}
            ></Rating>
            <div className="text-2xl font-light">
              {" "}
              <MdLocationOn className="text-red-400" />
              {sportCenter.address}
            </div>
          </div>
          <div className="flex align-items-center justify-content-between">
            {/* <span className="text-2xl font-semibold">${sportCenter.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={sportCenter.inventoryStatus === "OUTOFSTOCK"}
            ></Button> */}
            <div className="text-600   font-weight-light text-xl d-flex flex-wrap">
              {sportCenter.court.map((court, index) => {
                return (
                  <span className="px-1" key={index}>
                    {index !== 0 && "| "}
                    {primeraLetraMayuscula(court.sport)}
                    {/* {court} */}
                  </span>
                );
              })}
            </div>
            <div className="text-600   font-weight-light text-xl d-flex flex-wrap">
              <Button
                className="p-button-success mr-2"
                onClick={() => setIsVisible(true)}
              >
                <MdAdd />
                <span className="p-button-text p-ml-2">Booking</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (sportCenter, layout) => {
    if (!sportCenter) {
      return;
    }

    if (layout === "list") return listItem(sportCenter);
    else if (layout === "grid") return gridItem(sportCenter);
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <DataView
        value={sportCenters}
        itemTemplate={itemTemplate}
        layout={layout}
        header={header()}
      />
      <CourtScheduleAdminForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
}