import React from "react"
import { Table, Textarea, TextInput } from "evergreen-ui"
import DatePicker from "react-datepicker"
import {
	TABLE_CELL_ROLE_DATE,
	TABLE_CELL_ROLE_ID,
	TABLE_CELL_ROLE_INPUT,
	TABLE_CELL_ROLE_STATIC,
	TABLE_CELL_ROLE_TEXT_AREA
} from "./TableAliases"


export function TableCell({ cellSchema, cellState = '', onCellChange, editing }) {
	const { role, styles, formater } = cellSchema
	const value =
		formater
			? formater(cellState)
			: cellState

	function eventToCellChange(e) {
		onCellChange(e.target.value)
	}

	switch (role) {
		case TABLE_CELL_ROLE_ID:
		case TABLE_CELL_ROLE_STATIC:
			return <RoleStatic style={styles} value={value}/>
		case TABLE_CELL_ROLE_INPUT:
			return <RoleInput style={styles} editing={editing} onChange={e => eventToCellChange(e)} value={value}/>
		case TABLE_CELL_ROLE_TEXT_AREA:
			return <RoleTextArea style={styles} editing={editing} onChange={e => eventToCellChange(e)} value={value}/>
		case TABLE_CELL_ROLE_DATE:
			return <RoleDate style={styles} editing={editing} s={cellState} onChange={(date) => onCellChange(date)}
			                 date={value} onChange1={e => eventToCellChange(e)}/>
		default:
			return <RoleDefault style={styles}/>
	}
}


function RoleInput(props) {
	return <Table.TextCell
		style={props.style}
	>
		{
			props.editing === true
				? (
					<TextInput
						width="100%"
						onChange={props.onChange}
						value={props.value}
					/>
				)
				: props.value
		}
	</Table.TextCell>
}

function RoleTextArea(props) {
	return <Table.TextCell
		style={props.style}
	>
		{
			props.editing === true
				? (
					<Textarea
						style={{ marginTop: "10px", marginBottom: "10px" }}
						minHeight="auto"
						heigth="10px"
						width="100%"
						resize="vertical"
						onChange={props.onChange}
						value={props.value}
					/>
				)
				: props.value
		}

	</Table.TextCell>
}

function RoleDefault(props) {
	return <Table.TextCell
		style={props.style}
	>
		Not found(
	</Table.TextCell>
}


function RoleStatic(props) {
	return <Table.TextCell
		style={props.style}
	>
		{
			props.value
		}
	</Table.TextCell>
}


function RoleDate(props) {
	return <Table.TextCell
		style={props.style}
	>
		{
			props.editing === true
				? (
					<DatePicker
						selected={Date.parse(props.s)}
						onChange={props.onChange}
						customInput={<DateInput date={props.date} onChange={props.onChange1}/>}
						timeIntervals={1}
						timeFormat="HH:mm"
						showTimeSelect
					/>
				)
				: props.date
		}

	</Table.TextCell>
}



class DateInput extends React.Component {
	render() {
		return (
			<TextInput
				onClick={this.props.onClick}
				onChange={(e) => this.props.onChange(e)}
				value={this.props.date}
			/>
		)
	}
}


// class DateInput({ date, onClick, onChange }) {
// 	return (
//
// 	)
// }

