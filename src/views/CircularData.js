import React from "react";
import Chart from "react-apexcharts";
import { COLORS } from "constants/chart.constant";

const CircularData = () => {
  return (
    <Chart
      options={{
        colors: COLORS,
        labels: ["0-10 Matic", ">10 Matic", ">50 Matic", ">500 Matic", ">1000 Matic"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      }}
      series={[44, 55, 13, 43, 22]}
      height={300}
      type="pie"
    />
  );
};

export default CircularData;
