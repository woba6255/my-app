import React, { createRef, useEffect } from "react"
import Chart from 'chart.js'


export function MetricsGraphic(props) {
	const ref = createRef()
	console.log(ref)
	useEffect(() => {
		// const labels
		const chart = new Chart(ref.current.getContext('2d'), {
			type: "line",
			data: {
				labels: ["Jan", "Feb", "March"],
				datasets: [
					{
						label: "Temperature",
						data: [86, 67, 91],
					}
				]
			},
			options: {
				//Customize chart options
			}
		})
	}, [props.metrics]);



	return (
		<canvas id="myChart" ref={ref} width="400" height="400"/>
	)
}
