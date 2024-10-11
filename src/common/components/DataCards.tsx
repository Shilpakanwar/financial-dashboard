import React from 'react';

interface DataCardsProps {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const DataCards: React.FC<DataCardsProps> = ({ labels, datasets }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {labels.map((month, index) => (
        <div key={month} className="bg-white p-4 sm:p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-black mb-4">{month}</h2>
          <p className="text-[#7B91B0] mb-2">
            Sales: ${datasets[0].data[index]}
          </p>
          <p className="text-[#7B91B0]">Expenses: ${datasets[1].data[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default DataCards;
