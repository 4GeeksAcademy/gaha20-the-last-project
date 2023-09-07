import React from "react";
import Atropos from "atropos/react";
import "../../styles/logo3d.css";
export default function Logo3dPuma({ About }) {
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
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694044591/pngegg_1_tjjqbn.png"
          alt="bride and groom smooching"
          style={{ maxHeight: "300px", opacity: "0.2", paddingTop: "30px" }}
        />
      </Atropos>
    </div>
  );
}
