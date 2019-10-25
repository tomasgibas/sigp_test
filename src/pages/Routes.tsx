import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, Switch } from 'react-router-dom'

import { MENU_ITEMS } from '../constants/menu'

// Layouts
import MainLayout from '../components/layout/MainLayout'

// Route types
import DefaultRoute from '../components/routes/DefaultRoute'

// Pages
import NotFoundPage from './notFound/NotFoundPage'
import SearchPage from './search/SearchPage'
import MovieDetailPage from './detail/MovieDetailPage'
import FavoritesPage from './favorites/FavoritesPage'

class Routes extends Component<RouteComponentProps & WithTranslation> {
	render() {
		const { t } = this.props

		return (
			<Switch>
				<DefaultRoute
					exact
					path={t('paths:Search')}
					component={SearchPage}
					layout={MainLayout}
					menuItem={MENU_ITEMS.SEARCH}
				/>

				<DefaultRoute
					exact
					path={t('paths:Favorites')}
					component={FavoritesPage}
					layout={MainLayout}
					menuItem={MENU_ITEMS.FAVORITES}
				/>

				<DefaultRoute
					exact
					path={t('paths:Detail', { movieID: ':movieID' })}
					component={MovieDetailPage}
					layout={MainLayout}
				/>

				<DefaultRoute
					path={'/'}
					component={NotFoundPage}
					layout={MainLayout}
				/>
			</Switch>
		)
	}
}

export default withRouter(withTranslation()(Routes))
