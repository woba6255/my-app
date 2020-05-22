import React, { useState } from "react"
import { Table, Textarea, TextInput, } from "evergreen-ui";
import { editPost } from "../../modules/fetch/api"
import { ActionsMenu } from "./ActionsMenu"


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
			<Table.Body style={{overflowY: 'scroll'}}>
				{
					data.map(rowData => {
						const editing = rowData.id === editingRowID
						return (
							<Row rowData={rowData} schema={schema} editing={editing} setEditingRowID={setEditingRowID}/>
						)
					})
				}
			</Table.Body>
		</Table>
	)
}

const editBtnWidth = { maxWidth: '4rem' }

function Row({ rowData, schema, editing, setEditingRowID }) {
	const [rowState, setRowState] = useState(rowData)

	function back() {
		setRowState(rowData)
		setEditingRowID(null)
	}

	return (
		<Table.Row height={'auto'} style={{ minHeight: '45px' }}>
			{
				// Будет ли рендерильник это оптимизировать? Думаю нет.
				schema.body.map(cellSchema => {
					return (
						<TableCell rowState={rowState} setRowState={setRowState} cellSchema={cellSchema}
						           editing={editing}/>
					)
				})
			}
			<Table.Cell style={editBtnWidth}>
				<ActionsMenu menuItems={[
					{
						// TODO: Refactor ActionsMenu ("on" ...)
						on: editing === true, items: [
							{
								icon: "tick-circle", title: 'Save',
								// TODO: Fix editPost import => next fix
								onSelect: () => editPost(rowState).then(r => {
									// TODO:  fix hard reload(for back remove) ♿
									document.location.reload();
									setEditingRowID(null)
								})
							},
							{
								icon: "arrow-left", title: 'Return',
								onSelect: back
							},
							{
								icon: "cross", title: 'Cancel',
								onSelect: () => setEditingRowID(null)
							}
						]
					},
					{
						on: editing === false, items: [
							{
								icon: "edit", title: 'Edit',
								color: "muted", style: { cursor: "pointer" },
								onSelect: () => setEditingRowID(rowData.id)
							},
						]
					}
				]}/>
			</Table.Cell>
		</Table.Row>
	)
}

function TableCell({ cellSchema, rowState, setRowState, editing }) {
	const [textAreaWidth, setTextAreaWidth] = useState(null);
	const role = cellSchema.role
	const formater = cellSchema.formater
	const cellState = rowState[cellSchema.key]
	const value = formater
		? formater(cellState)
		: cellState

	if (role === 'id' || role === 'static') return (
		<Table.TextCell
			style={cellSchema.styles}
		>
			{
				value
			}
		</Table.TextCell>
	)
	else if (role === 'input') {
		return (
			<Table.TextCell
				style={cellSchema.styles}
			>
				{
					editing === true
						? (
							<TextInput
								width="100%"
								onChange={e => {
									const newValue = Object.assign({}, rowState)
									newValue[cellSchema.key] = e.target.value
									setRowState(newValue)
								}}
								value={value}
							/>
						)
						: value
				}
			</Table.TextCell>
		)
	} else if (role === 'textArea') {
		return (
			<Table.TextCell
				style={cellSchema.styles}
			>
				{
					editing === true
						? (
							<Textarea
								style={{ marginTop: '10px', marginBottom: '10px' }}
								minHeight="auto"
								heigth="10px"
								width="100%"
								resize="vertical"
								onChange={e => {
									const newValue = Object.assign({}, rowState)
									newValue[cellSchema.key] = e.target.value
									setRowState(newValue)
								}}
								value={value}
							/>
						)
						: value
				}

			</Table.TextCell>
		)
	}
}

