import React from "react"
import { BrowserRouter } from "react-router-dom"
import { PageIndex } from "~/views"

export function MainRouter({ children }) {
	return (
		<BrowserRouter>
			<PageIndex />
			{children}
		</BrowserRouter>
	)
}
