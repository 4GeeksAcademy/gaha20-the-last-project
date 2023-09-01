import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";
import CourtUser from "../component/canchasCardUser";

export const CourtPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
        <CourtUser/>
    </div>
  );
};