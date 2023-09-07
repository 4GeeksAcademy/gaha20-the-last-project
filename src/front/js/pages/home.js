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
      <PaymentForm />
      <div
        className="d-flex justify-content-around"
        style={{ background: "black" }}
      >
        <Logo3d />
        <Logo3d />
        <Logo3d />
      </div>
      <ComplejoCardHome />
    </div>
  );
};
