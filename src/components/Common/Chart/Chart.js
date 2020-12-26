import React from "react";
import {Bar} from "react-chartjs-2";

export default ({chart}) => {
  const [data, options] = getDataAndOptions(chart);

  return (
    <div style={{maxWidth: 1000, margin: '0 auto'}}>
      <Bar data={data} options={options}/>
    </div>
  );
}

const getDataAndOptions = ({title, labels, data} = {}) => {
  const options = {
    title: {
      display: true,
      text: title,
      fontSize: 20,
    },
    scales: {
      xAxes: [{
        ticks: {
          precision: 0,
        },
      }],
      yAxes: [{
        ticks: {
          precision: 0,
        },
      }]
    },
    legend: {
      display: false,
      position: 'right'
    }
  }

  const myData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: '#00bcd4',
      }
    ]
  }

  return [myData, options];
}
