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
		state.schema.eventsMiddleware.onSave(rowState)
		setEditingRowID(null)
	}

	function onBack() {
		setRowState(getRowStateFromTableState())
		setEditingRowID(null)
	}

	console.log(state)

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
						on: editing === true, items: [
							{
								icon: "tick-circle", title: 'Save',
								onSelect: () => {
									console.log('sd')}
							},
							{
								icon: "arrow-left", title: 'Return',
								onSelect: onBack
							},
							{
								icon: "arrow-right", title: 'Return Return? ',
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
								onSelect: () => setEditingRowID(rowData.id)
							},
						]
					}
				]}/>
			</Table.Cell>
		</Table.Row>
	)
}
