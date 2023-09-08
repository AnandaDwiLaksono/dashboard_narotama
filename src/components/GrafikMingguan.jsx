import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "../index.css";

const GrafikMingguan = () => {
  // state untuk data penggunaan chart
  const [chartDataMingguan, setChartDataMingguan] = useState({});
  const [chartOptionsMingguan, setChartOptionsMingguan] = useState({});

  // data chart Mingguan
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-base");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--light");
    const data = {
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "Penjualan",
          data: [12, 51, 62, 33, 40, 62, 60],
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

    setChartDataMingguan(data);
    setChartOptionsMingguan(options);
  }, []);

  return (
    <>
      <Chart
        type="line"
        data={chartDataMingguan}
        options={chartOptionsMingguan}
      />
    </>
  );
}
export default GrafikMingguan
