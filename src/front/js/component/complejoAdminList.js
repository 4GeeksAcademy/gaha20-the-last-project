import React, { useContext, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ComplejoAdminForm from "./complejoAdminForm";
import { Context } from "../store/appContext";
import {
  MdAdd,
  MdEdit,
  MdOutlineDeleteOutline,
  MdOutlineSearch,
} from "react-icons/md";
import CourtAdminForm from "./courtAdminForm";

const ComplejoAdminList = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allSportCenter } = store;

  const [complejoAdminList, setComplejoAdminList] = useState(allSportCenter);
  const [deleteComplejoAdminListDialog, setDeleteComplejoAdminListDialog] =
    useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCourt, setIsVisibleCourt] = useState(false);
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    if (store.allSportCenter && store.allSportCenter.length > 0) {
      setLoading(false);
    }
  }, [store.allSportCenter]);
  useEffect(() => {
    const complejoFilter = complejoAdminList.filter(
      (p) => p.user_id === userLogged.user_id
    );
    setComplejoAdminList(complejoFilter);
  }, []);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          >
            <MdAdd />
            <span className="p-button-text p-ml-2">New Sport Center</span>
          </Button>
        </div>
      </React.Fragment>
    );
  };
  const saveComplejoAdminList = (id) => {
    findComplejoAdminList(id);
    setIsVisible(true);
  };
  const eliminarComplejoAdminList = () => {
    deleteComplejoAdminList(complejoAdminList.id);
    setDeleteComplejoAdminListDialog(false);
    toast.current.show({
      severity: "error",
      summary: "Eliminar",
      detail: "ComplejoAdminList Eliminado",
      life: 3000,
    });
  };

  const deleteComplejoAdminListDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteComplejoAdminListDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarComplejoAdminList()}
      />
    </>
  );

  const confirmDeleteComplejoAdminList = (complejoAdminLists) => {
    setComplejoAdminList(complejoAdminLists);
    setDeleteComplejoAdminListDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveComplejoAdminList(rowData.id)}
        >
          <MdEdit />
        </Button>

        {userLogged.user_type === "SUPERADMIN" && (
          <Button
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteComplejoAdminList(rowData)}
          >
            <MdOutlineDeleteOutline />
          </Button>
        )}
      </div>
    );
  };
  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Court Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Court Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };
  const leftToolbarTemplate2 = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            className="p-button-success mr-2"
            onClick={() => setIsVisibleCourt(true)}
          >
            <MdAdd />
            <span className="p-button-text p-ml-2">New Court</span>
          </Button>
        </div>
      </React.Fragment>
    );
  };
  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <div className="d-flex justify-content-between">
          {" "}
          <h5>
            Courts for {data.first_name} {data.last_name}
          </h5>{" "}
          <Button
            className="p-button-success mr-2"
            onClick={() => setIsVisibleCourt(true)}
          >
            <MdAdd />
            <span className="p-button-text p-ml-2">New Court</span>
          </Button>{" "}
        </div>
        <DataTable value={data.court}>
          {/* <Column field="id" header="ID" /> */}

          <Column field="name" header="NAME" />
          <Column field="sport" header="SPORT" />
        </DataTable>
      </div>
    );
  };
  const allowExpansion = (rowData) => {
    return rowData.court.length > 0;
  };
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Sport Center List</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <MdOutlineSearch size={20} />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const clearSelected = () => {
    setDeleteComplejoAdminListDialog(false);
  };
  const imageFinalBodyTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.url_img
            ? rowData.url_img
            : "https://res.cloudinary.com/ddvp1aeiw/image/upload/v1692660499/Copy_of_Sports_Zone_Logo_Sin_Fondo_g2uuwl.png"
        }
        onError={(e) =>
          (e.target.src =
            "https://res.cloudinary.com/ddvp1aeiw/image/upload/v1692660499/Copy_of_Sports_Zone_Logo_Sin_Fondo_g2uuwl.png")
        }
        alt={rowData.url_img}
        className="product-image"
        height="100px"
        width={"100px"}
      />
    );
  };
  return (
    <div className="m-4 p-3 card">
      <Toast ref={toast} />
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <CourtAdminForm
        isVisible={isVisibleCourt}
        setIsVisible={setIsVisibleCourt}
      />
      <DataTable
        ref={dt}
        value={complejoAdminList}
        dataKey="id"
        className="datatable-responsive"
        // selectionMode="single"
        globalFilter={globalFilter}
        emptyMessage="No SportCenterAdminList."
        header={header}
        sortField="SportCenterAdminListCreated"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        {/* <Column body={actionBodyTemplate}></Column> */}
        {/* <Column field="id" header="ID" /> */}
        <Column expander={allowExpansion} style={{ width: "5rem" }} />

        <Column field="name" header="NAME" />
        <Column field="address" header="ADDRESS" />
        <Column field="phone_number" header="PHONE NUMBER" />
        <Column field="url_img" header="PHOTO" body={imageFinalBodyTemplate} />
      </DataTable>

      <ComplejoAdminForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteComplejoAdminListDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteComplejoAdminListDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {complejoAdminList && (
            <span>
              Are you sure about delete SportCenterAdminList?{" "}
              <b>{complejoAdminList.nombreComplejoAdminList}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ComplejoAdminList;
