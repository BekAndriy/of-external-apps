import { ConfigProvider } from 'antd'
import Routes from './routes'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#0c3a2d',
          borderRadius: 2,
          colorLink: '#0c3a2d'

          // Alias Token
          // colorBgContainer: '#f6ffed',
        }
      }}
    >
      <Routes />
    </ConfigProvider>
  )
}

export default App
