import React from "react"
import { ROUTE_CREATE_GRAPH_FROM_GRAPH_TABLE, ROUTE_GRAPH_TABLE, ROUTE_INDEX } from "~/modules/router"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerGraph } from "~/views/graph-table/graph"

export function IndexViewGraphTable() {
	return [
		{ path: ROUTE_GRAPH_TABLE, key: "Index", exact: true, component: Page },
		routerGraph(),
	]
}

function Page() {
	const history = useHistory()
	return (
		<>
			<p>{ROUTE_GRAPH_TABLE}</p>
			<Button
				onClick={() => history.push(ROUTE_INDEX)}
			>
				To Home
			</Button>
			<Button
				onClick={() => history.push(ROUTE_CREATE_GRAPH_FROM_GRAPH_TABLE)}
			>
				To {ROUTE_CREATE_GRAPH_FROM_GRAPH_TABLE}
			</Button>
		</>
	)
}
