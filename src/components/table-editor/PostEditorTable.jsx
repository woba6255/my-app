import React, { Fragment, useState } from "react"
import PropTypes from "prop-types";
import { Table, TextInput, } from "evergreen-ui";
import { editPost, postsType, postType } from "../../modules/fetch/api"
import { ActionsMenu } from "./ActionsMenu"

PostEditorTable.propTypes = {
	posts: postsType,
	editPost: PropTypes.func,
}
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

export function PostEditorTable({ posts }) {
	const [editingRow, changeEditingRow] = useState(null)

	// const [alertShow, changeAlertShow] = useState(true)

	function editNewRow(id) {
		if (editingRow === null) changeEditingRow(id)
		else {
			changeEditingRow(id)
		}
	}

	return (
		// TODO: remove:
		<Fragment>
			<Table>
				<Table.Head>

					{/*<Table.SearchHeaderCell/>*/}
					<Headers headers={
						[
							{ value: '#', styles: idWidth },
							{ value: 'Author' },
							{ value: 'Title' },
							{ styles: editBtnWidth }
						]
					}/>
				</Table.Head>
				<Table.Body
					style={{ overflowY: 'scroll' }}
				>
					{
						posts.map(post => {
							return (
								<Row
									post={post}
									key={post.id}
									editNewRow={editNewRow}
									editing={post.id === editingRow}
								/>
							)
						})
					}
				</Table.Body>
			</Table>
		</Fragment>
	)
}


function Headers({ headers }) {
	return headers.map((header, i) => (
		<Table.TextHeaderCell
			style={header.styles}
			key={i}
		>
			{
				header.value
			}
		</Table.TextHeaderCell>
	))
}



function Row({ post, editing, editNewRow }) {
	const [postRow, editPostRow] = useState(post)

	// const [showMenu, setShowMenu] = useState(false)
	function back() {
		editPostRow(post)
		editNewRow(null)
	}

	return (
		<Table.Row>
			<Table.TextCell
				style={idWidth}
			>
				{
					idFormat(post.id)
				}
			</Table.TextCell>
			<Table.TextCell>
				{
					editing === true
						? (
							<TextInput
								width="100%"
								onChange={e => {
									const newValue = Object.assign({}, postRow)
									newValue.author = e.target.value
									editPostRow(newValue)
								}}
								value={postRow.author}
							/>
						)
						: postRow.author
				}
			</Table.TextCell>
			<Table.TextCell>
				{
					editing === true
						? (
							<TextInput
								width="100%"
								onChange={e => {
									const newValue = Object.assign({}, postRow)
									newValue.title = e.target.value
									editPostRow(newValue)
								}}
								value={postRow.title}
							/>
						)
						: postRow.title
				}
			</Table.TextCell>
			<Table.TextCell
				style={editBtnWidth}
			>
				<ActionsMenu menuItems={[
					{
						// TODO: Refactor ActionsMenu (delete or ... "on")
						on: editing === true, items: [
							{
								icon: "tick-circle", title: 'Save',
								onSelect: () => editPost(postRow).then(r => {
									// TODO:  fix hard reload(for back remove) ♿
									document.location.reload();
									editNewRow(null)})
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
	)
}


function idFormat(id) {
	return '...' + id.slice(id.length - 6)
}
