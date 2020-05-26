import ftch from '../index'
import PropTypes from "prop-types";
import { config } from '~/config'

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
		return await ftch.GET(config.postsUrl)
	}

	static async createOne(data) {
		// TODO validate
		return await ftch.POST(config.postsUrl, data)
	}

	static async deleteOneByID(ID) {
		// TODO validate
		return await ftch.DELETE(config.postsUrl + '/' + ID)
	}

	static async editOne(newValue, ID = newValue.id) {
		// TODO validate
		return await ftch.PUT(config.postsUrl + '/' + ID, newValue)
	}
}

// editPostByID({
// 	date: "2016-01-10T07:24:52 -03:00",
// 	title: "jenwjlrbewl",
// 	author: 'Leo Tolstoy'
// }, '5ec4269bb1394f33dfa8dcc3').then(d => console.log(d))


