/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { Context } from "../store/appContext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import moment from "moment";
import SchedulerBlock from "./sheduleBlock";
import { Skeleton } from "primereact/skeleton";
import { MdOutlineCancel, MdSave } from "react-icons/md";

const CourtScheduleAdminForm = (props) => {
  const initialCourtScheduleAdminForm = {
    court_id: null,
    start_date: null,
    end_date: null,
    status: null,
  };
  const { store, actions } = useContext(Context);
  const { allCourt, userLogged, allSportCenter } = store;
  const { isVisible, setIsVisible, startDate, court } = props;

  const [courtScheduleData, setCourtScheduleData] = useState(
    initialCourtScheduleAdminForm
  );

  const [courtData, setCourtData] = useState(allCourt);
  const [image, setImage] = useState(null);
  const [editCourt, setEditCourt] = useState(null);
  const [sportDataDropdown, setSportDataDropdown] = useState(null);
  const [courtDataDropdown, setCourtDataDropdown] = useState(null);
  const [dateInicio, setDateInicio] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);
  const [courtSchedule, setCourtSchedule] = useState(null);
  const [reservationsSave, setReservationsSave] = useState([]);
  const [sportCenterData, setSportCenterData] = useState(allSportCenter);
  const [schedulePayment, setSchedulePayment] = useState(false);
  const [sportCenterDataDropdown, setSportCenterDataDropdown] = useState(null);

  const toast = useRef(null);

  useEffect(() => {
    if (editCourt) {
      setCourtScheduleData(editCourt);
      setSelectedActividadAsociada({
        estatusActividadAsociada: editCourt.estatusActividadAsociada,
      });
    }
  }, [editCourt]);
  useEffect(() => {
    if (startDate) {
      const endDate = moment(startDate).add(1, "hours");
      setDateInicio(moment(startDate)._d);
      setDateFinal(moment(endDate)._d);
      setCourtScheduleData({
        ...courtScheduleData,
        end_date: endDate,
        start_date: moment(startDate),
      });
    }
  }, []);

  const updateField = (data, field) => {
    setCourtScheduleData({
      ...courtScheduleData,
      [field]: data,
    });
  };

  const saveCourtShedule = (status) => {
    if (!editCourt) {
      const courtScheduleDataSave = {
        ...courtScheduleData,
        start_date: reservationsSave[0].start_date,
        end_date: reservationsSave[0].end_date,
        user_id: userLogged.user_id,
        status: status,
      };
      actions.createCourtSchedule(courtScheduleDataSave);
    } else {
      updateActividadAsociada({
        ...courtScheduleData,
      });
    }
    clearSelected();
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button onClick={() => clearSelected()} severity="danger">
        <MdOutlineCancel size={30} />
        <label>Cancel</label>
      </Button>
      <Button onClick={() => setSchedulePayment(true)}>
        <MdSave size={30} />
        <label>Save</label>
      </Button>
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setCourtScheduleData(initialCourtScheduleAdminForm);
  };
  const onSportDropdown = (e) => {
    setSportDataDropdown(e.value);
    updateField(e.value.sportDropdown, "status");
  };
  const onCourtDropdown = (e) => {
    setCourtSchedule(e.value.court_schedule);
    setCourtDataDropdown(e.value);
    updateField(e.value.id, "court_id");
  };
  const onSportCenterDropdown = (e) => {
    if (e.value) {
      // const courtFilterSoportCenter = allCourt.filter(
      //   (p) => p.sport_center_id?.id === e.value.id
      // );
      setSportCenterDataDropdown(e.value);
      // updateField(e.value.id, "sport_center_id");
      setCourtData(e.value.court);
    } else {
      setCourtData(null);
      setSportCenterDataDropdown(null);
    }
  };
  const sportDropdown = [
    { sportDropdown: "FULBOL" },
    { sportDropdown: "BASQUETBOL" },
    { sportDropdown: "PADEL" },
    { sportDropdown: "VOLEIBOL" },
    { sportDropdown: "TENIS" },
    { sportDropdown: "NATACION" },
    { sportDropdown: "GIMNASIO" },
    { sportDropdown: "CROSSFIT" },
    { sportDropdown: "BOX" },
    { sportDropdown: "ZUMBA" },
    { sportDropdown: "AEROBICS" },
    { sportDropdown: "CICLISMO" },
    { sportDropdown: "GOLF" },
    { sportDropdown: "ESGRIMA" },
    { sportDropdown: "TAEKWONDO" },
    { sportDropdown: "KARATE" },
    { sportDropdown: "JUDO" },
    { sportDropdown: "BOX" },
    { sportDropdown: "MMA" },
    { sportDropdown: "TENIS DE MESA" },
    { sportDropdown: "BILLAR" },
    { sportDropdown: "BOLICHE" },
    { sportDropdown: "DARDOS" },
    { sportDropdown: "FUTBOLITO" },
    { sportDropdown: "FUTBOL AMERICANO" },
    { sportDropdown: "FUTBOL RAPIDO" },
    { sportDropdown: "BEISBOL" },
    { sportDropdown: "SOFTBOL" },
    { sportDropdown: "HANDBALL" },
    { sportDropdown: "RUGBY" },
  ];
  const schedulePaymentDialogFooter = (
    <>
      <Button
        className="p-button-text"
        severity="danger"
        onClick={() => saveCourtShedule("reservation")}
      >
        <MdOutlineCancel size={30} />
        <label>no pagar online</label>
      </Button>
      <Button
        className="p-button-text"
        onClick={() => saveCourtShedule("pagado")}
      >
        <MdSave size={30} />
        <label>pagar online</label>
      </Button>
    </>
  );
  const clearSelectedShedule = () => {
    setSchedulePayment(false);
  };
  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={schedulePayment}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={schedulePaymentDialogFooter}
        onHide={() => clearSelectedShedule()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>
            relizar el pago en la cancha seleccionada o pago online aqui poner
            referencia de pago o algo asi
          </span>
        </div>
      </Dialog>
      <Dialog
        visible={isVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "80vw" }}
        header="Create Court Schedule"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-4 mt-4">
              <div className="field col-12 md:col-12 mt-4">
                <span className="p-float-label ">
                  <Dropdown
                    value={sportCenterDataDropdown}
                    options={sportCenterData}
                    onChange={onSportCenterDropdown}
                    optionLabel="name"
                    // showClear
                    filter
                    filterBy="name"
                    // placeholder="Seleccione unidad"
                  />
                  <label>Sport Center</label>
                </span>
              </div>
              <div className="field col-12 md:col-12 mt-4">
                <span className="p-float-label ">
                  <Dropdown
                    value={courtDataDropdown}
                    options={courtData}
                    onChange={onCourtDropdown}
                    optionLabel="name"
                    // showClear
                    filter
                    filterBy="name"
                    // placeholder="Seleccione unidad"
                  />
                  <label>Cour Schedule</label>
                </span>
              </div>
              {/* <div className="field col-12 md:col-12 mt-3">
                <span className="p-float-label ">
                  <Calendar
                    // className="p-datepicker-today"
                    id="time24"
                    value={dateInicio !== null && dateInicio}
                    onChange={(e) => {
                      setDateInicio(e.value);
                      updateField(e.target.value, "start_date");
                    }}
                    showTime
                    locale="es"
                    // hourFormat="12"
                    showButtonBar
                  />{" "}
                  <label>Fecha Inicio </label>
                </span>
              </div>
              <div className="field col-12 md:col-12 mt-3">
                <span className="p-float-label ">
                  <Calendar
                    // className="p-datepicker-today"
                    id="time24"
                    value={dateFinal !== null && dateFinal}
                    onChange={(e) => {
                      setDateFinal(e.value);
                      updateField(e.target.value, "end_date");
                    }}
                    showTime
                    locale="es"
                    // hourFormat="12"
                    showButtonBar
                  />{" "}
                  <label>Fecha Final</label>
                </span>
              </div>
              <div className="field col-12 md:col-12 mt-4">
                <span className="p-float-label ">
                  <Dropdown
                    value={sportDataDropdown}
                    options={sportDropdown}
                    onChange={onSportDropdown}
                    optionLabel="sportDropdown"
                    showClear
                    filter
                    filterBy="sportDropdown"
                    // placeholder="Seleccione unidad"
                  />
                  <label>status</label>{" "}
                </span>
              </div> */}
            </div>
            <div className="field col-12 md:col-4 mt-4">
              <div className="field mt-3">
                <span className="p-float-label ">
                  <Calendar
                    // className="p-datepicker-today"
                    id="time24"
                    value={dateInicio !== null && dateInicio}
                    onChange={(e) => {
                      setDateInicio(e.value);
                      updateField(e.target.value, "start_date");
                    }}
                    locale="es"
                    // hourFormat="12"
                    showButtonBar
                    show
                    inline
                  />{" "}
                </span>
              </div>
            </div>
            <div className="field col-12 md:col-4 mt-4">
              {courtSchedule && dateInicio ? (
                <SchedulerBlock
                  courtSchedule={courtSchedule}
                  dateInicio={dateInicio}
                  reservationsSave={reservationsSave}
                  setReservationsSave={setReservationsSave}
                />
              ) : (
                <Skeleton className="h-100"></Skeleton>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </Dialog>
    </div>
  );
};
addLocale("es", {
  firstDayOfWeek: 1,
  dayNames: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ],
  dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
  monthNames: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  monthNamesShort: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
  today: "Hoy",
  clear: "Limpiar",
});
export default CourtScheduleAdminForm;
