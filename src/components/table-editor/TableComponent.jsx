import React, { useEffect, useState } from "react"
import { Table, Textarea, TextInput, } from "evergreen-ui";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { editPost } from "~/modules/fetch/api"
import { useTableContext } from "~/components/table-editor/TableReducer"
import { ActionsMenu } from "~/components/table-editor/ActionsMenu"


const editBtnWidth = { maxWidth: '4rem' }

export function TableCreator({ data, schema, onSave }) {
	// TODO: validate all table-editor
	const [editingRowID, setEditingRowID] = useState(null)

	const { state, dispatch } = useTableContext()

	useEffect(() => {
		dispatch({schema, data, onSave})
	}, [data])

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
				<Table.TextHeaderCell
					style={editBtnWidth}
				>
				</Table.TextHeaderCell>
			</Table.Head>
			<Table.Body style={{ overflowY: 'scroll' }}>
				{
					data.map(rowData => {
						const editing = rowData.id === editingRowID
						return (
							<Row rowData={rowData} schema={schema} editing={editing}
							     setEditingRowID={setEditingRowID}/>
						)
					})
				}
			</Table.Body>
		</Table>
	)
}


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
								// TODO: Fix hardcor editPost ♿
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
	const role = cellSchema.role
	const formater = cellSchema.formater
	const cellState = rowState[cellSchema.key]
	const value = formater
		? formater(cellState)
		: cellState

	function onChange(e) {
		const newValue = Object.assign({}, rowState)
		newValue[cellSchema.key] = e.target.value
		setRowState(newValue)
	}

	switch (role) {
		case 'id':
		case 'static':
			return (
				<Table.TextCell
					style={cellSchema.styles}
				>
					{
						value
					}
				</Table.TextCell>
			)
		case "input":
			return (
				<Table.TextCell
					style={cellSchema.styles}
				>
					{
						editing === true
							? (
								<TextInput
									width="100%"
									onChange={(e) => onChange(e)}
									value={value}
								/>
							)
							: value
					}
				</Table.TextCell>
			)
		case "dateArea":
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
									onChange={(e) => onChange(e)}
									value={value}
								/>
							)
							: value
					}

				</Table.TextCell>
			)
		case "date":
			return (
				<Table.TextCell
					style={cellSchema.styles}
				>
					{
						editing === true
							? (
								<DatePicker
									selected={Date.parse(cellState)}
									onChange={date => {
										const newValue = Object.assign({}, rowState)
										newValue[cellSchema.key] = date
										setRowState(newValue)
									}}
									customInput={<DateInput date={value} onChange={onChange}/>}
									timeFormat="HH:mm"
									showTimeSelect
								/>
							)
							: value
					}

				</Table.TextCell>
			)
		default:
			return (
				<Table.TextCell
					style={cellSchema.styles}
				>
					Not found(
				</Table.TextCell>
			)
	}
}

function DateInput({ date, onClick, onChange }) {
	return (
		<TextInput
			onClick={onClick}
			onChange={(e) => onChange(e)}
			value={date}
		/>
	)
}
