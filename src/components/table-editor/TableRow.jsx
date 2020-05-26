import React, { useState } from "react"
import { Table } from "evergreen-ui"
import { useTableContext } from "~/components/table-editor/TableReducer"
import { TableCell } from "~/components/table-editor/TableCell"
import { ActionsMenu, editBtnWidth } from "~/components/table-editor/ActionsMenu"

export function Row({ rowID, schema, editing, setEditingRowID }) {
	const { state, dispatch } = useTableContext()
	const [rowState, setRowState] = useState(getRowStateFromTableState())

	function getRowStateFromTableState() {
		return state.data.find(row => row.id === rowID)
	}

	function onSave() {
		const tableState = Object.assign([], state.data)
		tableState[tableState.findIndex(e => e.id === rowID)] = rowState
		state.onSave(tableState)
		setEditingRowID(null)
	}

	function onBack() {
		setRowState(getRowStateFromTableState())
		setEditingRowID(null)
	}

	return (
		<Table.Row height={'auto'} style={{ minHeight: '45px' }}>
			{
				schema.body.map(cellSchema => {
					const { key } = cellSchema
					const cellState = rowState[key]
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
				<ActionsMenu menuItems={[
					{
						// TODO: Refactor ActionsMenu ("on" ...)
						on: editing === true, items: [
							{
								icon: "tick-circle", title: 'Save',
								// TODO: Fix hardcor editPost ♿
								onSelect: onSave
							},
							{
								icon: "arrow-left", title: 'Return',
								onSelect: onBack
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
