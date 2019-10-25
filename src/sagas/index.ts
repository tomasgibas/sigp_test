import { all } from 'redux-saga/effects'

import catalogSaga from './catalogSaga'

export default function* rootSaga() {
	yield all([
		catalogSaga()
	])
}
