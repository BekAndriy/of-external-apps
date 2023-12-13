import { useState, useEffect } from 'react'
import { Space, Tag } from 'antd'
import css from './Tickers.module.scss'
import { isOpenFin } from '~services/openFin'

interface TickersProps {
  tickers: string[]
  handleClose: (ticker: string) => unknown
}

const DEFAULT_TAG = 'EPAM'
const CONTEXT_TYPE = 'instrument'

export const useTickers = () => {
  const [tickers, setTickers] = useState<string[]>([DEFAULT_TAG])

  function handleInstrumentContext(contextInfo) {
    // const { type, id } = contextInfo
    const tickers = contextInfo.id.tickers.split(',')
    setTickers(tickers)
  }

  const setInstrumentContext = (tickers: string[]) => {
    isOpenFin && fin.me.interop.setContext({
      type: CONTEXT_TYPE,
      id: { tickers: tickers.toString() }
    })
  }

  useEffect(() => {
    if (isOpenFin) {
      fin.me.interop.addContextHandler(handleInstrumentContext, CONTEXT_TYPE)
    }
    // logic to receive context
  }, [])

  const setTickersAndEmit = (newTickers: string[]) => {
    setTickers(newTickers)
    setInstrumentContext(newTickers)
  }

  const removeTicker = (tag: string) => {
    if (tickers.length > 1) {
      const newTickers = tickers.filter((item) => item !== tag)
      setTickersAndEmit(newTickers)
    }
  }

  const addTicker = (ticker: string) => {
    if (!tickers.includes(ticker)) {
      const newTickers = [...tickers, ticker]
      setTickersAndEmit(newTickers)
    }
  }

  return {
    tickers,
    addTicker,
    removeTicker
  }
}

export const Tickers = (props: TickersProps) => {
  const { handleClose, tickers } = props

  return <div className={css.container}>
    <Space>
      {
        tickers.map((tag) => <Tag key={tag}
          closable={tickers.length > 1}
          onClose={(e) => {
            handleClose(tag)
          }}>{tag}</Tag>)
      }
    </Space>
  </div>
}
