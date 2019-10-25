import { MovieListItem } from '../types/data'
import { CATALOG_ACTION } from '../sagas/catalogSaga'

export const toggleFavoriteMovie = (item: MovieListItem) => ({
	type: CATALOG_ACTION.FAVORITE_TOGGLE,
	payload: item
})
