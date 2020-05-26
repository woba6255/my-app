import React, { useEffect, useState } from "react"
import { Table, } from "evergreen-ui";
import "react-datepicker/dist/react-datepicker.css";
import { useTableContext } from "~/components/table-editor/TableReducer"
import { Row } from "~/components/table-editor/TableRow"
import { editBtnWidth } from "~/components/table-editor/ActionsMenu"


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



