import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";
import SportCenterUser from "../component/complejoCardUserPage";
import CourtScheduleAdminList from "../component/courtScheduleAdminList";

export const UserPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>COMPLEJOS</h1>
      <SportCenterUser />
      <CourtScheduleAdminList userPage={true} />
    </div>
  );
};
