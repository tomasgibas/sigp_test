import axios from 'axios'

type Headers = { [name: string]: string | boolean }
type Config = {
	headers: Headers,
	params?: object
	baseURL?: string
}
type DownloadConfig = Config & {
	responseType: string
}

function buildHeaders(items?: Headers): Headers {
	const headers = {
		Accept: 'application/json',
		'Access-Control-Allow-Credentials': true,
		'Cache-Control': 'no-cache, no-store',
		'Pragma': 'no-cache',
		'Accept-Language': 'en'
	}

	return {
		...headers,
		...items || {}
	}
}

function buildConfig(params?: object, accept?: string | null, headers?: Headers): Config {
	const config: Config = {
		headers: buildHeaders(headers),
	}

	if (accept) {
		config.headers.Accept = accept
	}

	if (params) {
		config.params = params
	}

	return config
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { string } accept header
 * @param { Object } headers
 * @return Promise response
 * Performs get request to url and returns callback with result
 */
export function getReq(path: string, params?: object, accept?: string, headers?: Headers) {
	return axios.get(path, buildConfig(params, accept, headers))
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { Object } data
 * @param { Object } headers
 * @return Promise response
 * Performs post request to url and returns callback with result
 */
export function postReq(path: string, data?: object, params?: object, headers?: Headers) {
	return axios.post(path, data || {}, buildConfig(params, null, headers))
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { Object } data body
 * @param { Object } headers
 * @return Promise response
 * Performs put request to url and returns callback with result
 */
export function putReq(path: string, data?: object, params?: object, headers?: Headers) {
	return axios.put(path, data || {}, buildConfig(params, null, headers))
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { Object } data body
 * @param { Object } headers
 * @return Promise response
 * Performs put request to url and returns callback with result
 */
export function patchReq(path: string, data?: object, params?: object, headers?: Headers) {
	return axios.patch(path, data || {}, buildConfig(params, null, headers))
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { Object } headers
 * @return Promise response
 * Performs delete request to url and returns callback with result
 */
export function deleteReq(path: string, params: object = {}, headers?: Headers) {
	return axios.delete(path, buildConfig(params, null, headers))
}

/**
 * @param { string } path endpoint
 * @param { Object } params object
 * @param { Object } headers
 * @return Promise response
 * Performs delete request to url and returns callback with result
 */
export function downloadReq(path: string, params: object = {}, headers?: Headers) {
	const config: DownloadConfig = {
		headers: buildHeaders(headers),
		responseType: 'blob'
	}

	if (params) {
		config.params = params
	}

	return axios.get(path, config)
}
