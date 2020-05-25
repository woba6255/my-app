import React from "react"
import { CREATE_GRAPH_FROM_GRAPH_TABLE, GRAPH_TABLE, INDEX } from "~/modules/router"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerGraph } from "~/views/graph-table/graph"

export function IndexViewGraphTable() {
	return [
		{ path: GRAPH_TABLE, key: "Index", exact: true, component: Page },
		routerGraph(),
	]
}

function Page() {
	const history = useHistory()
	return (
		<>
			<p>{GRAPH_TABLE}</p>
			<Button
				onClick={() => history.push(INDEX)}
			>
				To Home
			</Button>
			<Button
				onClick={() => history.push(CREATE_GRAPH_FROM_GRAPH_TABLE)}
			>
				To {CREATE_GRAPH_FROM_GRAPH_TABLE}
			</Button>
		</>
	)
}
