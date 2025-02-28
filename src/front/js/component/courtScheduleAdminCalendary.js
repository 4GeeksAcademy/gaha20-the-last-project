/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable prefer-const */
import React, { useContext, useEffect, useState } from "react";
import "../../styles/calendary.css";

import { Skeleton } from "primereact/skeleton";

// import ProgramacionVentanaAngenaV2 from './ProgramacionVentanaAngenaV2'

import "react-big-scheduler/lib/css/style.css";

import CalendaryLibreria from "./calendaryLibreria";
import { Context } from "../store/appContext";

const CourtScheduleAdminCalendary = () => {
  const { store, actions } = useContext(Context);
  const { userLogged, allCourtSchedule, allCourt, allUser, allSportCenter } =
    store;
  const [sportCenterData, setSportCenterData] = useState(allSportCenter);
  const [courtData, setCourtData] = useState([]);
  console.log(courtData);
  useEffect(() => {
    const complejoFilter = sportCenterData?.filter(
      (p) => p.user_id === userLogged?.user_id
    );
    setSportCenterData(complejoFilter);
    // sportCenterData.map((item, index) => {
    //   setCourtData([...courtData, item.court]);
    // });

    const allCourts = [];

    complejoFilter.forEach((sportCenter) => {
      allCourts.push(...sportCenter.court);
    });

    setCourtData(allCourts);
  }, []);
  useEffect(() => {}, [sportCenterData]);

  // const { dataPresupuestos } = useContext(DataPresupuestoContext);
  // const { presupuestos } = useContext(PresupuestoContext);
  // dataPresupuestos.sort((o1, o2) => {
  //   if (o1.fechaInicioDataPresupuesto < o2.fechaInicioDataPresupuesto) {
  //     return -1;
  //   } else if (o1.fechaInicioDataPresupuesto > o2.fechaInicioDataPresupuesto) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  //   const schedulerData = new SchedulerData(
  //     new moment().format(DATE_FORMAT),
  //     ViewTypes.Week
  //   )
  //   moment.locale('he-il')
  //   schedulerData.setLocaleMoment(moment)
  let auxCronograma = [];
  const colores = ["#0d6efd", "#08afff", "#dc3545", "#f759ab", "#797d82"];
  const resources = [];
  // eslint-disable-next-line no-unused-vars
  for (let prop1 in courtData) {
    resources.push({
      id: `r${courtData[prop1].id - 1}`,
      name: courtData[prop1].name,
    });
    for (let prop in allCourtSchedule) {
      const user = allUser.find(
        (user) => user.id === allCourtSchedule[prop].user_id
      );
      if (allCourtSchedule[prop]?.court_id === courtData[prop1]?.id) {
        auxCronograma.push({
          id: allCourtSchedule[prop].id,
          // title: allCourtSchedule[prop].user_id,
          title:
            user?.first_name +
            " " +
            user?.last_name +
            " // " +
            allCourtSchedule[prop].status,
          start: allCourtSchedule[prop].start_date,
          end: allCourtSchedule[prop].end_date,
          resourceId: `r${courtData[prop1].id - 1}`,
          movable: false,
          bgColor:
            allCourtSchedule[prop].status === "Paid" ? "#08afff" : "#dc3545",
        });
      }
    }
  }
  console.log(auxCronograma);
  console.log(resources);
  return (
    <div>
      {auxCronograma.length === 0 ? (
        <div className="field col-12  pr-0">
          <div className=" custom-skeleton p-4">
            <div className="flex justify-content-between mt-3 mb-3">
              <div className="mr-2">
                <Skeleton
                  width="13rem"
                  height="3rem"
                  className="mb-2"
                ></Skeleton>
              </div>

              <Skeleton width="40rem" height="3rem"></Skeleton>
            </div>

            <Skeleton width="100%" height="18rem" className="mb-2"></Skeleton>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <CalendaryLibreria events={auxCronograma} resources={resources} />
          </div>
        </>
      )}
    </div>
  );
};
export default CourtScheduleAdminCalendary;
