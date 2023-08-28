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
import { MdAdd, MdEdit, MdOutlineDeleteOutline } from "react-icons/md";

const ComplejoAdminList = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allSportCenter } = store;
  console.log("userLogged", userLogged);
  console.log("store", store.allSportCenter);
  const [complejoAdminList, setComplejoAdminList] = useState(allSportCenter);
  const [deleteComplejoAdminListDialog, setDeleteComplejoAdminListDialog] =
    useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    if (store.allSportCenter && store.allSportCenter.length > 0) {
      setLoading(false);
    }
  }, [store.allSportCenter]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          >
            <MdAdd />
            <span className="p-button-text p-ml-2">Nuevo Sport Center</span>
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
        label="Si"
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

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ComplejoAdminList</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const clearSelected = () => {
    setDeleteComplejoAdminListDialog(false);
  };
  const imageFinalBodyTemplate = (rowData) => {
    console.log("rowData", rowData);
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

      <DataTable
        ref={dt}
        value={complejoAdminList}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} SportCenter"
        globalFilter={globalFilter}
        emptyMessage="No hay ComplejoAdminList."
        header={header}
        sortField="ComplejoAdminListCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="id" />

        <Column field="name" header="name" />
        <Column field="address" header="address" />
        <Column field="phone_number" header="phone_number" />
        <Column
          field="url_img"
          header="url_img"
          body={imageFinalBodyTemplate}
        />
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
              Esta seguro que quiere eliminar la ComplejoAdminList{" "}
              <b>{complejoAdminList.nombreComplejoAdminList}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ComplejoAdminList;
