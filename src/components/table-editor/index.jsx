import React from 'react';
import { ProviderTableContext } from "~/components/table-editor/TableReducer"
import { TableCreator } from "~/components/table-editor/TableComponent"

export function TableEditor(props) {
	return (
		<ProviderTableContext>
			<TableCreator {...props} />
		</ProviderTableContext>
	)
}
