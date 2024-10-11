import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

interface ChartContainerProps {
  chartData: any;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ chartData }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-8 mb-8">
      <div className="w-full mb-4 md:mb-0 bg-white p-4 sm:p-6 lg:p-12 rounded-2xl">
        <Bar data={chartData} />
      </div>
      <div className="w-full bg-white p-4 sm:p-6 lg:p-12 rounded-2xl">
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Sales',
                data: chartData.datasets[0].data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
              },
              {
                label: 'Expenses',
                data: chartData.datasets[1].data,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: true,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ChartContainer;
