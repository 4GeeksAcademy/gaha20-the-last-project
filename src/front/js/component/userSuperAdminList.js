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
import {
  MdAdd,
  MdEdit,
  MdOutlineCancel,
  MdOutlineDeleteOutline,
  MdSave,
} from "react-icons/md";
import { Dropdown } from "primereact/dropdown";

const UserSuperAdminList = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allUser } = store;
  const [userSuperAdminList, setUserSuperAdminList] = useState(allUser);
  const [editTyperUserSuperAdminList, setEditTyperUserSuperAdminList] =
    useState(allUser);
  const [editUserTypeDialog, setEditUserTypeDialog] = useState(false);
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
  const saveUserSuperAdminList = (user) => {
    // findUserSuperAdminList(id);
    const userType =
      user.user_type === "user"
        ? "admin"
        : user.user_type === "admin"
        ? "superadmin"
        : "user";
    const idUser = user.id;
    actions.editUserPutUserType(idUser, userType);
  };
  const editTypeUser = () => {
    saveUserSuperAdminList(editTyperUserSuperAdminList);
    setEditUserTypeDialog(false);
    toast.current.show({
      severity: "error",
      summary: "Eliminar",
      detail: "UserSuperAdminList Eliminado",
      life: 3000,
    });
  };

  const editTypeUserDialogFooter = (
    <>
      <Button
        className="p-button-text"
        severity="danger"
        onClick={() => setEditUserTypeDialog(false)}
      >
        <MdOutlineCancel size={30} />
        <label>Cancel</label>
      </Button>
      <Button className="p-button-text" onClick={() => editTypeUser()}>
        <MdSave size={30} />
        <label>Save</label>
      </Button>
    </>
  );

  const confirmEditTypeUser = (rowData) => {
    setEditTyperUserSuperAdminList(rowData);
    setEditUserTypeDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          className="p-button-rounded p-button-success mr-2"
          onClick={() => confirmEditTypeUser(rowData)}
        >
          <MdEdit />
        </Button>
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">User list</h5>
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
    setEditUserTypeDialog(false);
  };

  return (
    <div className="m-4 p-3 card">
      <Toast ref={toast} />

      <DataTable
        ref={dt}
        value={userSuperAdminList}
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
        visible={editUserTypeDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={editTypeUserDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {editTyperUserSuperAdminList && (
            <span>
              Are you sure to assign the role{" "}
              <b>
                {editTyperUserSuperAdminList.user_type === "user"
                  ? "admin"
                  : editTyperUserSuperAdminList.user_type === "admin"
                  ? "superadmin"
                  : "user"}
              </b>{" "}
              to the user <b>{editTyperUserSuperAdminList.email}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UserSuperAdminList;
