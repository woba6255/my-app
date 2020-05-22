import React from 'react'
import { TableReducer, defaultValue } from './TableReducer'

const AppContext = React.createContext()

function ProviderTableContext({ children }) {
	const [state, dispatch] = React.useReducer(TableReducer, defaultValue)
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}


const useTableContext = () => React.useContext(AppContext)

export {
	ProviderTableContext,
	useTableContext,
}
