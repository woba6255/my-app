import React from "react"
import { TableEditor } from "~/components/table-editor"
import { schema } from "~/modules/metrics/TableSchema"



export function MetricsTable(props) {

	return (
		<div style={{minWidth: '500px'}}>
			{
				props.metrics.length
					? <TableEditor
						data={props.metrics}
						schema={schema(props)}/>
					: <p>Waiting...</p>
			}
		</div>
	)
}
