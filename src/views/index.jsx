import React from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerPostEditor } from "~/views/posts-editor"
import { ROUTE_INDEX, ROUTE_GRAPH_TABLE, ROUTE_POST_EDITOR, RenderRoutes } from "~/modules/router"
import { IndexViewGraphTable } from "~/views/graph-table"


export function routerIndex() {
	return [
		{ path: ROUTE_INDEX, key: "ROOT", exact: true, component: Page },
		routerPostEditor(),
		{ path: ROUTE_GRAPH_TABLE, key: "GT", component: RenderRoutes, routes: IndexViewGraphTable() },
	]
}

function Page() {
	const history = useHistory()
	return (
		<>
			<Button onClick={() => history.push(ROUTE_GRAPH_TABLE)}>GRAPHS</Button>
			<Button onClick={() => history.push(ROUTE_POST_EDITOR)}>Post Editor Table</Button>
		</>
	)
}
