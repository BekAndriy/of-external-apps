import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import Main from './pages/Main/Main'
import Login from './pages/Login/Login'
import NotImplemented from './pages/NotImplemented/NotImplemented'
import { PagesWrapper } from './layouts/PagesWrapper/PagesWrapper'

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path="/" element={<PagesWrapper />}>
        <Route path="/" index element={<Main />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/forgot" index element={<NotImplemented />} />
      </Route>
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
