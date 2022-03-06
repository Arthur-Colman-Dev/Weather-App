import React, { useEffect, useState, useMemo, useRef } from 'react';
import CityInput from './input.jsx';
import { Chart, registerables } from 'chart.js';
import Spinner from 'react-bootstrap/Spinner';
import classnames from 'classnames';
Chart.register(...registerables);

const Modal = (props) => {
  const [ weatherInfo, setWeatherInfo ] = useState();
  const [ chart, setChart ] = useState();
  const [ loading, setLoading ] = useState(true);

  const isMobile = (window.innerWidth < 768)

  const getDays = () => {
    let days = [];
    const currentDay = new Date().getDay();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    for (let i = 0; i < 8; i++) {
      if (currentDay + i < 7) {
        days.push(daysOfWeek[(currentDay + i)])
      } else if (i === 7) {
        days.push(daysOfWeek[currentDay])
      } else {
        days.push(daysOfWeek[(currentDay + i) - 7])
      }
    }

    return days;
  }

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      } else {
        chart.data.datasets.forEach((i) => i.data =  weatherInfo.data.daily.map((v) => Math.round(v.temp.day)));
        chart.update();
        setLoading(false);
      }
    }
  }, [weatherInfo, chart])

  console.log('loading', loading)

  return (
    <div className='page__modal'>
      <CityInput setWeatherInfo={setWeatherInfo} />
      {
        loading && (
          <Spinner animation="border" />
        )
      }
      <canvas
        id="myChart"
        width={isMobile ? `${window.innerWidth}px` : '400px'}
        height={isMobile ? `${window.innerHeight - 46}px` : '200px'}
        className={classnames(
          {'hidden': loading},
        )}
      />
    </div>
  )
}

export default React.memo(Modal);