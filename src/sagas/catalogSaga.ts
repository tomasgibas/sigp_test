import { takeLatest, select, put } from 'redux-saga/effects'
import { find, filter } from 'lodash'

import { selectFavorites } from '../reducers/catalogReducer'
import { MovieListItem } from '../types/data'
import { ToggleFavoriteCatalogAction } from '../types/reducers'

export enum CATALOG_ACTION {
	FAVORITES_SET = 'CATALOG/FAVORITES_SET',
	FAVORITE_TOGGLE = 'CATALOG/FAVORITE_TOGGLE'
}

function* toggleFavorite(action: ToggleFavoriteCatalogAction) {
	const favorites = yield select(selectFavorites)

	const favorite = find(favorites, (item: MovieListItem) => item.imdbID === action.payload.imdbID)

	if (favorite) {
		const newFavorites = filter(favorites, (item: MovieListItem) => item.imdbID !== action.payload.imdbID)
		yield put({ type: CATALOG_ACTION.FAVORITES_SET, payload: newFavorites })
	} else {
		yield put({ type: CATALOG_ACTION.FAVORITES_SET, payload: [...favorites, action.payload] })
	}
}

function* catalogSaga() {
	yield takeLatest(CATALOG_ACTION.FAVORITE_TOGGLE, toggleFavorite)
}

export default catalogSaga
