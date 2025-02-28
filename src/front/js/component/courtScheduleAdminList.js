import React, { useContext, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import CourtScheduleAdminForm from "./courtScheduleAdminForm";
import { Context } from "../store/appContext";
import {
  MdAdd,
  MdDeleteOutline,
  MdEdit,
  MdOutlineCancel,
  MdOutlineDeleteOutline,
  MdOutlineSearch,
  MdReportGmailerrorred,
  MdSave,
} from "react-icons/md";
import moment from "moment";

const CourtScheduleAdminList = ({ userPage, adminPage }) => {
  const { store, actions } = useContext(Context);
  const { userLogged, allCourtSchedule } = store;

  const [courtScheduleAdminList, setCourtScheduleAdminList] =
    useState(allCourtSchedule);
  const [courtScheduleDelet, setCourtScheduleDelet] = useState(null);
  const [
    deleteCourtScheduleAdminListDialog,
    setDeleteCourtScheduleAdminListDialog,
  ] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    if (store.allCourtSchedule && store.allCourtSchedule.length > 0) {
      setLoading(false);
    }
  }, [store.allCourtSchedule]);
  useEffect(() => {
    if (userPage) {
      const courtFilter = courtScheduleAdminList.filter(
        (p) => p.user_id === userLogged.user_id
      );
      setCourtScheduleAdminList(courtFilter);
    } else {
      const courtFilter = courtScheduleAdminList.filter(
        (p) => p.user_id === userLogged.user_id
      );
      setCourtScheduleAdminList(courtFilter);
    }
  }, [userPage]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          {!userPage && (
            <Button
              className="p-button-success mr-2"
              onClick={() => setIsVisible(true)}
            >
              <MdAdd />
              <span className="p-button-text p-ml-2">New Court Schedule</span>
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  };
  const saveCourtScheduleAdminList = (id) => {
    findCourtScheduleAdminList(id);
    setIsVisible(true);
  };
  const eliminarCourtScheduleAdminList = () => {
    console.log(courtScheduleDelet.id);
    actions.deteleCourtSchudele(courtScheduleDelet.id);
    setDeleteCourtScheduleAdminListDialog(false);
    toast.current.show({
      severity: "error",
      summary: "Deteted",
      detail: "Court Schedule Deleted",
      life: 3000,
    });
  };

  const deleteCourtScheduleAdminListDialogFooter = (
    <>
      <Button
        className="p-button-text"
        severity="danger"
        onClick={() => setDeleteCourtScheduleAdminListDialog(false)}
      >
        <MdOutlineCancel size={30} />
        <label>Cancel</label>
      </Button>
      <Button
        className="p-button-text"
        onClick={() => eliminarCourtScheduleAdminList()}
      >
        <MdDeleteOutline size={30} />
        <label>Delete</label>
      </Button>
    </>
  );

  const confirmDeleteCourtScheduleAdminList = (rowData) => {
    setCourtScheduleDelet(rowData);
    setDeleteCourtScheduleAdminListDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        {/* <Button
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveCourtScheduleAdminList(rowData.id)}
        >
          <MdEdit />
        </Button> */}

        <Button
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteCourtScheduleAdminList(rowData)}
        >
          <MdOutlineDeleteOutline />
        </Button>
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">CourtScheduleAdminList</h5>
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
    setDeleteCourtScheduleAdminListDialog(false);
  };
  const start_date = (rowData) => {
    const fecha = moment(rowData.start_date);
    return fecha.format("DD/MM/YY h:mm a");
  };
  const end_date = (rowData) => {
    const fecha = moment(rowData.end_date);
    return fecha.format("DD/MM/YY h:mm a");
  };
  return (
    <div className="m-4 p-3 card">
      <Toast ref={toast} />
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable
        ref={dt}
        value={courtScheduleAdminList}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="View {first} a {last} de {totalRecords} Court"
        globalFilter={globalFilter}
        emptyMessage="No CourtScheduleAdminList."
        header={header}
        sortField="CourtScheduleAdminListCreated"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
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
        <Column field="status" header="STATUS" />
      </DataTable>

      <CourtScheduleAdminForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        adminPage={true}
      />

      <Dialog
        visible={deleteCourtScheduleAdminListDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteCourtScheduleAdminListDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <MdReportGmailerrorred size={40} />

          {courtScheduleDelet && (
            <span>Are you sure about delete Court Schedule? </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default CourtScheduleAdminList;
