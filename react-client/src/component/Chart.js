import React from 'react';
import { Chart } from 'primereact/chart';

const LineChart= () => {
    const lineStylesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                borderColor: '#66BB6A'
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: '#FFA726',
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }]
            }
        };

        return {
            basicOptions
        }
    }

    const { basicOptions,} = getLightTheme();

    return (
        <div>
            <div className="card">
                <h5>Line Chart</h5>
                <Chart type="line" data={lineStylesData} options={basicOptions} />
            </div>
        </div>
    )
}

export default LineChart
                