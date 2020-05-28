import React from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerPostEditor } from "~/views/posts-editor"
import { ROUTE_INDEX, ROUTE_METRICS, ROUTE_POST_EDITOR, RenderRoutes } from "~/modules/router"
import { IndexViewGraphTable } from "~/views/metrics"


export function routerIndex() {
	return [
		{ path: ROUTE_INDEX, key: "ROOT", exact: true, component: Page },
		routerPostEditor(),
		{ path: ROUTE_METRICS, key: "GT", component: RenderRoutes, routes: IndexViewGraphTable() },
	]
}

function Page() {
	const history = useHistory()
	return (
		<>
			<Button onClick={() => history.push(ROUTE_METRICS)}>METRICS</Button>
			<Button onClick={() => history.push(ROUTE_POST_EDITOR)}>Post Editor Table</Button>
		</>
	)
}
