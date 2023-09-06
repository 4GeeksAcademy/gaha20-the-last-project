import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import imagenSvg from "../../img/asset-access.svg";
import { MdReportGmailerrorred } from "react-icons/md";

const AccessDeniedPage = () => {
  return (
    <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1692660499/Copy_of_Sports_Zone_Logo_Sin_Fondo_g2uuwl.png"
          alt="sport Center"
          className=" w-19rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: "53px" }}
          >
            <div
              className="flex justify-content-center align-items-center bg-transparent border-circle"
              style={{ height: "3.2rem", width: "3.2rem", fontSize: "2rem", color: "red" }}
            >
              <MdReportGmailerrorred />
            </div>
            <h1 className="text-900 font-bold text-5xl mb-2">Access Denied</h1>
            <div className="text-600 mb-5">
              You do not have the necessary permisions.
            </div>
            <Link to="/">
              <Button label="Go to Home" text />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
