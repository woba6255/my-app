import React, { useEffect, useState } from "react"
import { MetricsTable } from "~/modules/metrics/MetricsTable"
import { MetricsManager } from "~/modules/fetch/api"
import { MetricsGraphic } from "~/modules/metrics/MetricsGraphic"
import { Pane } from "evergreen-ui"


export function Metrics() {
	const [metrics, setMetrics] = useState([])
	const [tableState, setTableState] = useState(metrics)
	useEffect(() => {
		MetricsManager.getAll().then(data => {
			setMetrics(data)
			setTableState(data)
		})
	}, [])

	return (
		<Pane style={{display: 'inline-flex'}}>
			<MetricsTable metrics={tableState} setMetrics={setMetrics}/>
			<MetricsGraphic metrics={metrics} setMetrics={setMetrics}/>
		</Pane>
	)
}
