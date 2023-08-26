import React, { useContext, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import logoNavar from "../../img/logoNavar.jpeg";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Context } from "../store/appContext";

const SignupPage = () => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": "filled" === "filled" }
  );
  const handleSignUp = async () => {
    try {
      const signUpOk = await actions.signUp(
        userName,
        firstName,
        lastName,
        email,
        password
      );
      if (signUpOk) {
        navigate("/login");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Verify your inputs",
          life: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card pb-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <img
                src="https://res.cloudinary.com/ddvp1aeiw/image/upload/v1692660499/Copy_of_Sports_Zone_Logo_Sin_Fondo_g2uuwl.png"
                alt="Image"
                height="200"
                className="mb-3"
              />
              <div className="text-900 text-3xl font-medium mb-3">
                <h1>Welcome to SportsZone Manager!</h1> Create a User
              </div>
              <span className="text-600 font-medium">
                All inputs are needed
              </span>
            </div>

            <div>
              <label
                htmlFor="user_name1"
                className="block text-900 text-xl font-medium mb-2"
              >
                User Name
              </label>
              <InputText
                inputid="user_name1"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
                className="w-full md:w-40rem mb-5"
                style={{ padding: "1rem" }}
              />

              <label
                htmlFor="first_name1"
                className="block text-900 text-xl font-medium mb-2"
              >
                First Name
              </label>
              <InputText
                inputid="first_name1"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full md:w-40rem mb-5"
                style={{ padding: "1rem" }}
              />

              <label
                htmlFor="last_name1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Last Name
              </label>
              <InputText
                inputid="last_name1"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="First Name"
                className="w-full md:w-40rem mb-5"
                style={{ padding: "1rem" }}
              />

              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Email
              </label>
              <InputText
                inputid="email1"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full md:w-40rem mb-5"
                style={{ padding: "1rem" }}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <Password
                inputid="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-40rem"
              ></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <label htmlFor="rememberme1"></label>
                </div>
                <a
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Already have an account?
                </a>
              </div>
              <Button
                label="Sign Up"
                className="w-full p-3 text-xl"
                onClick={() => handleSignUp()}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
