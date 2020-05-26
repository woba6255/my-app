import React from "react"
import { Table, Textarea, TextInput } from "evergreen-ui"
import DatePicker from "react-datepicker"
import {
	CELL_ROLE_DATE,
	CELL_ROLE_ID,
	CELL_ROLE_INPUT,
	CELL_ROLE_STATIC,
	CELL_ROLE_TEXT_AREA
} from "~/components/table-editor/TableCellRoles"


export function TableCell({ cellSchema, cellState, onCellChange, editing }) {

	const { role, styles, formater } = cellSchema
	const value =
		formater
			? formater(cellState)
			: cellState

	function eventToCellChange(e) {
		onCellChange(e.target.value)
	}

	switch (role) {
		case CELL_ROLE_ID:
		case CELL_ROLE_STATIC:
			return (
				<Table.TextCell
					style={styles}
				>
					{
						value
					}
				</Table.TextCell>
			)
		case CELL_ROLE_INPUT:
			return (
				<Table.TextCell
					style={styles}
				>
					{
						editing === true
							? (
								<TextInput
									width="100%"
									onChange={e => eventToCellChange(e)}
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
					style={styles}
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
									onChange={e => eventToCellChange(e)}
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
					style={styles}
				>
					{
						editing === true
							? (
								<DatePicker
									selected={Date.parse(cellState)}
									onChange={(date) => onCellChange(date)}
									customInput={<DateInput date={value} onChange={e => eventToCellChange(e)}/>}
									timeIntervals={1}
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
					style={styles}
				>
					Not found(
				</Table.TextCell>
			)
	}
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
