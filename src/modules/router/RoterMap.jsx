import React from "react"
import { Route, Switch } from "react-router"



function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={props => <route.component {...props} routes={route.routes} />}
		/>
	);
}

export function RenderRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => {
				return <RouteWithSubRoutes key={route.key} {...route} />;
			})}
			<Route component={() => <h1>404 Not Found!</h1>} />
		</Switch>
	);
}

// export function displayRouteMenu(routes) {
//
// 	return (
// 		<ul>
// 			{routes.map(route => {
// 				if (route.routes) {
// 					return (
// 						<Fragment key={route.key}>
// 							{singleRoute(route)}
// 							{displayRouteMenu(route.routes)}
// 						</Fragment>
// 					);
// 				}
//
// 				// no nested routes, so just render a single route
// 				return singleRoute(route);
// 			})}
// 		</ul>
// 	);
// }
