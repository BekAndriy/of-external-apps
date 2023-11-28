import { Row, Col, Typography, Card } from 'antd'
import css from './AppsSelector.module.scss'

const { Title, Text } = Typography

// Apps can be loaded from any other place
const APPS_LIST = [
  {
    title: 'Chart',
    url: 'http://localhost:3000/apps/chart'
  },
  {
    title: 'News',
    url: 'http://localhost:3000/apps/news'
  }
]

export const AppsSelector = () => {
  return <Row className={css.container} justify="center" align="middle">
    <div className={css.head}>
      <Title level={2}>Select app to open:</Title>
      <Text>This app should include a list of applications or provide an auto-suggest feature.</Text>
    </div>
    <Row gutter={[30, 30]} className={css.cards}>
      {
        APPS_LIST.map(({ title, url }) => (
          <Col xs={24} sm={12} key={title}>
            <Card className={css.card}>
              <Text className={css.cardTitle}>{title}</Text>
            </Card>
          </Col>
        ))
      }
    </Row>
  </Row>
}
