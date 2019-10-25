import React from 'react'
import { render } from 'react-dom'

import App from './App'

const appRender = (Component: typeof App) => {
	return render(
		<Component/>,
		document.getElementById('root')
	)
}

appRender(App)

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default
		appRender(NextApp)
	})
}
