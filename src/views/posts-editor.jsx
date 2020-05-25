import React, { useEffect, useState } from "react"
import { Button } from "evergreen-ui"
import { useHistory } from "react-router"
import { getPosts } from "~/modules/fetch/api"
import { PostEditorTable } from "~/components/PostEditorTable"
import { INDEX, POST_EDITOR } from "~/modules/router"

export function routerPostEditor (){
	return { path: POST_EDITOR, key: "PE", exact: true, component: Page }
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
				onClick={() => history.push(INDEX)}
			>
				To Home
			</Button>
		</>
	)
}
