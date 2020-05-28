import React from "react"
import { Pane } from "evergreen-ui"

export function PageBasic({ children }) {
	return (
		<Pane elevation={1} borderLeft='5px solid #dae4fc' style={{}} paddingY={'1rem'} paddingX={'1rem'} marginX={'1rem'}>
			{children}
		</Pane>
	)

}
