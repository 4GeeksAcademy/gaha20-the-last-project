import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/adminPage.css";
import ComplejoAdminList from "../component/complejoAdminList";
import CourtAdminList from "../component/courtAdminList";
import CourtScheduleAdminList from "../component/courtScheduleAdminList";
import CourtScheduleAdminCalendary from "../component/courtScheduleAdminCalendary";

export const Adminpage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>ADMIN PAGE</h1>

      <ComplejoAdminList />
      <CourtAdminList />
      <CourtScheduleAdminList />
      <CourtScheduleAdminCalendary />
    </div>
  );
};
