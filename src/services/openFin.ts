import type OpenFin_2 from '@openfin/core'

let finOptions: Promise<OpenFin_2.WindowOptions> | null = null

export const isOpenFin = typeof fin !== 'undefined'

export const closeWindow = () => {
  if (fin.me.isWindow) {
    fin.me.close()
  };
}

export const getWindowOptions = (): Promise<OpenFin_2.WindowOptions> => {
  if (fin.me.isWindow && !finOptions) {
    finOptions = fin.me.getOptions()
  }
  return finOptions as Promise<OpenFin_2.WindowOptions>
}

export const getApiToken = () => getWindowOptions().then(({ customData = {} }) => customData.token)
