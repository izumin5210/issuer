/* @flow */
import 'setup'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import routes from 'routes'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'
import rootSaga from 'sagas'

const initialState = {}
const store = configureStore(initialState)
// $FlowFixMe
store.runSaga(rootSaga)

const rootEl = document.getElementById('container')

const router = (
  <BrowserRouter>
    <div className='Router'>
      { routes }
    </div>
  </BrowserRouter>
)

if (process.env.NODE_ENV === 'production') {
  render(
    <Root
      {...{ router, store }}
    />,
    rootEl,
  )
} else {
  const AppContainer = require('react-hot-loader').AppContainer //eslint-disable-line
  const mount = () => {
    render(
      <AppContainer>
        <Root
          {...{ router, store }}
        />
      </AppContainer>,
      rootEl,
    )
  }

  mount()

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('./containers/Root', mount)
  }
}
