import React from "react"
import { Link } from "react-router-dom"
import { Button } from "evergreen-ui"

export function IndexPage() {
	return (
		<Link to="/PostNowNoSure">
			<Button type="button">
				Click Me!
			</Button>
		</Link>
	)
}
