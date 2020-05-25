import React from "react"
import { Route } from "react-router-dom";
import { CREATE_GRAPH_FROM_GRAPH_TABLE } from "~/modules/router"
import { useHistory } from "react-router"

export function routerGraph() {
	return { path: CREATE_GRAPH_FROM_GRAPH_TABLE, key: "Graph", exact: true, component: Page }
}

function Page() {
	const history = useHistory()
	return (
		<>
			<p>Hi</p>
		</>
	)
}
