import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function Graph({ monthlyTotals,type }) {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "Booking",
        data: []
      }
    ]
  });

  useEffect(() => {
    if(monthlyTotals){

      const monthNames = [];
      const monthlyTotal = [];

    // Generate all month names from January to December
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Populate monthNames and monthlyTotal arrays with corresponding values
    months.forEach(month => {
      const formattedMonth = `${month} 2023`;
      monthNames.push(formattedMonth);

      // Check if the current month exists in the monthlyTotals object
      // If yes, use the corresponding value; otherwise, use 0 as the default value
      const monthValue = monthlyTotals[formattedMonth] || 0;
      monthlyTotal.push(monthValue);
    });

    setState(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: monthNames
        }
      },
      series: [
        {
          ...prevState.series[0],
          data: monthlyTotal
        }
      ]
    }));
  }
  }, [monthlyTotals]);

  return (
    <div>
      <Chart options={state.options} series={state.series} type={type} width="500" />
    </div>
  );
}

export default Graph;
