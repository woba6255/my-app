import React, { Fragment, useState } from "react"
import PropTypes from "prop-types";
import { postsType } from "../../modules/fetch/api"
import { TableCreator } from "./TableComponent"

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
					{ header: '#', styles: idWidth, formater: (id) => idFormat(id), key: 'id', role: 'id', onSave: null },
					{ header: 'Author', key: 'author', role: 'input', onSave: null },
					{ header: 'Title', key: 'title', role: 'input', onSave: null },
					{ header: 'Body', key: 'body', role: 'textArea' ,onSave: null },
				],
			}}/>
	)
}


function idFormat(id) {
	return '...' + id.slice(id.length - 6)
}
