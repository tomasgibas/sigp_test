import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import storageLocal from 'redux-persist/lib/storage'

import catalogReducer, { CatalogState } from './catalogReducer'

export type State = {
	catalog: CatalogState
}

export const REDUCER_KEYS = {
	CATALOG: 'catalog'
}

const rootReducer = combineReducers({
	catalog: persistReducer({
		key: REDUCER_KEYS.CATALOG,
		storage: storageLocal
	}, catalogReducer)
})

export default rootReducer
