import React from "react"
import { GRAPH_TABLE, INDEX } from "~/modules/router"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"

export function IndexViewGraphTable() {
	return [
		{ path: GRAPH_TABLE, key: "Index", exact: true, component: Page },

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
		</>
	)
}
