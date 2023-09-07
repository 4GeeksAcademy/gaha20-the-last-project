import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { ComplejoCardHome } from "../component/complejoCardHome";
import Logo3d from "../component/logo3d";
import PaymentForm from "../component/paymentForm";
import Logo3dAdidas from "../component/logo3dAdidas";
import Logo3dPuma from "../component/logo3dPuma";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 bg-dark">
      <div
        className="d-flex justify-content-around"
        style={{ background: "black" }}
      >
        {/* <img
          alt="adidasLogo"
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694044678/pngegg_2_gjtvik.png"
          style={{ maxHeight: "300px", paddingTop: "150px", opacity: "0.2" }}
        /> */}
        <Logo3dAdidas />
        <Logo3d />
        <Logo3dPuma />
        {/* <img
          alt="adidasLogo"
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694053547/Untitled-1_h3qphz.png"
          style={{ maxHeight: "300px", paddingTop: "150px", opacity: "0.2" }}
        /> */}
      </div>
      <ComplejoCardHome />
    </div>
  );
};
