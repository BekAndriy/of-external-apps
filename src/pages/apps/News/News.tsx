import { Dropdown, type MenuProps, Space, Table, Tag, message } from 'antd'
import { useState, useEffect } from 'react'
import * as api from '~api'
import css from './News.module.scss'
import { Tickers, useTickers } from '../components/Tickers/Tickers'
import dayjs from 'dayjs'
import { debounce } from '~services/data'
import { NewsFeed } from '~api/apps'

interface TickersProps {
  tickers: string[]
  showTickersCount: number
  onTagSelected: (key: string) => unknown
}

interface News {
  id: string
  title: string
  publishedAt: string
  tickers: string[]
  url: string
}

type NewsByTicker = Record<string, News[]>

const PUBLISHED_DATE_FORMAT = 'MMM D, YYYY';

const parseFeeds = (feeds: NewsFeed[]): News[] => {
  return feeds.map(({ time_published, title, url, ticker_sentiment }) => ({
    title: title,
    publishedAt: dayjs(time_published).format(PUBLISHED_DATE_FORMAT),
    url,
    tickers: ticker_sentiment.map(({ ticker }) => ticker),
    // unique id to render table properly
    id: Math.random().toString(32).split('.')[1]
  }))
}

const TickersList = (props: TickersProps) => {
  const { onTagSelected, tickers, showTickersCount } = props
  const showTickers = tickers.splice(0, showTickersCount)
  const items: MenuProps['items'] = tickers.map((ticker) => ({
    key: ticker,
    label: ticker
  }))

  return <Space size="small">
    {
      showTickers.map((ticker) => <Tag className={css.tag}
        key={ticker}
        onClick={(e) => {
          e.stopPropagation()
          onTagSelected(ticker)
        }}>{ticker}</Tag>)
    }
    {
      tickers.length
        ? <Dropdown menu={{
          items,
          onClick: ({ key }) => onTagSelected(key)
        }}
          trigger={['click']}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}>
          <Tag className={css.tag}>...</Tag>
        </Dropdown>
        : null
    }
  </Space>
}

export const NewsApp = () => {
  const [dataset, setDataset] = useState<NewsByTicker>({});
  const { addTicker, removeTicker, tickers } = useTickers()
  const [news, setNews] = useState<News[]>([])
  const [showTickers, setShowTickers] = useState(2)

  const load = () => {
    const loadPromises = tickers.map<Promise<News[]>>((ticker) => {
      if (dataset[ticker]) {
        return Promise.resolve(dataset[ticker])
      }
      return api.apps.getNews(ticker)
        .then(({ feed }) => {
          const parsed = parseFeeds(feed)
          setDataset((data) => ({ ...data, [ticker]: parsed }))
          return parsed
        })
        .catch(() => [])
    });
    Promise.allSettled(loadPromises)
      .then((recs) => recs.map((rec) => rec.status === 'fulfilled' ? rec.value : null))
      .then((data) => {
        const newsParsed = data.flat()
          .filter(Boolean)
          .sort((a, b) => dayjs((b as News).publishedAt).diff(dayjs((a as News).publishedAt)))
        setNews(newsParsed as News[])
      })
  }

  const handleTagSelected = (key: string) => {
    addTicker(key)
  }

  useEffect(() => {
    load()
  }, [tickers])

  useEffect(() => {
    const func = debounce(() => {
      const availWidth = document.body.getBoundingClientRect().width
      let showTickersCount = 2
      if (availWidth < 350) {
        showTickersCount = 0
      } else if (availWidth < 450) {
        showTickersCount = 1
      }
      setShowTickers(showTickersCount)
    }, 200)
    window.addEventListener('resize', func)
    return () => {
      window.removeEventListener('resize', func)
    }
  }, [])

  return <>
    <Tickers tickers={tickers} handleClose={removeTicker} />
    <Table size="small"
      rowKey="id"
      dataSource={news}
      columns={[
        {
          dataIndex: 'title'
        },
        {
          dataIndex: 'publishedAt',
          className: css.date
        },
        {
          dataIndex: 'tickers',
          render(values: News['tickers']) {
            return <TickersList
              showTickersCount={showTickers}
              // copy object to prevent original object update
              tickers={[...values]}
              onTagSelected={handleTagSelected} />
          }
        }
      ]}
      showHeader={false}
      pagination={{ hideOnSinglePage: true, pageSize: 200 }} />
  </>
}
