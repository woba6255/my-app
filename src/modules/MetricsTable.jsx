import React from "react"
import { MetricsManager } from "~/modules/fetch/api"
import { TableEditor } from "~/components/table-editor"
import {
	TABLE_CELL_ROLE_DATE,
	TABLE_CELL_ROLE_ID,
	TABLE_CELL_ROLE_INPUT,
} from "~/components/table-editor/TableAliases"


const idWidth = { maxWidth: '5rem' }

export function MetricsTable({ posts }) {

	const eventsMiddleware = {
		onStableStateChange(tableData) {
			console.log(tableData)
		},
		onSave: (data) => {
			MetricsManager.editOne(data).then(r => console.log('Saved!'))
			return data
		},
		onDelete: (ID) => {
			MetricsManager.deleteOneByID(ID).then(r => console.log('DELETED!'))
			return ID
		},
		onSaveNewRow: (data) => {
			MetricsManager.createOne(data).then(r => console.log('Saved!'))
			return data
		},
		onRowCreate: () => [{
			id: Math.random().toString(36).substring(7),
			date: new Date(),
		}, true],
	}
	return (
		<TableEditor
			data={posts}
			schema={{
				eventsMiddleware,
				body: [
					// { header: '#', styles: idWidth, key: 'id', role: TABLE_CELL_ROLE_ID },
					{ header: 'Date', key: 'date', role: TABLE_CELL_ROLE_DATE, formater: (date) => dateFormater(date) },
					{ header: '°С', key: 'temperature', role: TABLE_CELL_ROLE_INPUT },
				],
			}}/>
	)
}

function dateFormater(date) {
	if (date) {
		return new Intl.DateTimeFormat('ru', {
			year: 'numeric', month: 'numeric', day: 'numeric',
			hour: 'numeric', minute: 'numeric',
			hour12: false
		})
			.format(Date.parse(date))
	} else {
		return 'No Date detected'
	}

}
