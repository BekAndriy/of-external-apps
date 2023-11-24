import { Button, Checkbox, Col, Form, Input, Layout, Row, Space, Typography, message } from 'antd'
import { LockOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { closeWindow } from '~services/openFin'
import { useIAB } from '~services/useIAB'
import * as api from '~api'
import css from './Login.module.scss'

interface Values {
  email: string
  password: string
  remember: boolean
}

const { Title } = Typography

const Login = () => {
  const IAM = useIAB('apps/auth', 'login')
  const handleSubmit = (values: Values) => {
    const { email, password, remember } = values
    api.user.login({ email, password })
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .then(({ access_token }) => IAM.send('login', {
        token: access_token,
        rememberMeChecked: remember
      }))
      .catch(() => message.error('Unauthorized'))
  }

  return <Layout className={css.container}>
    <Button type="text" className={css.closeBtn} onClick={() => { closeWindow() }}>
      <CloseOutlined />
    </Button>
    <Row className={css.row} gutter={[0, 20]}>
      <Col span={24}>
        <Title level={3} className={css.title}>Sign In</Title>
      </Col>
      <Col span={24}>
        <Form
          rootClassName={css.form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className={css.forgot} to="/forgot">
              Forgot password
            </Link>
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button className={css.cancelBtn} type="text" size="large" onClick={() => { closeWindow() }}>Cancel</Button>
              <Button className={css.submitBtn}
                size="large"
                type="primary"
                htmlType="submit">
                Log in
              </Button>
            </Space>
          </Row>
        </Form>
      </Col>
    </Row>
  </Layout>
}

export default Login
