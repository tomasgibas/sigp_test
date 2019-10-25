import React from 'react'
import { Route, RouteProps } from 'react-router'

import { withTranslation, WithTranslation } from 'react-i18next'

import { MENU_ITEMS } from '../../constants/menu'

import MainLayout from '../layout/MainLayout'

type Props<L = any, S = any, C = any> = RouteProps & WithTranslation & {
	component: any
	layout?: typeof MainLayout
	path: string
	menuItem?: MENU_ITEMS,
	computedMatch?: {
		params: { [key: string]: string }
	}
}

class DefaultRoute extends Route<Props> {

	componentDidUpdate = () => {
		document.title = this.props.t('documentTitle')
	}

	componentDidMount = () => {
		document.title = this.props.t('documentTitle')
	}

	render(): React.ReactNode {
		const { computedMatch, menuItem } = this.props

		if (this.props.layout) {
			return (
				<this.props.layout selectedMenuItem={menuItem}>
					<this.props.component locationParams={computedMatch!.params}/>
				</this.props.layout>
			)
		}
		return <this.props.component locationParams={computedMatch!.params}/>
	}
}

export default withTranslation()(DefaultRoute)
