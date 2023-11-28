import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getApiToken, isOpenFin } from '~services/openFin'

export const PagesWrapper = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    // only for open fin
    if (isOpenFin) {
      getApiToken().then((token: string) => {
        token && sessionStorage.setItem('access_token', token)
        setIsInitialized(true)
      })
    } else {
      setIsInitialized(true)
    }
  }, [])
  return isInitialized ? <Outlet /> : <>Loading...</>
}
