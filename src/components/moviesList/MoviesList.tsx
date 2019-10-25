import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { List } from 'antd'

import { MovieListItem } from '../../types/data'

const PAGE_SIZE = 10

type Props = WithTranslation & {
	movies: {
		data: MovieListItem[] | null
		isLoading: boolean
		isFailure: boolean
	},
	context?: {
		currentPage: number
		totalItems: number
	},
	onPage: (page: number) => void
	onDetail: (item: MovieListItem) => void
}

class MoviesList extends Component<Props> {

	renderListItem = (item: MovieListItem) => (
		<List.Item key={item.Title} className={'movie-list-item'} onClick={() => this.props.onDetail(item)}>
			<div className={'movie-poster'} style={{ backgroundImage: `url(${item.Poster})` }}/>
			<div className={'movie-info'}>
				<div className={'title'}>{item.Title}</div>
				<div className={'year'}>{this.props.t('components:MoviesList.year')}: {item.Year}</div>
				<div className={'type'}>{this.props.t('components:MoviesList.type')}: {this.props.t(`movieType.${item.Type}`)}</div>
			</div>
		</List.Item>
	)

	getPaginationConfig = (): object | undefined => {
		const { context, onPage } = this.props

		if (context && context.totalItems && context.totalItems > PAGE_SIZE) {
			return {
				current: context.currentPage,
				total: Math.floor(context.totalItems / PAGE_SIZE),
				pageSize: PAGE_SIZE,
				onChange: onPage
			}
		}
	}

	render(): React.ReactNode {
		const { movies, t } = this.props

		return (
			<List
				itemLayout={'vertical'}
				size={'large'}
				renderItem={this.renderListItem}
				dataSource={movies.data || []}
				loading={movies.isLoading}
				locale={{
					emptyText: t('components:MoviesList.noData')
				}}
				pagination={this.getPaginationConfig()}
			/>
		)
	}
}

export default withTranslation()(MoviesList)
