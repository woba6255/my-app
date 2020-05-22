import ftch from '../index'
import PropTypes from "prop-types";
import { config } from '../../../config'


export const postType = PropTypes.shape({
	id: PropTypes.string,
	date: PropTypes.string,
	commentsID: PropTypes.arrayOf(PropTypes.number),
	deleted: PropTypes.bool,
	author: PropTypes.string,
	title: PropTypes.string,
	body: PropTypes.string,
})
export const postsType = PropTypes.arrayOf(postType)

export async function getPosts() {
	// TODO validate
	return await ftch.GET(config.postsUrl)
}

export async function editPost(newValue, ID = newValue.id) {
	// TODO validate
	return await ftch.PUT(config.postsUrl + '/' + ID, newValue)
}
// editPostByID({
// 	date: "2016-01-10T07:24:52 -03:00",
// 	title: "jenwjlrbewl",
// 	author: 'Leo Tolstoy'
// }, '5ec4269bb1394f33dfa8dcc3').then(d => console.log(d))


