import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { ComplejoCardHome } from "../component/complejoCardHome";
import Logo3d from "../component/logo3d";
import PaymentForm from "../component/paymentForm";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 bg-dark">
      <div
        className="d-flex justify-content-around"
        style={{ background: "black" }}
      >
        <img 
        alt="adidasLogo" 
        src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694044678/pngegg_2_gjtvik.png"
        style={{maxHeight: "300px", paddingTop: "150px", opacity: "0.2"}}
        />
        <Logo3d />
        <img 
        alt="adidasLogo" 
        src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694044591/pngegg_1_tjjqbn.png"
        style={{maxHeight: "400px", opacity: "0.2"}}
        />
      </div>
      <ComplejoCardHome />
    </div>
  );
};
