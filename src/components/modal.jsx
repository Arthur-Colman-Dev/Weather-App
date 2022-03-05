import React, { useEffect, useState } from 'react';
import CityInput from './input.jsx';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Modal = (props) => {
  const [ weatherInfo, setWeatherInfo ] = useState();
  const [ chart, setChart ] = useState();

  const getDays = () => {
    let days = [];
    const currentDay = new Date().getDay();
    const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    for (let i = 0; i < 8; i++) {
      if (currentDay + i < 8) {
        days.push(daysOfWeek[(new Date().getDay() + i) - 1])
      } else if (i === 7) {
        days.push(daysOfWeek[new Date().getDay()])
      } else {
        days.push(daysOfWeek[(new Date().getDay() + i) - 7])
      }
    }

    return days;
  }

  useEffect(() => {
    if (weatherInfo) {
      if (!chart) {
        const ctx = document.getElementById('myChart').getContext('2d');
        setChart(new Chart(ctx, {
          type: 'line',
          data: {
            labels: getDays(),
            datasets: [{
              data: weatherInfo.data.daily.map((v) => Math.round(v.temp.day)),
              fill: {
                target: 'origin',
                above: 'rgba(0, 0, 255, 0.5)',
              },
              tension: 0.4,
              borderJoinStyle: 'round',
            }]
          },
          options: {
            elements: {
              point: {
                radius: 1,
                backgroundColor: 'rgba(0, 0, 255, 0.5)'
              }
            },
            layout: {
              padding: 32
            },
            scales: {
              y: {
                ticks: {
                  callback: (value, index, ticks) => `${value} °C`
                },
                suggestedMin: 15,
                suggestedMax: 40,
                grid: {
                  display: false,
                }
              },
              x: {
                grid: {
                  display: false,
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                displayColors: false,
                callbacks: {
                  label: (context) => `${context.raw} °C`
                },
              },
            },
          }
        }));
      } else {
        chart.data.datasets.forEach((i) => i.data =  weatherInfo.data.daily.map((v) => Math.round(v.temp.day)));
        chart.update();
      }
    }
      
  }, [weatherInfo, chart])

  console.log('WEATHER', weatherInfo)
  return (
    <div className='modal'>
      <CityInput setWeatherInfo={setWeatherInfo} />
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  )
}

export default React.memo(Modal);