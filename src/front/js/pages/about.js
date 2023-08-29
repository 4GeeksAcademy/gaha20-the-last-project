import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/about.css";

export const About = () => {
  const { store, actions } = useContext(Context);

  const images = [
    "Logo_Sin_Fondo_1.png",
    "Logo_Sin_Fondo_2.png",
    "Logo_Sin_Fondo_3.png",
    "Logo_Sin_Fondo_4.png",
    "Logo_Sin_Fondo_5.png",
  ];

  return (
    <section
      id="about"
      className="about-section container-fluid p-0 text-center"
    >
      <div className="row">
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[0]}`).default}
            alt={`Imagen ${images[0]}`}
            className="img-fluid about-image rounded"
          />
        </div>
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">
              Tecnologías usadas en SportsZone Manager
            </h2>
            <p className="about-description">
              En <span className="emphasis">SportsZone Manager</span>,
              utilizamos los siguientes lenguajes:
              <ul className="text-start mx-auto" style={{ width: "350px" }}>
                <li>HTML</li>
                <li>CSS</li>
                <li>Bootstrap</li>
                <li>Javascript</li>
                <li>React</li>
                <li>Python</li>
                <li>PostgreSQL</li>
                <li>Flask</li>
                <ul>
                  <li>SQL Alchemy</li>
                </ul>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">Acerca de SZM</h2>
            <p className="about-description">
              Somos <span className="emphasis">apasionados por el deporte</span>{" "}
              y comprometidos con brindar soluciones{" "}
              <span className="emphasis emphasis-green">innovadoras</span> para
              la gestión de complejos deportivos de diversos deportes. Nuestro
              enfoque es proporcionar herramientas y tecnologías que faciliten
              la{" "}
              <span className="emphasis emphasis-green">
                administración eficiente
              </span>{" "}
              de instalaciones deportivas.
            </p>
            <p className="about-description">
              Nuestro equipo está compuesto por expertos en tecnología y
              deportes, lo que nos permite entender las{" "}
              <span className="emphasis emphasis-green">
                necesidades únicas
              </span>{" "}
              de nuestros clientes y ofrecer{" "}
              <span className="emphasis emphasis-green">
                soluciones personalizadas
              </span>{" "}
              para maximizar la experiencia de los deportistas y los
              administradores.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[1]}`).default}
            alt={`Imagen ${images[1]}`}
            className="img-fluid about-image rounded"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[1]}`).default}
            alt={`Imagen ${images[1]}`}
            className="img-fluid about-image rounded"
          />
        </div>
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">Misión y Visión de SZM</h2>
            <p className="about-description">
              En <span className="emphasis">SportsZone Manager</span>,
              fusionamos el poder del deporte con tecnología avanzada.
              <ul>
                <li>
                  <span className="emphasis emphasis-blue">Misión:</span>{" "}
                  simplificar la gestión de complejos deportivos y optimizar la
                  experiencia.
                </li>
                <li>
                  <span className="emphasis emphasis-blue">Visión:</span>{" "}
                  construir un mundo donde la reserva sea intuitiva, los pagos
                  seguros y los deportistas disfruten sin complicaciones.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">
              La Plataforma SZM: La Tecnología al Servicio del Deporte
            </h2>
            <p className="about-description">
              Nuestra{" "}
              <span className="emphasis emphasis-blue">
                plataforma en línea
              </span>{" "}
              brinda una experiencia perfectamente integrada para deportistas y
              administradores de complejos deportivos. Simplificamos la
              administración con un{" "}
              <span className="emphasis emphasis-blue">registro sencillo</span>{" "}
              para mostrar instalaciones y servicios. Facilitamos la gestión de
              horarios, pagos y ocupación. Para los deportistas, ofrecemos{" "}
              <span className="emphasis emphasis-blue">búsqueda intuitiva</span>{" "}
              de complejos cercanos. Pueden explorar instalaciones, horarios y
              reservar en tiempo real, todo desde su dispositivo. Además,
              garantizamos{" "}
              <span className="emphasis emphasis-blue">
                transacciones seguras y cifradas
              </span>{" "}
              para tranquilidad en cada paso.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[2]}`).default}
            alt={`Imagen ${images[2]}`}
            className="img-fluid about-image rounded"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[3]}`).default}
            alt={`Imagen ${images[3]}`}
            className="img-fluid about-image rounded"
          />
        </div>
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">
              Pasión por el Deporte y la Innovación Tecnológica
            </h2>
            <p className="about-description">
              Detrás de <span className="emphasis">SportsZone Manager</span> hay
              un equipo apasionado y diverso de expertos en tecnología, deporte
              y atención al cliente. Creemos en comprender las necesidades
              únicas tanto de los deportistas como de los complejos deportivos.
              Esta comprensión nos permite ofrecer{" "}
              <span className="emphasis emphasis-blue">
                soluciones personalizadas
              </span>{" "}
              que impulsan la eficiencia y la satisfacción del cliente.
            </p>
            <p className="about-description">
              Nuestro equipo está comprometido con la{" "}
              <span className="emphasis emphasis-blue">
                mejora continua y la innovación constante
              </span>
              . Trabajamos incansablemente para integrar nuevas características
              y funcionalidades que enriquezcan la experiencia de nuestros
              usuarios y permitan a los complejos deportivos brindar un servicio
              excepcional.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="about-content" style={{ padding: "200px" }}>
            <h2 className="about-heading">
              En SZM, Te Acompañamos en Tu Trayecto Deportivo
            </h2>
            <p className="about-description">
              Ya seas un deportista apasionado en busca de la mejor instalación
              para entrenar o un complejo deportivo que busca optimizar sus
              operaciones, en{" "}
              <span className="emphasis">SportsZone Manager</span> estamos aquí
              para acompañarte en tu trayecto. Nuestra plataforma te brinda las
              herramientas y la tecnología necesarias para lograr tus objetivos
              deportivos y empresariales.
            </p>
            <p className="about-description">
              Únete a nosotros en esta emocionante aventura donde el deporte y
              la tecnología se fusionan para crear una experiencia inigualable.
              Juntos, estamos redefiniendo la forma en que interactuamos con el
              mundo deportivo.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src={require(`../../img/${images[4]}`).default}
            alt={`Imagen ${images[4]}`}
            className="img-fluid about-image rounded"
          />
        </div>
      </div>
    </section>
  );
};
