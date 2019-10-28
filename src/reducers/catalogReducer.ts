import { ACTION_TYPE } from '../types/state'
import { CATALOG_ACTION } from '../sagas/catalogSaga'
import { State } from './index'
import { CatalogAction, CatalogState } from '../types/reducers'

const initState: CatalogState = {
	favorites: []
}

export const selectFavorites = (state: State) => [...state.catalog.favorites]

export default (state: CatalogState = initState, action: CatalogAction): CatalogState => {
	switch (action.type) {
		case CATALOG_ACTION.FAVORITES_SET:
			return {
				...state,
				favorites: action.payload
			}
		case ACTION_TYPE.RESET_STORE:
			return {
				...initState
			}
		default:
			return state
	}
}
