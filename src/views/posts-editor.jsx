import React, { useEffect, useState } from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { PostsManger } from "~/modules/fetch/api"
import { PostEditorTable } from "~/modules/PostEditorTable"
import { ROUTE_INDEX, ROUTE_POST_EDITOR } from "~/modules/router"
import { NavBar } from "~/modules/nav-bar/NavBar"

export function routerPostEditor (){
	return { path: ROUTE_POST_EDITOR, key: "PE", exact: true, component: Page }
}

function Page () {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (posts.length === 0) {
			PostsManger.getAll().then(data => setPosts(data))
		}
	}, []);

	return (
		<>
			<NavBar />
			{
				posts.length
					? <PostEditorTable posts={posts}/>
					: <p>Waiting...</p>
			}
		</>
	)
}
