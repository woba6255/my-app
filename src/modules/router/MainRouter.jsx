import React from "react"
import { HashRouter } from "react-router-dom"
import { RenderRoutes } from "~/modules/router/RoterMap"
import { routerIndex } from "~/views"

export function MainRouter({ children }) {
	return (
		<HashRouter>
			<RenderRoutes routes={routerIndex()} />
			{children}
		</HashRouter>
	)
}
