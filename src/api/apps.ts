import axios from 'axios'

import { newsMock } from './mocks/news'
import { rsiMock } from './mocks/rsi'
import { withMock } from './utils'

interface TickerSentiment {
  ticker: string
}

export interface NewsFeed {
  title: string
  url: string
  time_published: string
  ticker_sentiment: TickerSentiment[]

}

export interface NewsRes {
  items: string
  sentiment_score_definition: string
  relevance_score_definition: string
  feed: NewsFeed[]
}

export const getNews = withMock((tickers: string[] | string) => {
  return axios.get<NewsRes>(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickers.toString()}&limit=20&apikey=1EGJNEYKF8QTO78M`)
    .then(({
      data
    }) => data)
}, newsMock as NewsRes)

export type TimeSeries = Record<string, Record<string, string>>
interface RSIRes {
  'Time Series (Daily)': TimeSeries
  'Meta Data': Record<string, string>
}

// Relative Strength Index
// https://www.alphavantage.co/documentation/
export const getRSI = withMock((ticker: string) => {
  return axios.get<RSIRes>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=1EGJNEYKF8QTO78M`)
    .then(({
      data
    }) => data)
}, rsiMock as RSIRes)
