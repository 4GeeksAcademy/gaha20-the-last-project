/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { Context } from "../store/appContext";
import { MdOutlineCancel, MdSave } from "react-icons/md";

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

  const saveSportCenter = () => {
    if (!editSportCenter) {
      actions.createSportCenter({
        ...sportCenterData,
        url_img: image,
        // user_id: store.user.id,
        user_id: store.userLogged?.user_id,
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
      <Button onClick={() => clearSelected()} severity="danger">
        <MdOutlineCancel size={30} />
        <label>Cancel</label>
      </Button>
      <Button onClick={() => saveSportCenter()}>
        <MdSave size={30} />
        <label>Save</label>
      </Button>
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setSportCenterData(initialComplejoAdminForm);
    setImage(null);
  };

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        header="Create Sport Center"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <InputText
                  value={sportCenterData.name}
                  onChange={(e) => updateField(e.target.value, "name")}
                />
                <label>name:</label>
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <InputText
                  value={sportCenterData.phone_number}
                  onChange={(e) => updateField(e.target.value, "phone_number")}
                />
                <label>phone_number:</label>
              </span>
            </div>
            <div className="field col-12 md:col-12 mt-3">
              <span className="p-float-label">
                <InputText
                  value={sportCenterData.address}
                  onChange={(e) => updateField(e.target.value, "address")}
                />
                <label>address:</label>
              </span>
            </div>

            <div className="field col-12 md:col-6 mt-3">
              <span className="">
                <label>Upload Sport Center Image</label>{" "}
                <CloudinaryUploadWidget setImage={setImage} />
                {image && (
                  <div>
                    <label>Uploaded Image:</label>
                    <img className="w-100" src={image} alt="Uploaded" />
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ComplejoAdminForm;
