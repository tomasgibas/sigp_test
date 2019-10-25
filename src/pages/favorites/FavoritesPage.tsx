import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import MoviesList from '../../components/moviesList/MoviesList'
import { MovieListItem } from '../../types/data'

import { history } from '../../utils/history'
import { selectFavorites } from '../../reducers/catalogReducer'
import { State } from '../../reducers'
import { connect } from 'react-redux'

type Props = WithTranslation & {
	favorites: MovieListItem[]
}

type ComponentState = {
	page: number
}

class FavoritesPage extends Component<Props, ComponentState> {

	constructor(props: Props) {
		super(props)

		this.state = {
			page: 1
		}
	}

	changeMoviesPage = (page: number) => {
		this.setState({ page })
	}

	showMovieDetail = (item: MovieListItem) => {
		const { t } = this.props
		history.push(t('paths:Detail', { movieID: item.imdbID }))
	}

	render(): React.ReactNode {
		const { favorites } = this.props
		const { page } = this.state

		return (
			<div>
				<MoviesList
					movies={{
						data: favorites,
						isLoading: false,
						isFailure: false
					}}
					context={{
						currentPage: page,
						totalItems: favorites.length
					}}
					onPage={this.changeMoviesPage}
					onDetail={this.showMovieDetail}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state: State) => ({
	favorites: selectFavorites(state)
})

export default withTranslation()(connect(mapStateToProps)(FavoritesPage))
