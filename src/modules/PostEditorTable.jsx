import React, { useEffect, useState } from "react"
import PropTypes from "prop-types";
import { createPost, deletePostByID, editPost, postsType } from "~/modules/fetch/api"
import { TableEditor } from "~/components/table-editor"
import {
	CELL_ROLE_DATE,
	CELL_ROLE_ID,
	CELL_ROLE_INPUT,
	ROW_STATUS_EDIT,
	ROW_STATUS_STATIC
} from "~/components/table-editor/TableAliases"

PostEditorTable.propTypes = {
	posts: postsType,
	editPost: PropTypes.func,
}

const idWidth = { maxWidth: '5rem' }

export function PostEditorTable({posts}) {
	// const [posts, setPosts] = useState(props.posts)

	// TODO REFACTOR:
	function onSave(data) {
		editPost(data).then((r) => {
			if (JSON.stringify(r) === '{}') {
				createPost(data).then(() => alert('Created!'))
			} else {
				alert('Saved!')
			}
		})
	}

	function onDelete(ID) {
		deletePostByID(ID).then(r => alert('DELETED!'))
	}

	let onCreate = () => 's'
	return (
		<TableEditor
			data={posts}
			schema={{
				eventsMiddleware: {
					onSave,
					onDelete,
					onCreate,
				},
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
