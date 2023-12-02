import { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd'
import { FullscreenOutlined, DeleteOutlined } from '@ant-design/icons'
import { type StoreFolderType, File } from '~api/store'
import css from './ContentSection.module.scss'
import dayjs from 'dayjs'

interface ContentSectionProps {
  data: File[]
  title: string
  onOpen(entityPath: string): unknown
  onDelete(entityPath: string): unknown
}

export const ContentSection = (props: ContentSectionProps) => {
  const { data, title, onOpen, onDelete } = props
  return <>
    <h2 className={css.title}>{title}</h2>
    <Table
      rootClassName={css.table}
      rowKey="name"
      size="small"
      dataSource={data}
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
              <Button type="text" size="small" onClick={() => onDelete(record.name)}>
                <DeleteOutlined />
              </Button>
              <Button type="text" size="small" onClick={() => onOpen(record.name)}>
                <FullscreenOutlined />
              </Button>
            </Space>
          },
        }
      ]}
      pagination={{ hideOnSinglePage: true }}
    /></>
}
