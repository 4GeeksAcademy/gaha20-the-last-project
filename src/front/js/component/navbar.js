import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Toolbar } from "primereact/toolbar";
import logoNavar from "../../img/logoNavar.jpeg";
import {
  MdOutlineHome,
  MdOutlineInfo,
  MdContactPhone,
  MdSupervisedUserCircle,
  MdVerifiedUser,
  MdVerified,
  MdLogin,
  MdLogout,
  MdOutlineAppRegistration,
} from "react-icons/md";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  // const { user_type } =  || null;
  const isAuthenticated = store.userLogged;
  const userRole = store.userLogged?.user_type?.toLowerCase();
  const items = [
    { label: "Home", icon: MdOutlineHome, to: "/" },
    { label: "About", icon: MdOutlineInfo, to: "/about" },
    { label: "Contact", icon: MdContactPhone, to: "/contact" },
    {
      label: "Sport Center",
      icon: MdVerifiedUser,
      to: "sport_center",
      permissions: ["user", "admin", "superadmin"],
    },

    {
      label: "Admin Page",
      icon: MdVerified,
      to: "adminpage",
      permissions: ["admin", "superadmin"],
    },

    {
      label: "SuperAdmin Page",
      icon: MdVerifiedUser,
      to: "superadminpage",
      permissions: ["superadmin"],
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      !item.permissions ||
      (isAuthenticated && item.permissions.includes(userRole))
  );

  const menuModel = filteredItems.map((item) => {
    if (item.to) {
      const IconComponent = item.icon;
      return {
        label: (
          <Link to={item.to} className="p-menuitem-link">
            <IconComponent className="m-1" />
            <span>{item.label}</span>
          </Link>
        ),
      };
    }
    return null;
  });
  const logout = () => {
    window.localStorage.removeItem("userLogged");
  };
  const end = (
    <React.Fragment>
      {!isAuthenticated && (
        <>
          <Link to="/login">
            <Button className="p-button-success mx-2 gap-3">
              <MdLogin className="m-1" />
              <span className="p-ml-2">Login</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="p-button-secondary">
              <MdOutlineAppRegistration className="m-1" />
              <span className="p-ml-2">Register</span>
            </Button>
          </Link>
        </>
      )}
      {isAuthenticated && (
        <Button
          className="p-button-danger p-mr-2"
          onClick={() => actions.logout()}
        >
          <MdLogout className="m-1" />
          <span className="p-ml-2">Logout</span>
        </Button>
      )}
    </React.Fragment>
  );
  const startContent = (
    <Link to="/">
      <img
        alt="logo"
        src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1692660499/Copy_of_Sports_Zone_Logo_Sin_Fondo_g2uuwl.png"
        height="40"
        className="mr-2 navbar-logo"
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          top: "-13px",
        }}
      ></img>
    </Link>
  );

  const endContent = (
    <React.Fragment>
      <Menubar model={menuModel} end={end} />
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="w-100">
          <Toolbar start={startContent} end={endContent} />
        </div>
      </div>
    </nav>
  );
};
