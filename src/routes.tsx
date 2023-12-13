import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import Main from './apps/Recent/Recent'
import Login from './apps/Login/Login'
import NotImplemented from './apps/NotImplemented/NotImplemented'
import { PagesWrapper } from './layouts/PagesWrapper/PagesWrapper'
import { AppsSelector } from './apps/AppsSelector/AppsSelector'
import { NewsApp } from './apps/News/News'
import { ChartApp } from './apps/Chart/Chart'
import { About } from './apps/About/About'

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
        <Route path="/apps/about" index element={<About />} />
      </Route>
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
