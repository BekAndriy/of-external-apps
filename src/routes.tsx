import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import Main from './pages/Main/Main'
import Login from './pages/Login/Login'
import NotImplemented from './pages/NotImplemented/NotImplemented'
import { PagesWrapper } from './layouts/PagesWrapper/PagesWrapper'
import { AppsSelector } from './pages/AppsSelector/AppsSelector'
import { NewsApp } from './pages/apps/News/News'
import { ChartApp } from './pages/apps/Chart/Chart'

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path="/" element={<PagesWrapper />}>
        <Route path="/" index element={<Main />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/forgot" index element={<NotImplemented />} />
        <Route path="/apps" index element={<AppsSelector />} />
        <Route path="/apps/news" index element={<NewsApp />} />
        <Route path="/apps/chart" index element={<ChartApp />} />
      </Route>
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
