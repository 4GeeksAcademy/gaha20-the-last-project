import React from "react";
import Atropos from "atropos/react";
import "../../styles/logo3d.css";
import sportZone from "../../img/sportZone.svg";
import manager from "../../img/manager.svg";
import imagenSvg from "../../img/asset-access.svg";
export default function Logo3d() {
  return (
    <div className="container-logo3d">
      <Atropos className="atropos">
        <img
          className="leon"
          data-atropos-opacity="0.3;1"
          data-atropos-offset="-5"
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694043514/Copy_of_Sports_Zone_Logo_Sin_Fondo_3_zl6krn.png"
          alt="bride and groom smooching"
        />
        <img
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694043325/Copy_of_Sports_Zone_Logo_Sin_Fondo_2_az4fuj.png"
          data-atropos-offset="5"
          className="text"
          alt=""
        />
        {/* <img data-atropos-offset="5" className="text" src={manager} alt="" /> */}
      </Atropos>
    </div>
  );
}
