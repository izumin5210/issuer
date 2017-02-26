/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import reducer from 'reducers'

export default function configureStore (initialState: any) {
  const sagaMiddleware = createSagaMiddleware()

  let storeEnhancer

  if (process.env.NODE_ENV === 'production') {
    storeEnhancer = applyMiddleware(sagaMiddleware)
  } else {
    const createLogger = require('redux-logger') // eslint-disable-line
    const DevTools = require('../containers/DevTools').default // eslint-disable-line
    storeEnhancer = compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger(),
      ),
      DevTools.instrument(),
    )
  }

  const store = createStore(
    reducer,
    initialState,
    storeEnhancer,
  )

  // $FlowFixMe
  store.runSaga = sagaMiddleware.run
  // $FlowFixMe
  store.close = () => store.dispatch(END)

  return store
}
