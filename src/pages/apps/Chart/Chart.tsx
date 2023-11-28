import { useEffect, useState, useRef, useMemo } from 'react'
import { Line } from '@antv/g2plot'
import * as api from '~api'
import css from './Chart.module.scss'
import dayjs from 'dayjs'
import { Tickers, useTickers } from '../components/Tickers/Tickers'
import { RSIValue } from '~api/apps'

interface RSIParsedValue {
  ticker: string
  timestamp: string
  value: number
}
type RSIByTickers = Record<string, RSIParsedValue[]>;

const parseTickers = (tickers: RSIValue[], ticker: string): RSIParsedValue[] => {
  return tickers.map((item) => ({
    ...item,
    timestamp: dayjs(item.timestamp).format('MMM D, YYYY'),
    ticker
  }))
}

export const ChartApp = () => {
  const [dataset, setDataset] = useState<RSIByTickers>({});
  const { tickers, removeTicker } = useTickers()
  const chartRef = useMemo<{ chart: Line | null }>(() => ({ chart: null }), []);

  useEffect(() => {
    const loadPromises = tickers.map<Promise<RSIParsedValue[]>>((ticker) => {
      if (dataset[ticker]) {
        return Promise.resolve(dataset[ticker])
      }
      return api.apps.getRSI(ticker)
        .then((res) => {
          const parsed = parseTickers(res.results.values, ticker)
          setDataset((rsiData) => ({ ...rsiData, [ticker]: parsed }))
          return parsed
        })
        .catch(() => [])
    });
    Promise.allSettled(loadPromises)
      .then((recs) => recs.map((rec) => rec.status === 'fulfilled' ? rec.value : null))
      .then((data) => {
        const rsiRecords = data.flat().filter(Boolean) as RSIParsedValue[];
        const minValue = Math.min(...rsiRecords.map(({ value }) => value))
        const val = ((minValue - (minValue % 10)) - 10)
        const minLimit = parseInt(`${val < 0 ? 0 : val}`)

        if (!chartRef.chart) {
          chartRef.chart = new Line('js-line-chart-container', {
            data: rsiRecords,
            padding: 'auto',
            xField: 'timestamp',
            yField: 'value',
            seriesField: 'ticker',
            autoFit: true,
            xAxis: {
              tickCount: 5
            },
            yAxis: {
              minLimit
            }
            // smooth: true
          })

          chartRef.chart.render()
        } else {
          chartRef.chart.update({
            data: rsiRecords
          })
        }

      })
  }, [tickers])

  return <div className={css.container}>
    <Tickers tickers={tickers} handleClose={removeTicker} />
    <div id='js-line-chart-container' />
  </div>
}
