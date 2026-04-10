"use client";

import { useMemo } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

type IntradayPoint = [number, number];

const MARKET_OPEN_HOUR = 9;
const MARKET_CLOSE_HOUR = 15;
const STEP_MINUTES = 1;

// Hàm tạo dữ liệu giả lập cho biểu đồ, mô phỏng dao động giá và volume trong ngày
const getIntradayData = () => {
  const sessionDate = new Date();
  sessionDate.setHours(MARKET_OPEN_HOUR, 0, 0, 0);

  const totalPoints =
    ((MARKET_CLOSE_HOUR - MARKET_OPEN_HOUR) * 60) / STEP_MINUTES;
  const priceData: IntradayPoint[] = [];
  const volumeData: IntradayPoint[] = [];

  let currentPrice = 250.4;

  for (let index = 0; index <= totalPoints; index += 1) {
    const timestamp = sessionDate.getTime() + index * STEP_MINUTES * 60 * 1000;

    const swing = Math.sin(index / 14) * 0.22;
    const noise = (Math.random() - 0.5) * 0.35;
    currentPrice = Math.max(248, currentPrice + swing + noise);

    const volumeBase = 4_500 + Math.abs(Math.sin(index / 9)) * 6_000;
    const volumeNoise = Math.random() * 2_000;

    priceData.push([timestamp, Number(currentPrice.toFixed(2))]);
    volumeData.push([timestamp, Math.round(volumeBase + volumeNoise)]);
  }

  return { priceData, volumeData };
};

// Sử dụng useMemo để tính toán dữ liệu một lần duy nhất khi component được mount
const HighchartsComponent = () => {
  const { priceData, volumeData } = useMemo(() => getIntradayData(), []);
  const referencePrice = priceData[0]?.[1] ?? 96;               // Giá tham chiếu là giá mở cửa, nếu không có dữ liệu thì mặc định là 96
  const sessionStartTime = priceData[0]?.[0];                   // Thời gian bắt đầu phiên là timestamp của điểm dữ liệu đầu tiên
  const sessionEndTime = priceData[priceData.length - 1]?.[0];  // Thời gian kết thúc phiên là timestamp của điểm dữ liệu cuối cùng
  const volumeSeriesData = useMemo(
    () =>
      volumeData.map(([timestamp, volume], index) => {
        const priceAtPoint = priceData[index]?.[1] ?? referencePrice;

        return {
          x: timestamp,
          y: volume,
          color: priceAtPoint >= referencePrice ? "#22ff84" : "#ff4d4f",
        };
      }),
    [priceData, referencePrice, volumeData],
  );

  const options = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        backgroundColor: "#050b1a",
        borderColor: "#1f2a44",
        borderWidth: 1,
        borderRadius: 8,
        width: 300,
        height: 120,
        spacing: [10, 10, 10, 10],
      },
      title: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        min: sessionStartTime,
        max: sessionEndTime,
        ordinal: false,
        minPadding: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
        tickInterval: 60 * 60 * 1000,
        lineColor: "#2a3555",
        gridLineColor: "#18223d",
        tickColor: "#2a3555",
        labels: {
          style: {
            color: "#9eb0d8",
            fontSize: "10px",
          },
          formatter() {
            const date = new Date(this.value as number);
            return `${String(date.getHours()).padStart(2, "0")}h`;
          },
        },
      },
      yAxis: [
        {
          top: 0,
          height: "72%",
          gridLineColor: "#18223d",
          lineColor: "#2a3555",
          tickColor: "#2a3555",
          title: {
            text: undefined,
          },
          labels: {
            enabled: false, // Ẩn nhãn trục y của giá
            align: "right",
            x: -4,
            style: {
              color: "#bcd0ff",
              fontSize: "11px",
            },
          },
          plotLines: [
            // Đường tham chiếu
            {
              value: referencePrice,
              color: "#fff",
              width: 1,
              dashStyle: "ShortDash",
              zIndex: 5,
              label: {
                text: "Tham chiếu",
                align: "left",
                x: 6,
                y: -4,
                style: {
                  color: "#fff",
                  fontSize: "10px",
                },
              },
            },
          ],
          opposite: true,
        },
        {
          top: "76%",
          height: "24%",
          gridLineWidth: 0,
          title: {
            text: undefined,
          },
          labels: {
            enabled: false,
          },
          offset: 0,
        },
      ],
      tooltip: {
        shared: true,
        backgroundColor: "#0a132a",
        borderColor: "#2b3a63",
        style: {
          color: "#e6efff",
        },
        formatter() {
          const date = new Date(this.x as number);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");
          const dateTimeLabel = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

          let tooltipText = `<b>${dateTimeLabel}</b>`;

          this.points?.forEach((point) => {
            tooltipText += `<br/><span style="color:${point.color}">●</span> ${point.series.name}: <b>${point.y?.toFixed(point.series.name === "VNINDEX" ? 2 : 0)}</b>`;
          });

          return tooltipText;
        },
      },
      plotOptions: {
        series: {
          animation: false,
          dataGrouping: {
            enabled: false,
          },
        },
      },
      series: [
        // Line cho giá, Column cho volume
        {
          type: "line",
          name: "VNINDEX",
          data: priceData,
          yAxis: 0,
          zoneAxis: "y",
          zones: [
            // Trên ref: xanh - dưới ref: đỏ
            {
              value: referencePrice,
              color: "#ff4d4f",
            },
            {
              color: "#22ff84",
            },
          ],
          lineWidth: 1.2, // Line width đường giá
          marker: {
            enabled: false,
          },
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          type: "column",
          name: "Volume",
          data: volumeSeriesData,
          yAxis: 1,
          borderWidth: 0,
          pointPadding: 0,
          groupPadding: 0,
          tooltip: {
            valueDecimals: 0,
          },
        },
      ],
    }),
    [
      priceData,
      referencePrice,
      sessionEndTime,
      sessionStartTime,
      volumeSeriesData,
    ],
  );

  return (
    <div className="w-75">
      <a
        href="https://api.highcharts.com/highstock/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 inline-block cursor-pointer text-xs text-[#8cb7ff] underline"
      >
        Detail Charts
      </a>

      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    </div>
  );
};

export default HighchartsComponent;
