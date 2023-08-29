/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { Context } from "../store/appContext";

const ComplejoAdminForm = (props) => {
  const initialComplejoAdminForm = {
    name: "",
    address: "",
    phone_number: "",
  };
  const { store, actions } = useContext(Context);
  const { isVisible, setIsVisible } = props;
  const [sportCenterData, setSportCenterData] = useState(
    initialComplejoAdminForm
  );
  const [image, setImage] = useState(null);
  const [editSportCenter, setEditSportCenter] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    if (editSportCenter) {
      setSportCenterData(editSportCenter);
      setSelectedActividadAsociada({
        estatusActividadAsociada: editSportCenter.estatusActividadAsociada,
      });
    }
  }, [editSportCenter]);

  const updateField = (data, field) => {
    setSportCenterData({
      ...sportCenterData,
      [field]: data,
    });
  };

  const saveSoportCenter = () => {
    if (!editSportCenter) {
      actions.createSportCenter({
        ...sportCenterData,
        url_img: image,
        // user_id: store.user.id,
        user_id: 1,
      });
    } else {
      updateActividadAsociada({
        ...sportCenterData,
      });
    }
    clearSelected();
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={() => saveSoportCenter()}
      />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setSportCenterData(initialComplejoAdminForm);
  };

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "80vw" }}
        header="Detalles de la ActividadAsociada"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={sportCenterData.name}
              onChange={(e) => updateField(e.target.value, "name")}
            />
            <label>name:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={sportCenterData.address}
              onChange={(e) => updateField(e.target.value, "address")}
            />
            <label>address:</label>
          </div>
          <br />
          <div className="field col-12 md:col-6 mt-3">
            <span className="p-float-label">
              <InputText
                value={sportCenterData.phone_number}
                onChange={(e) => updateField(e.target.value, "phone_number")}
              />
              <label>phone_number:</label>
            </span>
          </div>
          <div>
            <div>
              <h2>Subir imagen a del complejo</h2>
              <CloudinaryUploadWidget setImage={setImage} />

              {image && (
                <div>
                  <h3>Imagen subida:</h3>
                  <img src={image} alt="Uploaded" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ComplejoAdminForm;
