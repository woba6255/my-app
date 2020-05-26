import { TABLE_REDUCER_CREATE_ROW, TABLE_REDUCER_UPDATE, TABLE_REDUCER_UPDATE_ROW_BY_ID } from "./TableReducerActions"

const defaultValue = {}

const TableReducer = (state, action) => {
	const type = action.type || TABLE_REDUCER_UPDATE
	const payload = action.payload || action
	switch (type) {
		case TABLE_REDUCER_UPDATE: {
			return {
				...state,
				...payload
			}
		}
		case TABLE_REDUCER_UPDATE_ROW_BY_ID: {
			const { id } = payload
			const data = Object.assign([], state.data)
			const index = data.findIndex((element) => {
				return element.id = id
			})
			data[index] = Object.assign({}, data[index], action.payload)
			return {
				...state,
				data: data,
			}
		}
		case TABLE_REDUCER_CREATE_ROW: {
			const data = Object.assign([], state.data)
			data.push(payload)
			return {
				...state,
				data: data,
			}
		}
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


