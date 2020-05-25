import { UPDATE } from "./TableReducerActions"

const defaultValue = {}

const TableReducer = (state, action) => {
	const type = action.type || UPDATE
	const payload = action.payload || action
	switch (type) {
		case UPDATE:
			return {
				...state,
				...payload
			}
		// case 'name':
		// 	return {
		// 		...state,
		// 		name: payload,
		// 	}
		// case 'age':
		// 	return {
		// 		...state,
		// 		name: action.payload,
		// 	}
		// case 'anyobject': return {
		// 	...state,
		// 	anyobject: {
		// 		...state.anyobject,
		// 		...action.payload
		// 	}
		// }
		default: return state
	}
}
export {
	defaultValue,
	TableReducer,
}


