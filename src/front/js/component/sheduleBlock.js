import React, { useState } from "react";
import "../../styles/schedulerBlock.css";
import moment from "moment";

function SchedulerBlock(props) {
  const { courtSchedule, dateInicio, reservationsSave, setReservationsSave } =
    props;

  const [reservations, setReservations] = useState(courtSchedule);
  // const [reservationsSave, setReservationsSave] = useState([]);

  // Función para manejar el clic en un bloque
  const handleBlockClick = (hour) => {
    // Verificar si el bloque ya está reservado
    if (isBlockReserved(hour)) {
      alert("Este bloque ya está reservado");
    } else {
      const endDate = moment(hour).add(1, "hours");
      // Si el bloque no está reservado, agregarlo a la lista de reservas
      const newReservation = {
        end_date: moment(hour).add(1, "hours"),
        start_date: moment(hour),
        status: "RESERVADO", // Puedes personalizar esto
      };
      // setReservations([...reservations, newReservation]);
      setReservationsSave([newReservation]);
    }
  };

  // Función para verificar si un bloque está reservado
  const isBlockReserved = (hour) => {
    return reservations.some(
      (reservation) =>
        moment(reservation.start_date).format("YYYY-MM-DD HH") ===
        moment(hour).format("YYYY-MM-DD HH")
    );
  };
  const isBlockReservedSave = (hour) => {
    return reservationsSave.some(
      (reservation) =>
        moment(reservation.start_date).format("YYYY-MM-DD HH") ===
        moment(hour).format("YYYY-MM-DD HH")
    );
  };

  const generateDateTimeArray = () => {
    const dateTimes = [];
    const startDate = moment(dateInicio).startOf("day").hour(6);
    const endDate = moment(dateInicio).startOf("day").hour(23);

    let currentDateTime = startDate.clone();
    while (currentDateTime <= endDate) {
      dateTimes.push(currentDateTime.format("YYYY-MM-DD HH:mm"));
      currentDateTime.add(1, "hour");
    }

    return dateTimes;
  };

  const dateTimesArray = generateDateTimeArray();

  const halfLength = Math.ceil(dateTimesArray.length / 2);
  const leftColumn = dateTimesArray.slice(0, halfLength);
  const rightColumn = dateTimesArray.slice(halfLength);

  // Renderizar los bloques de 6 a.m. a 11 p.m.
  // const renderBlocks = () => {
  //   const blocks = [];
  //   for (let hour = 6; hour <= 23; hour++) {
  //     const reserved = isBlockReserved(hour);
  //     const blockClassName = `blockSheduler ${reserved ? "reserved" : ""}`;
  //     blocks.push(
  //       <div
  //         key={hour}
  //         className={blockClassName}
  //         onClick={() => handleBlockClick(hour)}
  //       >
  //         {hour}:00 - {hour + 1}:00
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="blocks-container">
  //       <div className="column">{blocks.slice(0, 9)}</div>
  //       <div className="column">{blocks.slice(9)}</div>
  //     </div>
  //   );
  // };

  // return (
  //   <div className="scheduler">
  //     <h2>Reservar Horarios</h2>
  //     {renderBlocks()}
  //   </div>
  // );
  const renderBlocks = (column) => {
    return column.map((dateTime) => {
      const reserved = isBlockReserved(dateTime);
      const reservedSave = isBlockReservedSave(dateTime);
      const blockClassName = `blockSheduler ${reserved ? "reserved" : ""} ${
        reservedSave ? "reservedSave" : ""
      }`;
      return (
        <div
          key={dateTime}
          className={blockClassName}
          onClick={() => handleBlockClick(dateTime)}
        >
          {moment(dateTime, "YYYY-MM-DD HH:mm").format("HH:mm")} {" - "}
          {moment(dateTime, "YYYY-MM-DD HH:mm").add(1, "hours").format("HH:mm")}
        </div>
      );
    });
  };

  return (
    <div className="scheduler">
      <h2>Reservar Horarios</h2>
      <div className="columns-container d-flex">
        <div className="column w-100">{renderBlocks(leftColumn)}</div>
        <div className="column w-100">{renderBlocks(rightColumn)}</div>
      </div>
    </div>
  );
}

export default SchedulerBlock;
