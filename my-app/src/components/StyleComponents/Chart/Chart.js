import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './Chart.css';
import { useEffect } from 'react';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const CryptoChart = ({ chartData }) => {
    const data = {
        labels: chartData.map(point => point.time),
        datasets: [
            {
                label: 'Price (USD)',
                data: chartData.map(point => point.price),
                borderColor: 'rgb(199, 0, 0)',
                backgroundColor: 'rgba(255, 13, 25, 0.5)',
                tension: 0.3,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Price (USD)' } },
        }
    };

    useEffect(() => {
        console.log(chartData);
    }, [chartData]);

    return (
        <div className='chart-container'>
            <Line data={data} options={options} />
        </div>

    );
}

export default CryptoChart;