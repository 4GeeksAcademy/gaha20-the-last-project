import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";
<<<<<<< Updated upstream
import SportCenterUser from "../component/complejoCardUserPage";
import CourtScheduleAdminList from "../component/courtScheduleAdminList";
=======
import { SportCenterUser } from "../component/complejoCardUserPage";
>>>>>>> Stashed changes

export const UserPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
<<<<<<< Updated upstream
      <h1>COMPLEJOS</h1>
      <SportCenterUser />
      <CourtScheduleAdminList userPage={true} />
=======
        <SportCenterUser/>
>>>>>>> Stashed changes
    </div>
  );
};
