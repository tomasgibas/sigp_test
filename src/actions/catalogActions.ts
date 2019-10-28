import { MovieItem } from '../types/data'
import { CATALOG_ACTION } from '../sagas/catalogSaga'
import { CatalogAction } from '../types/reducers'

export const toggleFavoriteMovie = (item: MovieItem): CatalogAction => ({
	type: CATALOG_ACTION.FAVORITE_TOGGLE,
	payload: item
})
