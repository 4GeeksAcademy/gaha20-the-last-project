import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";
import SportCenterUser from "../component/complejoCardUserPage";

export const UserPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
        <SportCenterUser/>
    </div>
  );
};

