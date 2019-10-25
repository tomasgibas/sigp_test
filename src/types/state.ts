import { Action } from 'redux'

export const ACTION_TYPE = {
	RESET_STORE: 'RESET_STORE'
}

export type StateAction = Action & {
	type: string,
	payload?: any,
	meta?: object
}
