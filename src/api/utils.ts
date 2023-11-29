import qs from 'query-string'

export const stringifyQuery = (q = {}) =>
  (Object.keys(q).length > 0)
    ? `?${qs.stringify(q, { skipEmptyString: true, skipNull: true })}`
    : ''

export const withMock = <D, T extends (...rest: any[]) => Promise<D>>(requestCallback: T, mockData: D) => {
  return (...rest: Parameters<T>) => requestCallback.call(requestCallback, rest)

  // return (...rest: Parameters<T>) => process.env.NODE_ENV === 'production'
  //   ? requestCallback.call(requestCallback, rest)
  //   : Promise.resolve(mockData)
}
