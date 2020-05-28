import React, { useState } from "react"
import { DotIcon, Table } from "evergreen-ui"
import { useTableContext } from "./TableReducer"
import { TableCell } from "./TableCell"
import { ActionsMenu, editBtnWidth } from "./ActionsMenu"
import {
	TABLE_ROW_STATUS_CREATED,
	TABLE_ROW_STATUS_EDIT,
	TABLE_ROW_STATUS_STATIC, TABLE_ROW_STATUS_STATIC_DISABLED,
	TABLE_REDUCER_DELETE_ROW, TABLE_REDUCER_SAVE_ROW, TABLE_REDUCER_DELETE_CREATE_ROW
} from "./TableAliases"

export function Row({ rowID, schema, rowStatus, setEditingRow }) {
	const { state, dispatch } = useTableContext()
	const { eventsMiddleware } = state.schema
	const [rowState, setRowState] = useState(getRowStateFromTableState())

	function getRowStateFromTableState() {
		return state.data.find(row => row.id === rowID)
	}

	async function MID(middlewareFunction, value) {
		if (middlewareFunction) return await middlewareFunction(value)
		else return value
	}


	const rowActions = {
		back() {
			setRowState(getRowStateFromTableState())
			setEditingRow(null)
		},
		edit() {
			setEditingRow({ id: rowID, status: TABLE_ROW_STATUS_EDIT })
		},
		cancel() {
			setEditingRow(null)
		},
		async saveNewRow() {
			setEditingRow(null)
			const middlewareResponse = await MID(eventsMiddleware.onSaveNewRow, rowState)
			dispatch({ type: TABLE_REDUCER_SAVE_ROW, payload: middlewareResponse })
		},
		async deleteNewRow() {
			const middlewareResponse = await MID(eventsMiddleware.onDdleteNewRow, rowState.id)
			if (rowStatus !== TABLE_ROW_STATUS_STATIC) setEditingRow(null)
			dispatch({ type: TABLE_REDUCER_DELETE_CREATE_ROW, payload: middlewareResponse })
		},
		async delete() {
			const middlewareResponse = await MID(eventsMiddleware.onDelete, rowState.id)
			if (rowStatus !== TABLE_ROW_STATUS_STATIC) setEditingRow(null)
			dispatch({ type: TABLE_REDUCER_DELETE_ROW, payload: middlewareResponse })
		},
		async save() {
			setEditingRow(null)
			const middlewareResponse = await MID(eventsMiddleware.onSave, rowState)
			dispatch({ type: TABLE_REDUCER_SAVE_ROW, payload: middlewareResponse })
		},
	}


	const menuItemsMap = [
		{
			icon: "edit", title: 'Edit',
			color: "muted", style: { cursor: "pointer" },
			onSelect: () => rowActions.edit(),
			on: [TABLE_ROW_STATUS_STATIC]
		},
		{
			icon: "tick-circle", title: 'Save',
			onSelect: () => rowActions.save(),
			on: [TABLE_ROW_STATUS_EDIT]
		},
		{
			icon: "tick-circle", title: 'Create',
			onSelect: () => rowActions.saveNewRow(),
			on: [TABLE_ROW_STATUS_CREATED]
		},
		{
			icon: "cross", title: 'Cancel',
			onSelect: () => rowActions.cancel(),
			on: [TABLE_ROW_STATUS_EDIT]
		},
		{
			icon: "arrow-left", title: 'Return',
			onSelect: () => rowActions.back(),
			on: [TABLE_ROW_STATUS_EDIT]
		},
		{
			icon: "trash", title: 'Delete',
			onSelect: () => rowActions.delete(),
			on: [TABLE_ROW_STATUS_EDIT, TABLE_ROW_STATUS_STATIC]
		},
		{
			icon: "trash", title: 'Delete',
			onSelect: () => rowActions.deleteNewRow(),
			on: [TABLE_ROW_STATUS_CREATED]
		},
	]

	const menuItems = menuItemsMap.filter((item) => item.on.length === 0 || item.on.includes(rowStatus))

	return (
		<Table.Row height={'auto'} style={{ minHeight: '45px' }}>
			{
				schema.body.map(cellSchema => {
					const { key } = cellSchema
					const cellState = rowState[key]
					const editing = [TABLE_ROW_STATUS_EDIT, TABLE_ROW_STATUS_CREATED].includes(rowStatus)

					function onCellChange(newCellValue) {
						const newRowValue = Object.assign({}, rowState)
						newRowValue[key] = newCellValue
						setRowState(newRowValue)
					}

					return (
						<TableCell key={key} cellState={cellState} onCellChange={onCellChange} cellSchema={cellSchema}
						           editing={editing}/>
					)
				})
			}

			<Table.Cell style={editBtnWidth}>
				{
					(rowStatus === TABLE_ROW_STATUS_STATIC_DISABLED)
						? <DotIcon />
						: <ActionsMenu menuItems={menuItems}/>
				}
			</Table.Cell>
		</Table.Row>
	)
}
