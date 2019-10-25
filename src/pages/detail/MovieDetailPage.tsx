import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { find, get, map } from 'lodash'

import { toggleFavoriteMovie } from '../../actions/catalogActions'
import { MovieItem, MovieListItem } from '../../types/data'
import { Spin, Button } from 'antd'

import { API_KEY } from '../../constants/api'
import { getReq } from '../../utils/request'
import { State } from '../../reducers'

type Props = WithTranslation & {
	actions: {
		toggleFavorite: (item: MovieListItem) => void
	},
	favorites: MovieItem[]
	locationParams: { [key: string]: string }
}

type ComponentState = {
	movie: {
		data: MovieItem | null
		isLoading: boolean
		isFailure: boolean
	}
}

class MovieDetailPage extends Component<Props, ComponentState> {

	_mounted: boolean = false

	constructor(props: Props) {
		super(props)

		this.state = {
			movie: {
				data: null,
				isLoading: false,
				isFailure: false
			}
		}
	}

	componentDidMount(): void {
		this._mounted = true

		const favorite = this.findFavorite()
		if (favorite) {
			this.setState({
				movie: {
					data: favorite,
					isLoading: false,
					isFailure: false
				}
			})
		} else {
			this.loadMovieDetail()
		}
	}

	componentWillUnmount(): void {
		this._mounted = false
	}

	loadMovieDetail = async () => {
		const { locationParams } = this.props

		if (this._mounted) {
			try {
				this.setState({
					movie: {
						data: null,
						isLoading: true,
						isFailure: false
					}
				})

				const queryParams = { i: locationParams.movieID, apikey: API_KEY }
				const response: any = await getReq('/api', queryParams)

				if (this._mounted) {
					this.setState({
						movie: {
							data: response.data,
							isLoading: false,
							isFailure: false
						}
					})
				}
			} catch (error) {
				if (this._mounted) {
					this.setState({
						movie: {
							data: null,
							isLoading: false,
							isFailure: true
						}
					})
				}
			}
		}
	}

	findFavorite = (): MovieItem | undefined => {
		const { favorites } = this.props
		const { movie } = this.state

		return find(favorites, (item: MovieListItem) => item.imdbID === get(movie, 'data.imdbID'))
	}

	render(): React.ReactNode {
		const { t, actions } = this.props
		const { movie } = this.state

		if (movie.isLoading || !movie.data) {
			return <div className={'movie-detail'}><Spin/></div>
		}

		if (movie.isFailure) {
			return (
				<div className={'movie-detail'}>
					<div className={'movie-error-state'}>{t('pages:MovieDetail.error')}</div>
				</div>
			)
		}

		const isFavorite = !!this.findFavorite()

		return (
			<>
				<div className={'movie-detail'}>
					<div className={'movie-poster'} style={{ backgroundImage: `url(${get(movie, 'data.Poster')})` }}/>
					<div className={'movie-meta'}>
						<div className={'title'}>{get(movie, 'data.Title')}</div>
						<div className={'meta-item'}>{get(movie, 'data.Released')}</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Runtime')}</span>: {get(movie, 'data.Runtime')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Genre')}</span>: {get(movie, 'data.Genre')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Director')}</span>: {get(movie, 'data.Director')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Writer')}</span>: {get(movie, 'data.Writer')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Actors')}</span>: {get(movie, 'data.Actors')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Plot')}</span>: {get(movie, 'data.Plot')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Country')}</span>: {get(movie, 'data.Country')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Awards')}</span>: {get(movie, 'movie.data.Awards')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:BoxOffice')}</span>: {get(movie, 'data.BoxOffice')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Production')}</span>: {get(movie, 'data.Production')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Production')}</span>: {get(movie, 'data.Production')}
						</div>
						<div className={'meta-item'}>
							<span className={'item-type'}>{t('pages:Ratings')}</span>: {get(movie, 'Ratings.length') ? map(movie.data.Ratings, (item) => (<><span key={item.Source}>{item.Source}: {item.Value}</span> &nbsp;</>)) : 'N/A'}
						</div>
					</div>
				</div>
				<div>
					<Button type={isFavorite ? 'danger' : 'primary'} onClick={() => actions.toggleFavorite(movie.data!)}>
						{isFavorite ? t('pages:MovieDetail.removeFavorite') : t('pages:MovieDetail.addFavorite')}
					</Button>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state: State) => ({
	favorites: state.catalog.favorites
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: {
		toggleFavorite: bindActionCreators(toggleFavoriteMovie, dispatch)
	}
})

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(MovieDetailPage))
