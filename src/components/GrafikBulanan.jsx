import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "../index.css";


const GrafikBulanan = () => {
  // state untuk data penggunaan chart
  const [chartDataBulanan, setChartDataBulanan] = useState({});
  const [chartOptionsBulanan, setChartOptionsBulanan] = useState({});

  // data chart Bulanan
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-base");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--light");

    const data = {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      datasets: [
        {
          label: "Penjualan",
          data: [
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          ],
          fill: true,
          borderColor: documentStyle.getPropertyValue("--success"),
          tension: 0.4,
          backgroundColor: "rgba(60, 207, 78, 0.20)",
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
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
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartDataBulanan(data);
    setChartOptionsBulanan(options);
  }, []);

  return (
    <>
      <Chart
        type="line"
        data={chartDataBulanan}
        options={chartOptionsBulanan}
      />
    </>
  );
};

export default GrafikBulanan