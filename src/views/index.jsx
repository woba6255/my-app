import React from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerPostEditor } from "~/views/posts-editor"
import { INDEX, GRAPH_TABLE, POST_EDITOR, RenderRoutes } from "~/modules/router"
import { IndexViewGraphTable } from "~/views/graph-table"


export function routerIndex() {
	return [
		{ path: INDEX, key: "ROOT", exact: true, component: Page },
		routerPostEditor(),
		{ path: GRAPH_TABLE, key: "GT", component: RenderRoutes, routes: IndexViewGraphTable() },
	]
}

function Page() {
	const history = useHistory()
	return (
		<>
			<Button onClick={() => history.push(GRAPH_TABLE)}>GRAPHS</Button>
			<Button onClick={() => history.push(POST_EDITOR)}>Post Editor Table</Button>
		</>
	)
}
