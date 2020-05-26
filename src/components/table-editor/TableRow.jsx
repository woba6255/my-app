import React, { useState } from "react"
import { Table } from "evergreen-ui"
import { TABLE_REDUCER_SAVE_ROW, useTableContext } from "~/components/table-editor/TableReducer"
import { TableCell } from "~/components/table-editor/TableCell"
import { ActionsMenu, editBtnWidth } from "~/components/table-editor/ActionsMenu"
import { ROW_STATUS_CREATED, ROW_STATUS_EDIT, ROW_STATUS_STATIC } from "~/components/table-editor/TableAliases"

export function Row({ rowID, schema, editing, setEditingRowID }) {
	const { state, dispatch } = useTableContext()
	const { eventsMiddleware } = state.schema
	const [rowState, setRowState] = useState(getRowStateFromTableState())

	function getRowStateFromTableState() {
		return state.data.find(row => row.id === rowID)
	}


	const rowStatus = editing ? ROW_STATUS_EDIT : ROW_STATUS_STATIC

	// Emit on row lvl
	const emit = {
		back() {
			setRowState(getRowStateFromTableState())
			setEditingRowID(null)
		},
		edit() {
			setEditingRowID(rowID)
		},
		cancel() {
			setEditingRowID(null)
		},
		async save() {
			setEditingRowID(null)
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
			onSelect: () => emit.save()
		},
		{
			icon: "arrow-left", title: 'Return',
			onSelect: () => emit.back()
		},
		{
			icon: "cross", title: 'Cancel',
			onSelect: () => emit.cancel()
		}
	])
	else if (rowStatus === ROW_STATUS_CREATED) menuItems.push(...[])
	else if (rowStatus === ROW_STATUS_STATIC) menuItems.push(...[
		{
			icon: "edit", title: 'Edit',
			color: "muted", style: { cursor: "pointer" },
			onSelect: () => emit.edit()
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
