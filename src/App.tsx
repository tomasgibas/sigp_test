import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import Routes from './pages/Routes'
import i18n from './utils/localization/i18n'
import configureStore, { sagaMiddleware } from './store'
import rootSaga from './sagas'
import { history } from './utils/history'

const { store, persistor } = configureStore()
sagaMiddleware.run(rootSaga)

import 'antd/dist/antd.css'
import './styles/global.sass'

function App() {
	return (
		<Suspense fallback={<div>Loading</div>}>
			<I18nextProvider i18n={i18n}>
				<PersistGate loading='Loading' persistor={persistor}>
					<Provider store={store}>
						<Router history={history}>
							<Routes/>
						</Router>
					</Provider>
				</PersistGate>
			</I18nextProvider>
		</Suspense>
	)
}

export default App
