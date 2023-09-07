import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Chart } from "primereact/chart";

export const ChartSheduleSportCenter = () => {
  const { store, actions } = useContext(Context);
  const { allCourt, allCourtSchedule, allSportCenter } = store;
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const scheduleCountBySportCenter = {};

  // Iterar a través de las programaciones
  const datos = () => {
    allCourtSchedule.forEach((schedule) => {
      // Obtener el Sport Center al que pertenece la cancha
      const court = allCourt.find((court) => court.id === schedule.court_id);
      if (court) {
        const sportCenterId = court.sport_center_id;
        if (scheduleCountBySportCenter[sportCenterId]) {
          scheduleCountBySportCenter[sportCenterId]++;
        } else {
          scheduleCountBySportCenter[sportCenterId] = 1;
        }
      }
    });
    const labels = [];
    const valores = [];
    const data = [];

    // Llenar los arreglos con los nombres de Sport Centers y la cantidad de programaciones
    allSportCenter.forEach((sportCenter) => {
      const sportCenterId = sportCenter.id;
      const scheduleCount = scheduleCountBySportCenter[sportCenterId] || 0;
      // labels = labels.concat(sportCenter.name);
      labels.push(sportCenter.name);
      valores.push(scheduleCount);
    });
    data.push({
      label: "total reserves",
      data: [...valores],
      fill: false,
      tension: 0.4,
      //   backgroundColor: documentStyle.getPropertyValue("--blue-500"),
      //   borderColor: documentStyle.getPropertyValue("--blue-500"),
    });
    setChartData({ ...chartData, labels: labels, datasets: data });
  };
  // Resultado: labels contiene los nombres de Sport Centers y data contiene la cantidad de programaciones por Sport Center

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );

    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
      ],
      datasets: [
        {
          label: "Costo TM",
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
          fill: false,
          tension: 0.4,
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
          },
        },
        // tooltip: {
        //   callbacks: {
        //     footer: footer
        //   }
        // }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },

        y: {
          display: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
            color: surfaceBorder,
          },
        },
      },
    };
    setChartData(data);

    setChartOptions(options);
    datos();
  }, []);
  // Resultado: scheduleCountBySportCenter contiene el número de programaciones por Sport Center
  return (
    <div className="container card">
      <h1>Chart Shedule Sport Center</h1>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        // style={{
        //   height: "120px",
        //   width: "100%",
        //   // position: 'absolute',
        //   // overflow: 'hidden',
        //   // bottom: '30%',
        //   // 'margin-left': '-6%',
        //   // 'padding-left': '14%'
        // }}
      />
    </div>
  );
};
