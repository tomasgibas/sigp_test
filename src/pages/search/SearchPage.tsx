import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { debounce } from 'lodash'

import { API_KEY } from '../../constants/api'

import { Input } from 'antd'
import { getReq } from '../../utils/request'

import MoviesList from '../../components/moviesList/MoviesList'
import { MovieListItem } from '../../types/data'

import { history } from '../../utils/history'

type Props = WithTranslation

type State = {
	search: string | null
	page: number
	movies: {
		data: MovieListItem[] | null
		isLoading: boolean
		isFailure: boolean
	},
	context: {
		currentPage: number
		totalItems: number
	}
}

type Query = {
	page: number
	s: string | null
}

class SearchPage extends Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
			search: null,
			page: 1,
			movies: {
				data: null,
				isLoading: false,
				isFailure: false
			},
			context: {
				currentPage: 1,
				totalItems: 0
			}
		}
	}

	searchMovies = debounce((search: string) => {
		this.setState({ search, page: 1 })
		this.loadMovies({ s: search, page: 1 })
	}, 300)

	changeMoviesPage = (page: number) => {
		const { search } = this.state
		this.setState({ page })

		this.loadMovies({ s: search, page })
	}

	showMovieDetail = (item: MovieListItem) => {
		const { t } = this.props
		history.push(t('paths:Detail', { movieID: item.imdbID }))
	}

	loadMovies = async (query: Query) => {
		try {
			this.setState({
				movies: {
					data: null,
					isLoading: true,
					isFailure: false
				}
			})

			const queryParams = { ...query, apikey: API_KEY }
			const response: any = await getReq('/api', queryParams)

			const { Search, totalResults } = response.data

			this.setState({
				movies: {
					data: Search,
					isLoading: false,
					isFailure: false
				},
				context: {
					currentPage: query.page,
					totalItems: totalResults
				}
			})
		} catch (error) {
			this.setState({
				movies: {
					data: null,
					isLoading: false,
					isFailure: true
				},
				context: {
					currentPage: 1,
					totalItems: 0
				}
			})
		}
	}

	render(): React.ReactNode {
		const { t } = this.props
		const { movies, context } = this.state

		return (
			<div>
				<Input.Search
					onChange={(e) => this.searchMovies(e.target.value)}
					placeholder={t('pages:Search.searchPlaceholder')}
				/>
				<MoviesList
					movies={movies}
					context={context}
					onPage={this.changeMoviesPage}
					onDetail={this.showMovieDetail}
				/>
			</div>
		)
	}
}

export default withTranslation()(SearchPage)
