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
import { MdOutlineCancel, MdSave } from "react-icons/md";

const CourtAdminForm = (props) => {
  const initialCourtAdminForm = {
    name: "",
    sport_center_id: "",
    sport: "",
  };
  const { store, actions } = useContext(Context);
  const { allSportCenter, userLogged } = store;
  const { isVisible, setIsVisible } = props;
  const [courtData, setCourtData] = useState(initialCourtAdminForm);
  const [sportCenterData, setSportCenterData] = useState(allSportCenter);
  const [image, setImage] = useState(null);
  const [editCourt, setEditCourt] = useState(null);
  const [sportDataDropdown, setSportDataDropdown] = useState(null);
  const [sportCenterDataDropdown, setSportCenterDataDropdown] = useState(null);

  const toast = useRef(null);

  useEffect(() => {
    if (editCourt) {
      setCourtData(editCourt);
      setSelectedActividadAsociada({
        estatusActividadAsociada: editCourt.estatusActividadAsociada,
      });
    }
  }, [editCourt]);
  useEffect(() => {
    const complejoFilter = sportCenterData?.filter(
      (p) => p.user_id === userLogged?.user_id
    );
    setSportCenterData(complejoFilter);
  }, [isVisible]);

  const updateField = (data, field) => {
    setCourtData({
      ...courtData,
      [field]: data,
    });
  };

  const saveCourt = () => {
    if (!editCourt) {
      actions.createCourtSportCenter(courtData);
    } else {
      updateActividadAsociada({
        ...courtData,
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
      <Button onClick={() => saveCourt()}>
        <MdSave size={30} />
        <label>Save</label>
      </Button>
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setCourtData(initialCourtAdminForm);
    setSportCenterDataDropdown(null);
    setSportCenterData(allSportCenter);
  };
  const onSportDropdown = (e) => {
    setSportDataDropdown(e.value);
    updateField(e.value.sportDropdown, "sport");
  };
  const onSportCenterDropdown = (e) => {
    setSportCenterDataDropdown(e.value);
    updateField(e.value.id, "sport_center_id");
  };
  const sportDropdown = [
    { sportDropdown: "FUTBOL" },
    { sportDropdown: "BASQUETBOL" },
    { sportDropdown: "PADEL" },
    { sportDropdown: "BEACH TENNIS" },
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
  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "80vw" }}
        header="Create Court"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6 mt-4">
              <span className="p-float-label ">
                <Dropdown
                  value={sportCenterDataDropdown}
                  options={sportCenterData}
                  onChange={onSportCenterDropdown}
                  optionLabel="name"
                  showClear
                  filter
                  filterBy="name"
                />
                <label>Sport Center</label>
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-4">
              <span className="p-float-label ">
                <InputText
                  value={courtData.name}
                  onChange={(e) => updateField(e.target.value, "name")}
                />
                <label>name:</label>
              </span>
            </div>

            <div className="field col-12 md:col-6 mt-4">
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
                <label>Sport</label>{" "}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CourtAdminForm;
