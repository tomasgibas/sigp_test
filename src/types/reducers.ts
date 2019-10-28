import { MovieItem } from './data'
import { CATALOG_ACTION } from '../sagas/catalogSaga'
import { ACTION_TYPE, StateAction } from './state'

// Catalog reducer

export type CatalogState = {
	favorites: MovieItem[]
}

export interface SetFavoritesCatalogAction {
	type: typeof CATALOG_ACTION.FAVORITES_SET
	payload: MovieItem[]
}

export interface ToggleFavoriteCatalogAction {
	type: typeof CATALOG_ACTION.FAVORITE_TOGGLE
	payload: MovieItem
}

export type CatalogAction = SetFavoritesCatalogAction | ToggleFavoriteCatalogAction | StateAction<ACTION_TYPE>
