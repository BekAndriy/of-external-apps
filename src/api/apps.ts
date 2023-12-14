import axios from 'axios'

const LOAD_MOCKED_DATA = true

const getStartAndEndCDate = () => {
  const year = new Date().getFullYear()
  // Months in JavaScript are 0-indexed, so January is 0 and December is 11
  const startDate = new Date(year - 1, 0, 1)
  const endDate = new Date(year - 1, 1, 1)
  console.log(startDate, endDate)

  return { start: startDate.getTime(), end: endDate.getTime() }
}

const getStartAndEndUTCDate = () => {
  const year = new Date().getFullYear()
  // Months in JavaScript are 0-indexed, so January is 0 and December is 11
  const startDate = new Date(Date.UTC(year - 1, 0, 1))
  const endDate = new Date(Date.UTC(year - 1, 1, 1))

  return { start: startDate.toISOString(), end: endDate.toISOString() }
}

interface Publisher {
  name: string
  homepage_url: string
  logo_url: string
  favicon_url: string
}

export interface News {
  id: string
  publisher: Publisher
  title: string
  author: string
  published_utc: string
  article_url: string
  tickers: string[]
  amp_url?: string
  image_url: string
  description: string
  keywords?: string[]
}

interface NewsRes {
  results: News[]
  status: string
  request_id: string
  count: number
  next_url: string
}

export const getNews = (ticker: string): Promise<NewsRes> => {
  if (LOAD_MOCKED_DATA) {
    // fetch mocked data
    return fetch('/mocks/news.json').then((res) => res.json())
  }

  const { end, start } = getStartAndEndUTCDate()
  return axios.get<NewsRes>(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&published_utc.gt=${start}&published_utc.lte=${end}&apiKey=YFrjbHiaWV4hB1726logZEGeWNpqeyI4`)
    .then(({
      data
    }) => data)
}

export interface RSIValue {
  timestamp: number
  value: number
}
interface RSIResults {
  underlying: {
    url: string
  }
  values: RSIValue[]
}
interface RSIRes {
  results: RSIResults
  status: string
  request_id: string
  next_url: string
}

// Relative Strength Index
// https://polygon.io/docs/stocks/get_v1_indicators_rsi__stockticker
export const getRSI = (ticker: string): Promise<RSIRes> => {
  if (LOAD_MOCKED_DATA) {
    // data from the prev year as a test
    return fetch(`/mocks/RSI/${ticker}.json`).then((res) => res.json())
  }
  const { end, start } = getStartAndEndCDate()
  return axios.get<RSIRes>(`https://api.polygon.io/v1/indicators/rsi/${ticker}?adjusted=true&timestamp.gt=${start}&timestamp.lte=${end}&series_type=close&order=asc&limit=${24}&apiKey=YFrjbHiaWV4hB1726logZEGeWNpqeyI4`)
    .then(({
      data
    }) => data)
}
