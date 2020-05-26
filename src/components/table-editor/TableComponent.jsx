import React, { useEffect, useState } from "react"
import { Table, Textarea, TextInput, } from "evergreen-ui";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { editPost } from "~/modules/fetch/api"
import { TABLE_REDUCER_UPDATE_ROW_BY_ID, useTableContext } from "~/components/table-editor/TableReducer"
import { ActionsMenu } from "~/components/table-editor/ActionsMenu"
import {
	CELL_ROLE_DATE,
	CELL_ROLE_ID,
	CELL_ROLE_INPUT,
	CELL_ROLE_STATIC,
	CELL_ROLE_TEXT_AREA
} from "~/components/table-editor/CellRoles"
import { element } from "prop-types"


const editBtnWidth = { maxWidth: '4rem' }

export function TableCreator({ data, schema, onSave }) {
	// TODO: validate all table-editor
	const [editingRowID, setEditingRowID] = useState(null)
	const { state, dispatch } = useTableContext()

	useEffect(() => {
		dispatch({ schema, data, onSave })
	}, [data])

	return (
		state.data
			? <Table>
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
						state.data && state.data.map(row => {
							const editing = row.id === editingRowID
							return (
								<Row rowID={row.id} schema={schema} editing={editing}
								     setEditingRowID={setEditingRowID}/>
							)
						})
					}
				</Table.Body>
			</Table>
			: <p>No data...</p>
	)
}


function Row({ rowID, schema, editing, setEditingRowID }) {
	const { state, dispatch } = useTableContext()
	const [rowState, setRowState] = useState(state.data.find(row => row.id === rowID))

	function back() {
		setRowState(rowState)
		setEditingRowID(null)
	}

	return (
		<Table.Row height={'auto'} style={{ minHeight: '45px' }}>
			{
				// Будет ли рендерильник это оптимизировать? Думаю нет.
				schema.body.map(cellSchema => {
					return (
						<TableCell rowID={rowID} cellSchema={cellSchema}
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
								onSelect: () => setEditingRowID(rowState.id)
							},
						]
					}
				]}/>
			</Table.Cell>
		</Table.Row>
	)
}

function TableCell({ cellSchema, rowID, editing }) {
	const { state, dispatch } = useTableContext()
	const [cellState, setCellState] = useState();
	const role = cellSchema.role
	const formater = cellSchema.formater
	const rowState = state.data.find(e => e.id === rowID)
	const cellState = rowState[cellSchema.key]
	const value = formater
		? formater(cellState)
		: cellState
	console.log('R')

	function onChange(e) {
		const newValue = Object.assign({}, rowState)
		newValue[cellSchema.key] = e.target.value
		dispatch({ type: TABLE_REDUCER_UPDATE_ROW_BY_ID, payload: newValue })
	}

	switch (role) {
		case CELL_ROLE_ID:
		case CELL_ROLE_STATIC:
			return (
				<Table.TextCell
					style={cellSchema.styles}
				>
					{
						value
					}
				</Table.TextCell>
			)
		case CELL_ROLE_INPUT:
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
		case CELL_ROLE_TEXT_AREA:
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
		case CELL_ROLE_DATE:
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
										dispatch({ type: TABLE_REDUCER_UPDATE_ROW_BY_ID, payload: newValue })

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

function getRowState(state, schema, rowID) {
	return findByID(state.data, )
}

function getKeyFromIDRole(schema) {
	return schema.find(element => element.role === CELL_ROLE_ID)
}

function findByID(data, key, ID) {
	return data.find(element => element[key] === ID)
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
