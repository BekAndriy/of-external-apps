import { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import { type StoreFolderType, File } from '~api/store'
import css from './ContentSection.module.scss'
import dayjs from 'dayjs'

interface ContentSectionProps {
  api: StoreFolderType
  title: string
  onOpen(entityPath: string): unknown
}

export const ContentSection = (props: ContentSectionProps) => {
  const { api, title, onOpen } = props
  const [records, setRecords] = useState<File[]>([])

  const loadData = () => {
    api.get()
      .then((files) => {
        const sordedFiles = (files || []).sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
        setRecords(sordedFiles);
      })
  }
  const handleOpen = (fileName: string) => {
    onOpen(`${api.folderPath}/${encodeURIComponent(fileName)}.json`);
  }

  useEffect(() => {
    loadData()
  }, [])

  return <>
    <h2 className={css.title}>{title}</h2>
    <Table
      rootClassName={css.table}
      rowKey="name"
      size="small"
      dataSource={records}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          render(value) {
            return dayjs(value).format('HH:mm DD/MM/YYYY')
          }
        },
        {
          width: 50,
          render(record) {
            return <Space>
              <Button type="text" size="small" onClick={() => handleOpen(record.name)}>
                <FullscreenOutlined />
              </Button>
            </Space>
          },
        }
      ]}
      pagination={{ hideOnSinglePage: true }}
    /></>
}
