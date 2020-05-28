import React from "react"
import { ROUTE_METRICS } from "~/modules/router"
import { Metrics } from "~/modules/metrics/Metrics"
import { NavBar } from "~/modules/nav-bar/NavBar"
import { PageBasic } from "~/components/page"

export function IndexViewGraphTable() {
	return [
		{ path: ROUTE_METRICS, key: "Index", exact: true, component: Page },
		// routerGraph(),
	]
}

function Page() {
	return (
		<>
			<NavBar/>
			<PageBasic>
				<Metrics/>
			</PageBasic>
		</>
	)
}
