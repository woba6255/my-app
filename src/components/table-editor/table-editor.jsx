import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types";
import {
	Button,
	CrossIcon,
	Dialog,
	EditIcon, Menu,
	MoreIcon,
	Popover, Position,
	Table,
	TextInput,
	TickCircleIcon,
	Tooltip
} from "evergreen-ui";
import { postType, postsType } from "../../modules/fetch/api"

PostEditor.propTypes = {
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

export function PostEditor({ posts }) {
	const [editingRow, changeEditingRow] = useState(null)

	// const [alertShow, changeAlertShow] = useState(true)

	function editNewRow(id) {
		if (editingRow === null) changeEditingRow(id)
		else {
			changeEditingRow(id)
			console.log(id)
		}
	}

	// => saveEditingRow?
	function saveRow(id) {
		console.log(id)
	}

	return (
		// TODO: remove:
		<Fragment>
			{/*<Dialog*/}
			{/*	isShown={alertShow}*/}
			{/*	onCloseComplete={() => changeAlertShow(false)}*/}
			{/*	isConfirmDisabled={true}*/}
			{/*	confirmLabel={'Save'}*/}
			{/*	hasHeader={false}*/}
			{/*>*/}
			{/*	*/}
			{/*</Dialog>*/}

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
									saveEditingRow={saveRow}
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

// Table Header
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


// Table Body Row
function Row({ post, editing, editNewRow }) {
	const [postRow, editPostRow] = useState(post)
	// const [showMenu, setShowMenu] = useState(false)

	return (
		<Table.Row>
			<Table.TextCell
				style={idWidth}
			>
				{
					idFormat(postRow.id)
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
						: postRow.title
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
				<Popover
					position={Position.BOTTOM_LEFT}
					// isShown={showMenu}
					content={
						<Menu>
							<Menu.Group>
								{
									editing
										? (
											<Fragment>
												<Menu.Item icon="edit">Save</Menu.Item>
												<Menu.Item
													icon="cross"
													onClick={() => editNewRow(null)}
												>
													Cancel
												</Menu.Item>
											</Fragment>
										)
										: <Menu.Item
											icon="edit"
											color="muted"
											style={{ cursor: "pointer" }}
											onClick={() => editNewRow(post.id)}
										>
											Edit
										</Menu.Item>
								}
							</Menu.Group>
						</Menu>
					}
				>
					<MoreIcon
						style={{cursor: 'pointer'}}
						// onClick={setShowMenu(true)}
					/>
				</Popover>
			</Table.TextCell>
		</Table.Row>
	)
}


function idFormat(id) {
	return '...' + id.slice(id.length - 6)
}
