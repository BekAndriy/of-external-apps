import { Dropdown, MenuProps, Space, Table, Tag } from 'antd'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

import * as api from '~api'
import { News } from '~api/apps'
import { Tickers, useTickers } from '~components/Tickers/Tickers'
import { debounce } from '~services/data'

import css from './News.module.scss'

interface TickersProps {
  tickers: News['tickers']
  showTickersCount: number
  onTagSelected(key: string): unknown
}

type NewsByTicker = Record<string, News[]>

const TickersList = (props: TickersProps) => {
  const { onTagSelected, tickers, showTickersCount } = props;
  const showTickers = tickers.splice(0, showTickersCount);
  const items: MenuProps['items'] = tickers.map((ticker) => ({
    key: ticker,
    label: ticker,
  }));

  return <Space size="small">
    {
      showTickers.map((ticker) => <Tag className={css.tag}
        key={ticker}
        onClick={(e) => {
          e.stopPropagation();
          onTagSelected(ticker)
        }}>{ticker}</Tag>)
    }
    {
      tickers.length ? <Dropdown menu={{
        items,
        onClick: ({ key }) => onTagSelected(key)
      }}
        trigger={['click']}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}>
        <Tag className={css.tag}>...</Tag>
      </Dropdown> : null
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
        .then((res) => {
          setDataset((newsData) => ({
            ...newsData,
            [ticker]: res.results
          }))
          return res.results
        })
        .catch(() => [])
    });
    Promise.allSettled(loadPromises)
      .then((recs) => recs.map((rec) => rec.status === 'fulfilled' ? rec.value : null))
      .then((data) => {
        const newsParsed = data.flat()
          .filter(Boolean)
          .sort((a, b) => dayjs((b as News).published_utc).diff(dayjs((a as News).published_utc)))
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
      let showTickersCount = 2;
      if (availWidth < 350) {
        showTickersCount = 0
      } else if (availWidth < 450) {
        showTickersCount = 1
      }
      setShowTickers(showTickersCount);
    }, 200);
    window.addEventListener('resize', func);
    return () => {
      window.removeEventListener('resize', func);
    }
  }, [])

  return <>
    <Helmet>
      <title>News / {tickers.toString()}</title>
    </Helmet>
    <Tickers tickers={tickers} handleClose={removeTicker} />
    <Table size="small"
      rowKey="id"
      dataSource={news}
      columns={[
        {
          dataIndex: 'title'
        },
        {
          dataIndex: 'published_utc',
          className: css.date,
          render(value) {
            return dayjs(value).format('MMM D, YYYY')
          },
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
