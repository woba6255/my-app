import ftch from "~/modules/fetch"
import { API_URL_ROUTE_METRICS } from "~/modules/fetch/ApiRouts"


export class MetricsManager {
	static async getAll() {
		// TODO validate
		return await ftch.GET(API_URL_ROUTE_METRICS)
	}

	static async createOne(data) {
		// TODO validate
		return await ftch.POST(API_URL_ROUTE_METRICS, data)
	}

	static async deleteOneByID(ID) {
		// TODO validate
		return await ftch.DELETE(API_URL_ROUTE_METRICS + '/' + ID)
	}

	static async editOne(newValue, ID = newValue.id) {
		// TODO validate
		return await ftch.PUT(API_URL_ROUTE_METRICS + '/' + ID, newValue)
	}
}
