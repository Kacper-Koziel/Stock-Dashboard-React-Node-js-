import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './Chart.css';
import { useEffect } from 'react';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const CryptoChart = ({ chartData, colorMode }) => {
    const isDark = colorMode === 'dark';

    const data = {
        labels: chartData.map(point => point.time),
        datasets: [
            {
                label: 'Price (USD)',
                data: chartData.map(point => point.price),
                borderColor: isDark ? '#b0b0b0' : 'rgb(199, 0, 0)',
                backgroundColor: isDark ? '#b0b0b0' : 'rgba(255, 13, 25, 0.5)',
                tension: 0.3,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                position: 'top',
                labels: {
                    color: isDark ? '#eee' : '#000'
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: isDark ? '#333' : '#fff',
                titleColor: isDark ? '#fff' : '#000',
                bodyColor: isDark ? '#ddd' : '#000',
            }
        },
        scales: {
            x: { 
                title: { display: true, text: 'Date', color: isDark ? '#eee' : '#000' },
                ticks: { color: isDark ? '#ccc' : '#000' },
                grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            },
            y: { 
                title: { display: true, text: 'Price (USD)', color: isDark ? '#eee' : '#000' },
                ticks: { color: isDark ? '#ccc' : '#000' },
                grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            },
        }
    };

    useEffect(() => {
        console.log(chartData);
    }, [chartData]);

    return (
        <div className={`chart-container ${colorMode}`}>
            <Line data={data} options={options} />
        </div>
    );
}

export default CryptoChart;