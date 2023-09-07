import React, { Component, useContext } from "react";
import { Button } from "primereact/button";
import { MdLocationOn } from "react-icons/md";
import { Rating } from "primereact/rating";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ComplejoCardHome = () => {
  const { store, actions } = useContext(Context);
  const { allSportCenter, userLogged } = store;
  console.log("allSportCenter", store);

  const complejosAleatorios = (array) => {
    if (array.length === 0) {
      return [];
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const allSportCenterAleatorio = complejosAleatorios([...allSportCenter]);

  function primeraLetraMayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="  w-100" style={{ background: "black" }}>
      <div className="container ">
        <h1 className="text-center">More liked Sport Centers</h1>
        <div className="grid">
          {allSportCenterAleatorio &&
            allSportCenterAleatorio.map((item, index) => {
              if (index < 3) {
                const numAleatorio = Math.floor(Math.random() * 5);
                return (
                  <div className="col-12 lg:col-6 xl:col-4" key={index}>
                    <div className="card mb-0 border-0 cardAPPS">
                      <span className="cardImagenAdorno position-relative">
                        <div
                          className="card-img-top  d-flex flex-column justify-content-end p-2 align-items-start"
                          style={{
                            backgroundImage: `url(${item.url_img})`,
                            height: "200px",
                            backgroundSize: "cover",
                          }}
                        >
                          <h1 className=" position-relative"> {item.name}</h1>
                        </div>
                      </span>
                      <div className="card-body ">
                        <div className="flex justify-content-between mb-3">
                          <div>
                            <div className="text-700 font-medium text-xl ">
                              <Rating
                                value={numAleatorio}
                                readOnly
                                cancel={false}
                                style={{ color: "#ffc107" }}
                              ></Rating>
                              <MdLocationOn className="text-green-400" />
                              {primeraLetraMayuscula(item.address)}
                            </div>
                          </div>

                          <div
                            className="flex align-items-center justify-content-center bg-dark border-round"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            <i className="fa-solid fa-book"></i>
                          </div>
                        </div>
                        <div>
                          <div className="text-600   font-weight-light text-xl d-flex flex-wrap">
                            {[
                              ...new Set(
                                item.court.map((sport) => sport.sport)
                              ),
                            ].map((uniqueSport, index) => (
                              <span className="px-1" key={index}>
                                {index !== 0 && "| "}
                                {primeraLetraMayuscula(uniqueSport)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <Link to={userLogged ? "/sport_center" : "/login"}>
                          {" "}
                          <Button
                            label="Book"
                            severity="info"
                            className="bg-success"
                            raised
                            rounded
                            style={{
                              width: "75%",
                              borderColor: "rgb(55, 183, 51)",
                            }}
                          />{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <Link to={userLogged ? "/sport_center" : "/login"}>
        <Button
          className="bg-success"
          label="All Sport Centers"
          severity="info"
          raised
          rounded
          style={{ width: "30%", borderColor: "rgb(55, 183, 51)" }}
        ></Button>
      </Link>
    </div>
  );
};
