import React, { useEffect, useState } from "react"
import { ROUTE_CREATE_GRAPH_FROM_METRICS, ROUTE_INDEX, ROUTE_METRICS } from "~/modules/router"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { routerGraph } from "~/views/metrics/graph"
import { MetricsManager } from "~/modules/fetch/api"
import { MetricsTable } from "~/modules/MetricsTable"

export function IndexViewGraphTable() {
	return [
		{ path: ROUTE_METRICS, key: "Index", exact: true, component: Page },
		routerGraph(),
	]
}

function Page() {
	const [posts, setPosts] = useState([])
	const history = useHistory()

	useEffect(() => {
		if (posts.length === 0) {
			MetricsManager.getAll().then(data => setPosts(data))
		}
	}, []);

	return (
		<>
			<div style={{maxWidth: '600px'}}>
				{
					posts.length
						? <MetricsTable posts={posts}/>
						: <p>Waiting...</p>
				}
			</div>

			<p>{ROUTE_METRICS}</p>
			<Button
				onClick={() => history.push(ROUTE_INDEX)}
			>
				To Home
			</Button>
			<Button
				onClick={() => history.push(ROUTE_CREATE_GRAPH_FROM_METRICS)}
			>
				To {ROUTE_CREATE_GRAPH_FROM_METRICS}
			</Button>
		</>
	)
}
