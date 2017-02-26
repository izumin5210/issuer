/* @flow */
import { Provider } from 'react-redux'

import type { Element } from 'react'

let DevTools = null
if (process.env.NODE_ENV !== 'production') {
  DevTools = require('./DevTools').default // eslint-disable-line
}

type Props = {
  router: Element<*>,
  store: Object,
}

export default function Root ({ router, store }: Props) {
  return (
    <Provider store={store}>
      <div className='Root'>
        { router }
        { DevTools != null && <DevTools /> }
      </div>
    </Provider>
  )
}
