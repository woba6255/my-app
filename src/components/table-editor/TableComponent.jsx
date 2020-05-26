import React, { useEffect, useState } from "react"
import { Button, Table, } from "evergreen-ui";
import "react-datepicker/dist/react-datepicker.css";
import { useTableContext } from "~/components/table-editor/TableReducer"
import { Row } from "~/components/table-editor/TableRow"
import { editBtnWidth } from "~/components/table-editor/ActionsMenu"
import { ROW_STATUS_EDIT, ROW_STATUS_STATIC } from "~/components/table-editor/TableAliases"


export function TableCreator({ data, schema }) {
	// TODO: validate all table-editor
	const [editingRow, setEditingRow] = useState(null)
	const { state, dispatch } = useTableContext()

	useEffect(() => {
		dispatch({ schema, data })
	}, [data])


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
								// TODO HOT
								const rowStatus = (editingRow && row.id === editingRow.id) ? editingRow.status : ROW_STATUS_STATIC
								return (
									<Row rowID={row.id} schema={schema} rowStatus={rowStatus}
									     setEditingRow={setEditingRow}/>
								)
							})
						}
					</Table.Body>
				</Table>
				<Button onClick={() => console.log('hh')}>???</Button>
			</div>
			: <p>No data...</p>
	)
}



