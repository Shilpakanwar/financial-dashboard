'use client';
import ChartContainer from '@/common/components/ChartContainer';
import DataCards from '@/common/components/DataCards';
import Modal from '@/common/components/FormModal';
import { useCopilotReadable } from '@copilotkit/react-core';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    sales: '',
    expenses: '',
  });
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [45, 39, 60, 50, 45, 30, 20],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  useCopilotReadable({
    description:
      'Data about the Sales, Revenue in particular month or as whole ',
    value: chartData,
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const monthIndex = chartData.labels.indexOf(formData.month);

    if (monthIndex !== -1) {
      const updatedSalesData = [...chartData.datasets[0].data];
      const updatedExpensesData = [...chartData.datasets[1].data];

      updatedSalesData[monthIndex] = Number(formData.sales);
      updatedExpensesData[monthIndex] = Number(formData.expenses);

      setChartData({
        ...chartData,
        datasets: [
          { ...chartData.datasets[0], data: updatedSalesData },
          { ...chartData.datasets[1], data: updatedExpensesData },
        ],
      });
    } else {
      const newSalesData = [
        ...chartData.datasets[0].data,
        Number(formData.sales),
      ];
      const newExpensesData = [
        ...chartData.datasets[1].data,
        Number(formData.expenses),
      ];
      const newLabels = [...chartData.labels, formData.month];

      setChartData({
        labels: newLabels,
        datasets: [
          { ...chartData.datasets[0], data: newSalesData },
          { ...chartData.datasets[1], data: newExpensesData },
        ],
      });
    }

    setFormData({ month: '', sales: '', expenses: '' });
    toggleModal(); // Close the modal
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <div className="sm:text-right">
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add/Update Financial Data
          </button>
        </div>
      </div>

      <ChartContainer chartData={chartData} />
      <DataCards labels={chartData.labels} datasets={chartData.datasets} />
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;
