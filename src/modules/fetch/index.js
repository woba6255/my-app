import { config } from "../../config"


export default {
	async GET(path, json = true, url = config.url) {
		try {
			const response = await fetch(url + path, {
				method: 'GET',
			});

			return json === true
				? await response.json()
				: response
		} catch (error) {
			throw new Error(error)
		}
	},
	async DELETE(path, json = true, url = config.url) {
		try {
			const response = await fetch(url + path, {
				method: 'DELETE',
			});

			return json === true
				? await response.json()
				: response
		} catch (error) {
			throw new Error(error)
		}
	},
	async POST(path, data, json = true, url = config.url) {
		try {
			const response = await fetch(url + path, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});

			return json === true
				? await response.json()
				: response
		} catch (error) {
			throw new Error(error)
		}
	},
	async PUT(path, data, json = true, url = config.url) {
		try {
			const response = await fetch(url + path, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});

			return json === true
				? await response.json()
				: response
		} catch (error) {
			throw new Error(error)
		}
	}
}
