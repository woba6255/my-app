import React, { createRef, useEffect } from "react"
import Chart from 'chart.js'


export function MetricsGraphic({metrics}) {
	const ref = createRef()

	useEffect(() => {
		const labels = metrics.map((e) => e.date)
		const data = metrics.map((e) => e.temperature)
		const chart = new Chart(ref.current.getContext('2d'), {
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: "Temperature",
						data: data,
					}
				]
			},
			options: {}
		})
	}, [metrics])


	return (
		<div style={{width: '50rem', position: 'relative',}}>
			<canvas id="myChart" ref={ref}/>
		</div>
	)
}
