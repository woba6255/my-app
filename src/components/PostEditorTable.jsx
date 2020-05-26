import React, { useState } from "react"
import PropTypes from "prop-types";
import { postsType } from "~/modules/fetch/api"
import { TableEditor } from "~/components/table-editor"
import { CELL_ROLE_DATE, CELL_ROLE_ID, CELL_ROLE_INPUT } from "~/components/table-editor/CellRoles"

PostEditorTable.propTypes = {
	posts: postsType,
	editPost: PropTypes.func,
}

const idWidth = { maxWidth: '5rem' }

export function PostEditorTable(props) {
	const [posts, setPosts] = useState(props.posts)

	return (
		<TableEditor
			data={posts}
			schema={{
				body: [
					{ header: '#', styles: idWidth, key: 'id', role: CELL_ROLE_ID, formater: (id) => idFormater(id) },
					{ header: 'Date', key: 'date', role: CELL_ROLE_DATE, formater: (date) => dateFormater(date) },
					{ header: 'Author', key: 'author', role: CELL_ROLE_INPUT },
					{ header: 'Title', key: 'title', role: CELL_ROLE_INPUT },
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
