import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { COLORS } from "constants/chart.constant";
import moment from "moment";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const Charts = ({ apiCallof }) => {
  const [requestData, setRequestData] = useState([]);

  async function getdataInternal() {
    return await fetch(`${baseUrl}/${apiCallof}`)
      .then((res) => res.json())
      .then((data) => {
        setRequestData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getdataInternal();
  }, []);

  const reqSeriesJan = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("jan")
  );

  const reqSeriesFeb = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("feb")
  );

  const reqSeriesMar = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("mar")
  );

  const reqSeriesApr = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("apr")
  );

  const reqSeriesMay = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("may")
  );

  const reqSeriesJune = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("jun")
  );

  const reqSeriesJul = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("jul")
  );

  const reqSeriesAug = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("aug")
  );

  const reqSeriesSep = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("sep")
  );

  const reqSeriesOct = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("oct")
  );

  const reqSeriesNov = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("nov")
  );

  const reqSeriesDec = requestData.filter((i) =>
    moment
      .unix(i.timeStamp)
      .toString()
      .toLowerCase()
      .includes("dec")
  );

  const data = [
    {
      name: "Transactions",
      data: [
        reqSeriesJan.length,
        reqSeriesFeb.length,
        reqSeriesMar.length,
        reqSeriesApr.length,
        reqSeriesMay.length,
        reqSeriesJune.length,
        reqSeriesJul.length,
        reqSeriesAug.length,
        reqSeriesSep.length,
        reqSeriesOct.length,
        reqSeriesNov.length,
        reqSeriesDec.length,
      ],
    },
  ];

  return (
    <>
      <Chart
        options={{
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "30%",
              endingShape: "rounded",
            },
          },
          colors: COLORS,
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val) => `${val}`,
            },
          },
        }}
        series={data}
        height={300}
        type="bar"
      />
    </>
  );
};

export default Charts;
