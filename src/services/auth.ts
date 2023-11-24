import { isOpenFin } from './openFin'

export const getToken = () => (isOpenFin ? sessionStorage : localStorage).getItem('access_token')
