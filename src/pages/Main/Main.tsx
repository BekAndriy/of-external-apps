import { Button, Layout } from 'antd'
import { ContentSection } from './components/ContentSection/ContentSection'
import * as api from '~api'
import css from './Main.module.scss'
import { Title } from './components/Title/Title'
import { useIAB } from '~services/useIAB'

const { Content } = Layout

const COMMUNICATION_CHANNEL = 'apps/recent'
const RECENT_TOPIC = 'response'

const MainLayout = () => {
  const IAM = useIAB(COMMUNICATION_CHANNEL, RECENT_TOPIC)

  const handleCreateNewPage = () => {
    IAM.send(RECENT_TOPIC, { action: 'create-page' })
  }
  const handleOpen = (filePath: string) => {
    IAM.send(RECENT_TOPIC, { action: 'open', filePath })
  }

  return (
    <Layout className="layout" rootClassName={css.root}>
      <Content>
        <div className={css.header}>
          <Title>Recent Used</Title>
          <Button type="primary" size="large" className={css.btn} onClick={handleCreateNewPage}>Create New Page</Button>
        </div>
        <ContentSection api={api.store.workspaces} title="Workspaces" onOpen={handleOpen} />
        <ContentSection api={api.store.pages} title="Pages" onOpen={handleOpen} />
      </Content>
    </Layout>
  )
}

export default MainLayout
