import React, { useContext, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import UserSuperAdminForm from "./userSuperAdminForm";
import { Context } from "../store/appContext";
import { MdAdd, MdEdit, MdOutlineDeleteOutline } from "react-icons/md";

const UserSuperAdminList = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allUser } = store;
  const [complejoAdminList, setUserSuperAdminList] = useState(allUser);
  const [deleteUserSuperAdminListDialog, setDeleteUserSuperAdminListDialog] =
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
            <span className="p-button-text p-ml-2">New Sport Center</span>
          </Button>
        </div>
      </React.Fragment>
    );
  };
  const saveUserSuperAdminList = (id) => {
    // findUserSuperAdminList(id);
    console.log("id", id);
    const userType = "superadmin";
    const idUser = id;
    actions.editUserPutUserType(idUser, userType);
    actions.createCourtSportCenter();
    setIsVisible(true);
  };
  const eliminarUserSuperAdminList = () => {
    deleteUserSuperAdminList(complejoAdminList.id);
    setDeleteUserSuperAdminListDialog(false);
    toast.current.show({
      severity: "error",
      summary: "Eliminar",
      detail: "UserSuperAdminList Eliminado",
      life: 3000,
    });
  };

  const deleteUserSuperAdminListDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteUserSuperAdminListDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarUserSuperAdminList()}
      />
    </>
  );

  const confirmDeleteUserSuperAdminList = (complejoAdminLists) => {
    setUserSuperAdminList(complejoAdminLists);
    setDeleteUserSuperAdminListDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveUserSuperAdminList(rowData.id)}
        >
          <MdEdit />
        </Button>

        {userLogged.user_type === "SUPERADMIN" && (
          <Button
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteUserSuperAdminList(rowData)}
          >
            <MdOutlineDeleteOutline />
          </Button>
        )}
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">SportCenterAdminList</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        {/* <i className="pi pi-search" /> */}
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const clearSelected = () => {
    setDeleteUserSuperAdminListDialog(false);
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
        currentPageReportTemplate="View {first} a {last} de {totalRecords} SportCenter"
        globalFilter={globalFilter}
        emptyMessage="No SportCenterAdminList."
        header={header}
        sortField="SportCenterAdminListCreated"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="ID" />

        <Column field="email" header="EMAIL" />
        <Column field="first_name" header="FIRST NAME" />
        <Column field="last_name" header="LAST NAME" />
        <Column field="user_name" header="USERNAME" />
        <Column field="user_type" header="TYPE" />
      </DataTable>

      <UserSuperAdminForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteUserSuperAdminListDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteUserSuperAdminListDialogFooter}
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
              <b>{complejoAdminList.nombreUserSuperAdminList}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UserSuperAdminList;
