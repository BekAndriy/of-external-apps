import { useMemo, useState, useEffect } from 'react'

type Subscriber<T> = (payload: T) => unknown

export const useIAB = <T = unknown>(channelName: string, topic: string) => {
  const [subscriber, setSubscriber] = useState<Subscriber<T> | null>(null)

  // If the channel has been created this request will be sent to the provider.  If not, the
  // promise will not be resolved or rejected until the channel has been created.
  const clientBusPromise = useMemo(async () => await fin.InterApplicationBus.Channel.connect(channelName, { wait: true }), [])

  useEffect(() => {
    console.log('useEffect')
    clientBusPromise.then((clientBus) => {
      console.log('Connected')
      clientBus.onDisconnection(channelInfo => {
        console.log('Disconnected')
        // handle the channel lifecycle here - we can connect again which will return a promise
        // that will resolve if/when the channel is re-created.
        // implement reconnection in case any Internet issues occur
      })
      clientBus.onError((action, error, identity) => {
        console.log('uncaught Exception in action:', action)
        console.error(error)
      })
      clientBus.register(topic, (payload, identity) => {
        // register a callback for a topic to which the channel provider can dispatch an action
        console.log('Action dispatched by provider: ', JSON.stringify(identity))
        console.log('Payload sent in dispatch: ', JSON.stringify(payload))

        subscriber?.(payload as T)
      })
    }).catch(console.error)

    return () => {
      clientBusPromise.then(async (clientBus) => {
        console.log('Disconnect')
        await clientBus.disconnect()
      }).catch(console.error)
    }
  }, [clientBusPromise])

  const handleSend = async (action: string, payload?: unknown) => {
    return await clientBusPromise
      .then(async (clientBus) => {
        console.log('Dispatch')
        return await clientBus.dispatch(action, payload)
      })
      .catch(console.error)
  }

  return {
    subscribe: (callback) => { setSubscriber(callback) },
    unsubscribe: () => { setSubscriber(null) },
    send: handleSend
  }
}
