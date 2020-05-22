import React, { Fragment, useState } from "react"
import PropTypes from "prop-types";
import { Table, TextInput, } from "evergreen-ui";
import { editPost, postsType, postType } from "../../modules/fetch/api"
import { MenuRowActions } from "./MenuRowActions"

Headers.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any,
		styles: PropTypes.object,
	}))
}
Row.propTypes = {
	post: postType,
	editNewRow: PropTypes.func,
	saveRow: PropTypes.func,
	editing: PropTypes.bool,
}


const idWidth = { maxWidth: '5rem' }
const editBtnWidth = { maxWidth: '4rem' }


export function TableCreator({ data, schema }) {
	const [editingRowID, setEditingRowID] = useState(null)


	return (
		<Table>
			<Table.Head>
				{
					schema.body.map((tableColumn, i) => (
						<Table.TextHeaderCell
							style={tableColumn.styles}
							key={i}
						>
							{
								tableColumn.header
							}
						</Table.TextHeaderCell>
					))
				}
			</Table.Head>
			<Table.Row>
				<Table.TextCell
					style={editBtnWidth}
				>
					<MenuRowActions menuItems={[
						{
							// TODO: Refactor ActionsMenu ("on" ...)
							on: editing === true, items: [
								{
									icon: "tick-circle", title: 'Save',
									// TODO: Fix editPost import => next fix
									onSelect: () => editPost(postRow).then(r => {
										// TODO:  fix hard reload(for back remove) ♿
										document.location.reload();
										editNewRow(null)
									})
								},
								{
									icon: "arrow-left", title: 'Return',
									onSelect: back
								},
								{
									icon: "cross", title: 'Cancel',
									onSelect: () => editNewRow(null)
								}
							]
						},
						{
							on: editing === false, items: [
								{
									icon: "edit", title: 'Edit',
									color: "muted", style: { cursor: "pointer" },
									onSelect: () => editNewRow(postRow.id)
								},
							]
						}
					]}/>
				</Table.TextCell>
			</Table.Row>
		</Table>
	)
}


function Row({ post, editing, editNewRow }) {
	const [postRow, editPostRow] = useState(post)

	// const [showMenu, setShowMenu] = useState(false)
	function back() {
		editPostRow(post)
		editNewRow(null)
	}
	return ({/*
		// 	<Table.TextCell
	// 		style={idWidth}
	// 	>
	// 		{
	// 			idFormat(post.id)
	// 		}
	// 	</Table.TextCell>
	// <Table.TextCell>
	// 	{
	// 		editing === true
	// 			? (
	// 				<TextInput
	// 					width="100%"
	// 					onChange={e => {
	// 						const newValue = Object.assign({}, postRow)
	// 						newValue.author = e.target.value
	// 						editPostRow(newValue)
	// 					}}
	// 					value={postRow.author}
	// 				/>
	// 			)
	// 			: postRow.author
	// 	}
	// </Table.TextCell>
	*/})

}


function idFormat(id) {
	return '...' + id.slice(id.length - 6)
}
