import React, { Component, useEffect, useState } from "react";
import { Button } from "primereact/button";

const CloudinaryUploadWidget = ({ setImage }) => {
  const cloudName = "dlt3eax5v"; // Reemplaza con tu cloud name
  const uploadPreset = "cd5p6niw"; // Reemplaza con tu upload preset

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(
          "¡Hecho! Aquí está la información de la imagen: ",
          result.info
        );
        setImage(result.info.secure_url);
      }
    }
  );

  return (
    <button
      id="upload_widget"
      className="cloudinary-button"
      onClick={() => myWidget.open()}
    >
      Uploadd aqui
    </button>
  );
};

export default CloudinaryUploadWidget;
