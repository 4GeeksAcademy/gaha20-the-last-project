import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/superAdminPage.css";
import UserSuperAdminList from "../component/userSuperAdminList";

export const SuperAdminPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>SUPERADMINPAGE</h1>
      <UserSuperAdminList />
    </div>
  );
};
