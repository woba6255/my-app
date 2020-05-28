import React from "react"
import { ROUTE_CREATE_GRAPH_FROM_METRICS } from "~/modules/router"
import { useHistory } from "react-router"

export function routerGraph() {
	return { path: ROUTE_CREATE_GRAPH_FROM_METRICS, key: "Graph", exact: true, component: Page }
}

function Page() {
	const history = useHistory()
	return (
		<>
			<p>Hi</p>
		</>
	)
}
