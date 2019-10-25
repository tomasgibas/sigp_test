export enum MENU_ITEMS {
	SEARCH = 'SEARCH',
	FAVORITES = 'FAVORITES'
}

export const MENU = [{
	type: MENU_ITEMS.SEARCH,
	title: 'components:menu.Search',
	icon: 'search',
	path: 'paths:Search'
}, {
	type: MENU_ITEMS.FAVORITES,
	title: 'components:menu.Favorites',
	icon: 'star',
	path: 'paths:Favorites'
}]

