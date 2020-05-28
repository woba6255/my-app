import React, { useEffect, useState } from "react"
import { AddIcon, Button, Pane, Table, } from "evergreen-ui";
import "react-datepicker/dist/react-datepicker.css";
import { useTableContext } from "./TableReducer"
import { Row } from "./TableRow"
import { editBtnWidth } from "./ActionsMenu"
import {
	TABLE_ROW_STATUS_CREATED,
	TABLE_ROW_STATUS_STATIC,
	TABLE_ROW_STATUS_STATIC_DISABLED, TABLE_REDUCER_CREATE_ROW
} from "./TableAliases"


export function TableCreator({ data, schema }) {
	// TODO: validate all table-editor
	const [editingRow, setEditingRow] = useState(null)
	const { state, dispatch } = useTableContext()
	const { eventsMiddleware } = schema

	useEffect(() => {
		dispatch({ schema, data })
	}, [])

	// Emit on row lvl
	const tableActions = {
		async createRow() {
			const [startValue, editAfterCreate] = eventsMiddleware.onRowCreate()
			if (startValue && startValue.id && editAfterCreate) setEditingRow({
				id: startValue.id,
				status: TABLE_ROW_STATUS_CREATED
			})
			dispatch({ type: TABLE_REDUCER_CREATE_ROW, payload: startValue })
		}
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
								const rowStatus = (editingRow && row.id === editingRow.id)
									? editingRow.status
									: (editingRow === null)
										? TABLE_ROW_STATUS_STATIC
										: TABLE_ROW_STATUS_STATIC_DISABLED

								return (
									<Row key={row.id} rowID={row.id} schema={schema} rowStatus={rowStatus}
									     setEditingRow={setEditingRow}/>
								)
							})
						}
					</Table.Body>
				</Table>
				<Pane
					display="flex"
					alignItems="center"
					justifyContent="center"
					margin="7px"
				>
					{
						editingRow === null
						&& <Button onClick={() => tableActions.createRow()}><AddIcon/></Button>
					}
				</Pane>
			</div>
			: <p>No data...</p>
	)
}



