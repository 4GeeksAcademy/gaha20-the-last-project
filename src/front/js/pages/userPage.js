import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";
import  SportCenterUser  from "../component/complejoCardUserPage";
import CourtScheduleAdminList from "../component/courtScheduleAdminList";

export const UserPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div className="mt-5 me-4 ms-4">
      <SportCenterUser />
      </div>
      <CourtScheduleAdminList userPage={true} />
    </div>
  );
};
