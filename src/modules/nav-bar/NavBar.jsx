import React from "react"
import { Button, majorScale, minorScale, Pane } from "evergreen-ui"
import { useHistory } from "react-router"
import { ROUTE_INDEX, ROUTE_METRICS, ROUTE_POST_EDITOR } from "~/modules/router"


export function NavBar() {
	const history = useHistory()
	return (
		<Pane marginBottom={10} elevation={2} padding={12}>
			<Button height={majorScale(5)} appearance="minimal" intent="warning" margin={minorScale(1)} onClick={() => history.push(ROUTE_INDEX)}>Home</Button>
			<Button height={majorScale(5)} appearance="minimal" intent="warning" margin={minorScale(1)} onClick={() => history.push(ROUTE_METRICS)}>METRICS</Button>
			<Button height={majorScale(5)} appearance="minimal" intent="warning" margin={minorScale(1)} onClick={() => history.push(ROUTE_POST_EDITOR)}>Posts</Button>
		</Pane>
	)
}
