import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Layout } from 'antd'
import { ContentSection } from './components/ContentSection/ContentSection'
import * as api from '~api'
import css from './Main.module.scss'
import { Title } from './components/Title/Title'
import { useIAB } from '~services/useIAB'
import { type File } from '~api/store'
import { isOpenFin } from '~services/openFin'

const APIs = {
  workspaces: api.store.workspaces,
  pages: api.store.pages
}

const { Content } = Layout

const COMMUNICATION_CHANNEL = 'apps/recent'
const RECENT_TOPIC = 'response'

const sections = [
  {
    title: 'Workspaces',
    apiKey: 'workspaces'
  },
  {
    title: 'Pages',
    apiKey: 'pages'
  }
]

const MainLayout = () => {
  const [records, setRecords] = useState<Record<string, File[]>>({})
  const IAM = useIAB(COMMUNICATION_CHANNEL, RECENT_TOPIC)

  const handleCreateNewPage = () => {
    IAM.send(RECENT_TOPIC, { action: 'create-page' })
  }
  const handleOpen = (fileName: string, folder: string) => {
    IAM.send(RECENT_TOPIC, {
      action: 'open',
      filePath: `${folder}/${encodeURIComponent(fileName)}.json`
    })
  }

  const setSortedFiles = (apiKey: string, files: File[]) => {
    const sortedFiles: File[] = (files || []).sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
    setRecords((oldRecs) => ({
      ...oldRecs,
      [APIs[apiKey].folderPath]: sortedFiles
    }))
  }

  const loadSectionData = async (apiKey: string) => {
    if (APIs[apiKey]) {
      return APIs[apiKey].get()
        .then((files) => {
          setSortedFiles(apiKey, files)
          return files
        })
        .catch(() => [])
    }
  }

  const toggleWindowVisibility = (force: boolean) => {
    if (!isOpenFin) return
    force ? fin.me.show() : handleCreateNewPage()
  }

  const loadSectionsData = async () => {
    const promises = sections.map(({ apiKey }) => loadSectionData(apiKey))
    const results = await Promise.all(promises).catch(() => [])
    const hasRecords = !!results.flat().filter(Boolean).length
    toggleWindowVisibility(hasRecords)
  }

  const handleDelete = (fileName: string, apiKey: string) => {
    APIs[apiKey]?.delete(fileName).then(() => { loadSectionData(apiKey) })
  }

  useEffect(() => {
    loadSectionsData()
  }, [])

  return (
    <Layout className="layout" rootClassName={css.root}>
      <Helmet>
        <title>Recent Used</title>
      </Helmet>
      <Content>
        <div className={css.header}>
          <Title>Recent Used</Title>
          <Button type="primary" size="large" className={css.btn} onClick={handleCreateNewPage}>Create New Page</Button>
        </div>
        {
          sections.map(({ apiKey, title }) => <ContentSection
            key={apiKey}
            data={records[apiKey] ?? []}
            title={title}
            onOpen={(fileName) => { handleOpen(fileName, apiKey) }}
            onDelete={(fileName) => { handleDelete(fileName, apiKey) }} />)
        }
      </Content>
    </Layout>
  )
}

export default MainLayout
