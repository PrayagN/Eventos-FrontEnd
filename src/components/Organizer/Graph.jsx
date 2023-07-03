import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

function Graph() {
  
    const [state,setState] = useState({
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
            }
          },
          series: [
            {
              name: "Booking",
              data: [ 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        
    })
  return (
    <div>
         <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="500"
            />
    </div>
  )
}

export default Graph
