import ftch from '../index'
import PropTypes from "prop-types";
import { API_URL_ROUTE_POSTS } from "~/modules/fetch/ApiRouts"

export class PostsManger {
	static postType = PropTypes.shape({
		id: PropTypes.string,
		date: PropTypes.string,
		commentsID: PropTypes.arrayOf(PropTypes.number),
		deleted: PropTypes.bool,
		author: PropTypes.string,
		title: PropTypes.string,
		body: PropTypes.string,
	})
	static postsType = PropTypes.arrayOf(this.postType)


	static async getAll() {
		// TODO validate
		return await ftch.GET(API_URL_ROUTE_POSTS)
	}

	static async createOne(data) {
		// TODO validate
		return await ftch.POST(API_URL_ROUTE_POSTS, data)
	}

	static async deleteOneByID(ID) {
		// TODO validate
		return await ftch.DELETE(API_URL_ROUTE_POSTS + '/' + ID)
	}

	static async editOne(newValue, ID = newValue.id) {
		// TODO validate
		return await ftch.PUT(API_URL_ROUTE_POSTS + '/' + ID, newValue)
	}
}

// editPostByID({
// 	date: "2016-01-10T07:24:52 -03:00",
// 	title: "jenwjlrbewl",
// 	author: 'Leo Tolstoy'
// }, '5ec4269bb1394f33dfa8dcc3').then(d => console.log(d))


