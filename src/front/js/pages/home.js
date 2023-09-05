import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { ComplejoCardHome } from "../component/complejoCardHome";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <ComplejoCardHome />
    </div>
  );
};
