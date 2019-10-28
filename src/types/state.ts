import { Action } from 'redux'

export enum ACTION_TYPE {
	RESET_STORE = 'RESET_STORE'
}

export type StateAction<T = any, M = any> = Action<T> & {
	payload: M
}
