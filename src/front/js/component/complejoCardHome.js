import React, { Component } from "react";
import { Button } from "primereact/button";
import { MdLocationOn } from "react-icons/md";
import { Rating } from "primereact/rating";

export const ComplejoCardHome = () => {
  const demo = [
    {
      name: "Complejo 1",
      address: "lecheria",
      phone_number: "+584141234567",
      sport: ["PADEL", "FUTBOL", "TENIS"],
      imagenUrl:
        "https://i2-prod.derbytelegraph.co.uk/incoming/article7619017.ece/ALTERNATES/s1200/2_BLR_TEM230922PadelCentrejpeg.jpg",
    },
    {
      name: "Complejo 2",
      address: "bacelona",
      phone_number: "+584141234567",
      sport: ["BASQUET", "NATACION", "GIMNASIO"],
      imagenUrl:
        "https://integralspor.com/uploads/blog/detail/162445d5fbd2b893161.jpg",
    },
    {
      name: "Complejo 3",
      address: "puerto la cruz",
      phone_number: "+584141234567",
      sport: ["CROSSFIT", "BOXEO", "KARATE"],
      imagenUrl:
        "https://www.sinburpeesenmiwod.com/wp-content/uploads/2016/12/como-montar-box-crossfit.jpg",
    },
    {
      name: "Complejo 4",
      address: "piritu",
      phone_number: "+584141234567",
      sport: ["TAEKWONDO", "JUDO", "TENIS DE MESA"],
      imagenUrl:
        "https://taekwondoestepona.com/wp-content/uploads/2021/06/InstalacionestaekwondoEstepona.jpg",
    },
    {
      name: "Complejo 5",
      address: "clarines",
      phone_number: "+584141234567",
      sport: ["BILLAR", "BOWLING", "GOLF", "VOLEIBOL"],
      imagenUrl:
        "https://sportingclubcasino.es/wp-content/uploads/2020/05/2020-05-08-casino-132.jpg",
    },
  ];

  const complejosAleatorios = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const demoAleatorio = complejosAleatorios([...demo]);

  function primeraLetraMayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const numAleatorio = Math.floor(Math.random() * 5);
  return (
    <div className=" bg-black-alpha-10 w-100">
      <div className="container py-8">
        <h3 className="text-700 text-center mb-5">More liked Sport Centers</h3>
        <div className="grid">
          {demoAleatorio.map((item, index) => {
            if (index < 3) {
              return (
                <div className="col-12 lg:col-6 xl:col-4" key={index}>
                  <div className="card mb-0 border-0 cardAPPS">
                    <span className="cardImagenAdorno position-relative">
                      <div
                        className="card-img-top  d-flex flex-column justify-content-end p-2 align-items-start"
                        style={{
                          backgroundImage: `url(${item.imagenUrl})`,
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
                          className="flex align-items-center justify-content-center bg-blue-100 border-round"
                          style={{ width: "2.5rem", height: "2.5rem" }}
                        >
                          <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                      </div>
                      <div>
                        <div className="text-600   font-weight-light text-xl d-flex flex-wrap">
                          {item.sport.map((sport, index) => {
                            return (
                              <span className="px-1" key={index}>
                                {index !== 0 && "| "}
                                {primeraLetraMayuscula(sport)}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <Button
                        label="Book"
                        severity="info"
                        // text
                        raised
                        rounded
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Button
        label="All Sport Centers"
        severity="info"
        // text
        raised
        rounded
        style={{ width: "75%" }}
      />
    </div>
  );
};
