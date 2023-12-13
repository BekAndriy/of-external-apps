import { Button, Layout, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import css from './NotImplemented.module.scss'
import { closeWindow } from '~services/openFin'

const { Title } = Typography

const NotImplemented = () => {
  const navigate = useNavigate()
  return <Layout className={css.container}>
    <Button type="text"
      className={css.closeBtn}
      onClick={() => { closeWindow() }}>
      <CloseOutlined />
    </Button>
    <Title level={3}>Not Implemented</Title>
    <Button type="primary"
      size="large"
      onClick={() => { navigate(-1) }}>Go Back</Button>
  </Layout>
}

export default NotImplemented
