import React, { useContext, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import CourtAdminForm from "./courtAdminForm";
import { Context } from "../store/appContext";
import {
  MdAdd,
  MdEdit,
  MdOutlineDeleteOutline,
  MdOutlineSearch,
} from "react-icons/md";

const CourtAdminList = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allCourt } = store;
  const [courtAdminList, setCourtAdminList] = useState(allCourt);
  const [deleteCourtAdminListDialog, setDeleteCourtAdminListDialog] =
    useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    if (store.allCourt && store.allCourt.length > 0) {
      setLoading(false);
    }
  }, [store.allCourt]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          >
            <MdAdd />
            <span className="p-button-text p-ml-2">New Court</span>
          </Button>
        </div>
      </React.Fragment>
    );
  };
  const saveCourtAdminList = (id) => {
    findCourtAdminList(id);
    setIsVisible(true);
  };
  const eliminarCourtAdminList = () => {
    deleteCourtAdminList(courtAdminList.id);
    setDeleteCourtAdminListDialog(false);
    toast.current.show({
      severity: "error",
      summary: "Eliminar",
      detail: "CourtAdminList Eliminado",
      life: 3000,
    });
  };

  const deleteCourtAdminListDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteCourtAdminListDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarCourtAdminList()}
      />
    </>
  );

  const confirmDeleteCourtAdminList = (courtAdminLists) => {
    setCourtAdminList(courtAdminLists);
    setDeleteCourtAdminListDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveCourtAdminList(rowData.id)}
        >
          <MdEdit />
        </Button>

        {userLogged.user_type === "SUPERADMIN" && (
          <Button
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteCourtAdminList(rowData)}
          >
            <MdOutlineDeleteOutline />
          </Button>
        )}
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Court List</h5>
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
    setDeleteCourtAdminListDialog(false);
  };

  return (
    <div className="m-4 p-3 card">
      <Toast ref={toast} />
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable
        ref={dt}
        value={courtAdminList}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="View {first} a {last} de {totalRecords} Court"
        globalFilter={globalFilter}
        emptyMessage="No CourtAdminList."
        header={header}
        sortField="CourtAdminListCreated"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="ID" />

        <Column field="name" header="NAME" />
        <Column field="sport" header="SPORT" />
      </DataTable>

      <CourtAdminForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteCourtAdminListDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteCourtAdminListDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {courtAdminList && (
            <span>
              Are you sure about delete CourtAdminList?{" "}
              <b>{courtAdminList.nombreCourtAdminList}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default CourtAdminList;
