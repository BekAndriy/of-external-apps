import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { isOpenFin } from '~services/openFin'

const getVersion = async (): Promise<string> => {
  if (isOpenFin) {
    return fin.System.getVersion()
  }
  return 'Invalid Platform'
}

const isAppCertified = async (): Promise<boolean> => isOpenFin && fin.System.getVersion()
  .then(() => true)
  .catch(() => false)

const getDataSource = async () => {
  return [
    {
      name: 'Version',
      value: await getVersion()
    },
    {
      name: 'Certified',
      value: await isAppCertified().then((isCertified) => String(isCertified).toUpperCase())
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
  return <Table
    dataSource={data}
    columns={[
      {
        dataIndex: 'name'
      },
      {
        dataIndex: 'value'
      }
    ]}
    pagination={{ hideOnSinglePage: true }} />
}
