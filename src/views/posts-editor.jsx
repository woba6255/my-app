import React from "react"
import { Link, Route } from "react-router-dom";
import { POST_EDITOR } from "~/router"

export const PagePostsEditor = () => <Route path={ POST_EDITOR } component={Page}/>

function Page() {
	return (
		<>
			<p>Post Editor here</p>
			<Link to={ POST_EDITOR }>Teest</Link>
		</>
	)
}
