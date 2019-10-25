import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withTranslation, WithTranslation } from 'react-i18next'

class NotFoundPage extends Component<WithTranslation> {

	render(): React.ReactNode {
		return <Redirect to={this.props.t('paths:Search')}/>
	}
}

export default withTranslation()(NotFoundPage)
