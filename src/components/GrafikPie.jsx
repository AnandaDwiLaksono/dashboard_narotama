import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "../index.css";

const GrafikPie = () => {
  const [chartDataPie, setChartDataPie] = useState({});
  const [chartOptionsPie, setChartOptionsPie] = useState({});

  // data pie
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Qris", "Bank"],
      datasets: [
        {
          data: [540, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--green"),
            documentStyle.getPropertyValue("--yellow"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-50"),
            documentStyle.getPropertyValue("--yellow-50"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartDataPie(data);
    setChartOptionsPie(options);
  }, []);

  return (
    <Chart
      type="pie"
      data={chartDataPie}
      options={chartOptionsPie}
      className="w-full md:w-30rem"
    />
  );
};

export default GrafikPie;