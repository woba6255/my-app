import React, { useEffect, useState } from "react"
import { Button, Table, } from "evergreen-ui";
import "react-datepicker/dist/react-datepicker.css";
import { TABLE_REDUCER_CREATE_ROW, useTableContext } from "~/components/table-editor/TableReducer"
import { Row } from "~/components/table-editor/TableRow"
import { editBtnWidth } from "~/components/table-editor/ActionsMenu"


export function TableCreator({ data, schema }) {
	// TODO: validate all table-editor
	const [editingRowID, setEditingRowID] = useState(null)
	const { state, dispatch } = useTableContext()

	useEffect(() => {
		dispatch({ schema, data })
	}, [data])

	function createNewRow() {
		dispatch({ type: TABLE_REDUCER_CREATE_ROW, payload: {
				id: Math.random().toString(36).substring(7),
				date: new Date()

			}})
	}

	return (
		state.data
			? <div>
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
				<Button onClick={createNewRow}>???</Button>
			</div>
			: <p>No data...</p>
	)
}



