import React from "react"
import { Link, Route, Switch } from "react-router-dom";
import { PagePostsEditor } from "~/views/posts-editor"
import { POST_EDITOR } from "~/router"

export const PageIndex = () => (
	<Switch>
		<Route exact path='/' component={Page}/>
		<PagePostsEditor />
	</Switch>
)

function Page() {
	return (
		<>
			<Link to={ POST_EDITOR }>Teest</Link>
		</>
	)
}
