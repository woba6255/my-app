import React from 'react';
import { ProviderTableContext } from "./TableReducer"
import { TableCreator } from "./TableComponent"
export * from './TableAliases'

export function TableEditor(props) {
	return (
		<ProviderTableContext>
			<TableCreator {...props} />
		</ProviderTableContext>
	)
}
