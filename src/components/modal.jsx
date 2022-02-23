import React, { useEffect, useState } from 'react';
import CityInput from './input.jsx';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Modal = (props) => {
  const [ weatherInfo, setWeatherInfo ] = useState();
  const [ chart, setChart ] = useState();

  useEffect(() => {
    if (weatherInfo) {
      if (!chart) {
        const ctx = document.getElementById('myChart').getContext('2d');
        setChart(new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['dia', 'dia', 'dia', 'dia', 'dia', 'dia', 'dia', 'dia'],
            datasets: [{
              data: weatherInfo.data.daily.map((v) => Math.round(v.temp.day)),
              fill: {
                target: 'origin',
                above: 'rgba(0, 0, 255, 0.5)',
              },
              pointStyle: 'line',
              tension: 0.4,
              borderJoinStyle: 'round',
            }]
          },
          options: {
            scales: {
                y: {
                  suggestedMin: 15,
                  suggestedMax: 40
                }
            }
          }
        }));
      } else {
        chart.data.datasets.forEach((i) => i.data =  weatherInfo.data.daily.map((v) => Math.round(v.temp.day)));
        chart.update();
      }
    }
      
  }, [weatherInfo])

  console.log('WEATHER', weatherInfo)
  return (
    <div className='modal'>
      <CityInput setWeatherInfo={setWeatherInfo} />
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  )
}

export default React.memo(Modal);