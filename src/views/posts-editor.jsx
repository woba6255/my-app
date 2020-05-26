import React, { useEffect, useState } from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { getPosts } from "~/modules/fetch/api"
import { PostEditorTable } from "~/components/PostEditorTable"
import { ROUTE_INDEX, ROUTE_POST_EDITOR } from "~/modules/router"

export function routerPostEditor (){
	return { path: ROUTE_POST_EDITOR, key: "PE", exact: true, component: Page }
}

function Page () {
	const [posts, setPosts] = useState([])
	const history = useHistory();

	useEffect(() => {
		if (posts.length === 0) {
			getPosts().then(data => setPosts(data))
		}
	}, []);

	return (
		<>
			{
				posts.length
					? <PostEditorTable posts={posts}/>
					: <p>Waiting...</p>
			}
			<Button
				onClick={() => history.push(ROUTE_INDEX)}
			>
				To Home
			</Button>
		</>
	)
}
