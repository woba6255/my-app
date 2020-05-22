import { UPDATE } from "./TableReducerActions"

const defaultValue = {}

const TableReducer = (state, action) => {
	switch (action.type) {
		case UPDATE:
			return {
				...state,
				...action.payload
			}
		// case 'name':
		// 	return {
		// 		...state,
		// 		name: action.payload,
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


