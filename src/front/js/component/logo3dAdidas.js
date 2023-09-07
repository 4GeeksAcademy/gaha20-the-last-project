import React from "react";
import Atropos from "atropos/react";
import "../../styles/logo3d.css";
export default function Logo3dAdidas({ About }) {
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
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1694044678/pngegg_2_gjtvik.png"
          alt="bride and groom smooching"
          style={{ maxWidth: "222px", paddingTop: " 110px", opacity: "0.2" }}
        />
      </Atropos>
    </div>
  );
}
