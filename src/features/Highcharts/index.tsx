'use client'

import { useMemo } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

type IntradayPoint = [number, number]

const MARKET_OPEN_HOUR = 9
const MARKET_CLOSE_HOUR = 15
const STEP_MINUTES = 1

const getIntradayData = () => {
  const sessionDate = new Date()
  sessionDate.setHours(MARKET_OPEN_HOUR, 0, 0, 0)

  const totalPoints = ((MARKET_CLOSE_HOUR - MARKET_OPEN_HOUR) * 60) / STEP_MINUTES
  const priceData: IntradayPoint[] = []
  const volumeData: IntradayPoint[] = []

  let currentPrice = 250.4

  for (let index = 0; index <= totalPoints; index += 1) {
    const timestamp = sessionDate.getTime() + index * STEP_MINUTES * 60 * 1000

    const swing = Math.sin(index / 14) * 0.22
    const noise = (Math.random() - 0.5) * 0.35
    currentPrice = Math.max(248, currentPrice + swing + noise)

    const volumeBase = 4_500 + Math.abs(Math.sin(index / 9)) * 6_000
    const volumeNoise = Math.random() * 2_000

    priceData.push([timestamp, Number(currentPrice.toFixed(2))])
    volumeData.push([timestamp, Math.round(volumeBase + volumeNoise)])
  }

  return { priceData, volumeData }
}

const HighchartsComponent = () => {
  const { priceData, volumeData } = useMemo(() => getIntradayData(), [])

  const options = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        backgroundColor: '#050b1a',
        borderColor: '#1f2a44',
        borderWidth: 1,
        borderRadius: 8,
        height: 300,
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
        type: 'datetime',
        tickInterval: 60 * 60 * 1000,
        lineColor: '#2a3555',
        gridLineColor: '#18223d',
        tickColor: '#2a3555',
        labels: {
          style: {
            color: '#9eb0d8',
            fontSize: '12px',
          },
          formatter() {
            return Highcharts.dateFormat('%Hh', this.value as number)
          },
        },
      },
      yAxis: [
        {
          top: 0,
          height: '72%',
          gridLineColor: '#18223d',
          lineColor: '#2a3555',
          tickColor: '#2a3555',
          title: {
            text: undefined,
          },
          labels: {
            align: 'right',
            x: -4,
            style: {
              color: '#bcd0ff',
              fontSize: '11px',
            },
          },
          opposite: true,
        },
        {
          top: '76%',
          height: '24%',
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
        backgroundColor: '#0a132a',
        borderColor: '#2b3a63',
        style: {
          color: '#e6efff',
        },
        xDateFormat: '%H:%M',
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
        {
          type: 'line',
          name: 'Price',
          data: priceData,
          yAxis: 0,
          color: '#22ff84',
          lineWidth: 1.8,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
          color: '#8cb7ff',
          borderWidth: 0,
          pointPadding: 0,
          groupPadding: 0,
          tooltip: {
            valueDecimals: 0,
          },
        },
      ],
    }),
    [priceData, volumeData],
  )

  return (
    <div style={{ width: '100%', maxWidth: 740 }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType='stockChart'
        options={options}
      />
    </div>
  )
}

export default HighchartsComponent
