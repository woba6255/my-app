import React, { useEffect, useState } from 'react'
import { PostEditor } from "./components/table-editor/table-editor"
import { getPosts } from "./modules/fetch/api"
import { Pane } from "evergreen-ui"

function App() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		console.log('re')
		if (posts.length === 0) {
			getPosts().then(data => setPosts(data))
		}
	}, []);

	return (
		<Pane>
			{
				posts.length
					? <PostEditor posts={posts}/>
					: <p>Waiting...</p>
			}
		</Pane>
	);
}

export default App;
