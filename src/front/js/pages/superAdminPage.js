import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/superAdminPage.css";
import UserSuperAdminList from "../component/userSuperAdminList";
import ListUserSchedule from "../component/listUserSchedule";
import { ChartSheduleSportCenter } from "../component/chartSheduleSportCenter";

export const SuperAdminPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>SUPERADMIN PAGE</h1>
      <UserSuperAdminList />
      <ChartSheduleSportCenter />
      {/* <ListUserSchedule /> */}
    </div>
  );
};
