import { PropsWithChildren } from 'react'
import css from './Title.module.scss'

export const Title = (props: PropsWithChildren) => {
  const { children } = props;
  return <h1 className={css.title}>{children}</h1>
}
