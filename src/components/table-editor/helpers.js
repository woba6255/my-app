import { TABLE_CELL_ROLE_ID } from "./TableAliases"

/**  HELPERS  **/

export function getCellStateByID(ID, state, schema, cellKey) {
	const rowState = getRowStateByID(ID, state, schema)
	return getCellStateFromRowState(rowState, cellKey)
}

export function getRowStateByID(ID, data, schema) {
	return findByID(data,  getKeyFromIDRole(schema), ID)
}



function getCellStateFromRowState(rowState, cellKey) {
	return rowState[cellKey]
}

function getKeyFromIDRole(schema) {
	return schema.find(element => element.role === TABLE_CELL_ROLE_ID)
}

function findByID(data, key, ID) {
	return data.find(element => element[key] === ID)
}
