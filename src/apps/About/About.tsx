import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Table } from 'antd'
import { isOpenFin } from '~services/openFin'

const getVersion = async (): Promise<string> => {
  if (isOpenFin) {
    return fin.System.getVersion()
  }
  return 'Invalid Platform'
}

const getDataSource = async () => {
  return [
    {
      name: 'Version',
      value: await getVersion()
    },
    {
      name: 'Certified',
      value: 'FALSE'
    }
  ]
}

const useData = () => {
  const [data, setData] = useState<Array<Record<string, string | boolean>>>([])
  useEffect(() => {
    getDataSource().then(setData)
  }, [])
  return data
}

export const About = () => {
  const data = useData()
  return <>
    <Helmet>
      <title>About Platform</title>
    </Helmet>
    <Table
      rowKey="name"
      dataSource={data}
      showHeader={false}
      columns={[
        {
          dataIndex: 'name'
        },
        {
          dataIndex: 'value'
        }
      ]}
      pagination={{ hideOnSinglePage: true }} />
  </>
}
