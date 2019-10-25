import { startsWith } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'

import { persistStore } from 'redux-persist'
import { StateAction } from '../types/state'

export const sagaMiddleware = createSagaMiddleware()

function loggerFilter(state: object, action: StateAction) {
	if (startsWith(action.type, 'persist')) {
		return false
	}
	if (action.type === '@@redux-form/REGISTER_FIELD') {
		return false
	}
	return action.type !== '@@redux-form/UNREGISTER_FIELD'
}

function configureStoreProd(initialState: any = {}) {
	const middlewares = [
		sagaMiddleware
	]

	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(...middlewares)
	))
	const persistor = persistStore(store)

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../reducers', () => {
				store.replaceReducer(rootReducer)
			})
		}
	}

	return { store, persistor }
}

function configureStoreDev(initialState: any = {}) {
	const logger = createLogger({
		collapsed: true,
		duration: true,
		predicate: loggerFilter
	})

	const middleware = [
		reduxImmutableStateInvariant(),
		logger,
		sagaMiddleware
	]

	// @ts-ignore
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middleware)
	))
	const persistor = persistStore(store)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default // eslint-disable-line global-require
			store.replaceReducer(nextReducer)
		})
	}

	return { store, persistor }
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
