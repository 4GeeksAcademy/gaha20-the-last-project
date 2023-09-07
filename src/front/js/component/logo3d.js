import React from "react";
import Atropos from "atropos/react";
import "../../styles/logo3d.css";
export default function Logo3d({ About }) {
  return (
    <div
      className="container-logo3d"
      style={
        About
          ? { backgroundColor: "none" }
          : { backgroundColor: "rgba(0, 0, 0)" }
      }
    >
      <Atropos className="atropos">
        <img
          className="leon"
          data-atropos-opacity="0.3;1"
          data-atropos-offset="-5"
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694043514/Copy_of_Sports_Zone_Logo_Sin_Fondo_3_zl6krn.png"
          alt="bride and groom smooching"
          // style={{ width: "300px", height: "300px" }}
        />
        <img
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694043325/Copy_of_Sports_Zone_Logo_Sin_Fondo_2_az4fuj.png"
          data-atropos-offset="15"
          className="text"
          alt=""
          // style={{ width: "300px", height: "300px" }}
        />
        {/* <img data-atropos-offset="5" className="text" src={manager} alt="" /> */}
      </Atropos>
    </div>
  );
}
