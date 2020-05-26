import React, { useState } from "react"
import { Table } from "evergreen-ui"
import { TABLE_REDUCER_SAVE_ROW, useTableContext } from "~/components/table-editor/TableReducer"
import { TableCell } from "~/components/table-editor/TableCell"
import { ActionsMenu, editBtnWidth } from "~/components/table-editor/ActionsMenu"
import { ROW_STATUS_CREATED, ROW_STATUS_EDIT, ROW_STATUS_STATIC } from "~/components/table-editor/TableAliases"

export function Row({ rowID, schema, rowStatus, setEditingRow }) {
	const { state, dispatch } = useTableContext()
	const { eventsMiddleware } = state.schema
	const [rowState, setRowState] = useState(getRowStateFromTableState())

	function getRowStateFromTableState() {
		return state.data.find(row => row.id === rowID)
	}

	// Emit on row lvl
	const rowActions = {
		back() {
			setRowState(getRowStateFromTableState())
			setEditingRow(null)
		},
		edit() {
			setEditingRow({id: rowID, status: ROW_STATUS_EDIT})
		},
		cancel() {
			setEditingRow(null)
		},
		async save() {
			setEditingRow(null)
			const middlewareResponse = await eventsMiddleware.onSave(rowState)
			if(middlewareResponse) {
				dispatch({type: TABLE_REDUCER_SAVE_ROW, payload: middlewareResponse})
			}
		},
	}
	
	const menuItems = []
	if (rowStatus === ROW_STATUS_EDIT) menuItems.push(...[
		{
			icon: "tick-circle", title: 'Save',
			onSelect: () => rowActions.save()
		},
		{
			icon: "arrow-left", title: 'Return',
			onSelect: () => rowActions.back()
		},
		{
			icon: "cross", title: 'Cancel',
			onSelect: () => rowActions.cancel()
		}
	])
	else if (rowStatus === ROW_STATUS_CREATED) menuItems.push(...[])
	else if (rowStatus === ROW_STATUS_STATIC) menuItems.push(...[
		{
			icon: "edit", title: 'Edit',
			color: "muted", style: { cursor: "pointer" },
			onSelect: () => rowActions.edit()
		},
	])


	return (
		<Table.Row height={'auto'} style={{ minHeight: '45px' }}>
			{
				schema.body.map(cellSchema => {
					const { key } = cellSchema
					const cellState = rowState[key]
					const editing = rowStatus !== ROW_STATUS_STATIC
					function onCellChange(newCellValue) {
						const newRowValue = Object.assign({}, rowState)
						newRowValue[key] = newCellValue
						setRowState(newRowValue)
					}

					return (
						<TableCell cellState={cellState} onCellChange={onCellChange} cellSchema={cellSchema}
						           editing={editing}/>
					)
				})
			}

			<Table.Cell style={editBtnWidth}>
				<ActionsMenu menuItems={menuItems}/>
			</Table.Cell>
		</Table.Row>
	)
}
