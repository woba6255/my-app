import React, { useState } from "react"
import PropTypes from "prop-types";
import { postsType } from "../modules/fetch/api"
import { TableCreator } from "./table-editor/TableComponent"

PostEditorTable.propTypes = {
	posts: postsType,
	editPost: PropTypes.func,
}

const idWidth = { maxWidth: '5rem' }

export function PostEditorTable(props) {
	const [posts, setPosts] = useState(props.posts)

	return (
		<TableCreator
			data={posts}
			schema={{
				body: [
					{ header: '#', styles: idWidth, key: 'id', role: 'id', formater: (id) => idFormater(id) },
					{ header: 'Date', key: 'date', role: 'date', formater: (date) => dateFormater(date) },
					{ header: 'Author', key: 'author', role: 'input' },
					{ header: 'Title', key: 'title', role: 'input' },
				],
			}}/>
	)
}

function dateFormater(date) {
	if (date) {
		return new Intl.DateTimeFormat('ru', {
			year: 'numeric', month: 'numeric', day: 'numeric',
			hour: 'numeric', minute: 'numeric',
			hour12: false
		})
			.format(Date.parse(date))
	} else {
		return 'No Date detected'
	}

}

function idFormater(id) {
	return '...' + id.slice(id.length - 6)
}
