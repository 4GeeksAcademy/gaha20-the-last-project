/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { Context } from "../store/appContext";

const UserSuperAdminForm = (props) => {
  const initialUserSuperAdminForm = {
    name: "",
    address: "",
    phone_number: "",
  };
  const { store, actions } = useContext(Context);
  const { isVisible, setIsVisible } = props;
  const [sportCenterData, setSportCenterData] = useState(
    initialUserSuperAdminForm
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
        label="Cancel"
        // icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button
        label="Save"
        // icon="pi pi-check"
        onClick={() => saveSportCenter()}
      />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setSportCenterData(initialUserSuperAdminForm);
  };

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "80vw" }}
        header="Sport Center Form"
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
            <label>Name</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={sportCenterData.address}
              onChange={(e) => updateField(e.target.value, "address")}
            />
            <label>Address</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={sportCenterData.phone_number}
              onChange={(e) => updateField(e.target.value, "phone_number")}
            />
            <label>Phone_number</label>
          </div>
          <br />
          <div>
            <div>
              <h4>Sport Center Photo</h4>
              <CloudinaryUploadWidget setImage={setImage}/>
              {image && (
                <div>
                  <h3>Uploaded Image:</h3>
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

export default UserSuperAdminForm;
