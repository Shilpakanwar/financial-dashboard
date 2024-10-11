import React from 'react';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  formData: { month: string; sales: string; expenses: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggleModal,
  formData,
  handleChange,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={toggleModal}
      ></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 z-10 w-10/12 md:w-2/3 xl:w-1/3">
        <h2 className="text-2xl mb-6 font-bold">Enter Financial Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Month
            </option>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="sales"
            value={formData.sales}
            onChange={handleChange}
            placeholder="Sales Amount"
            className="w-full p-4 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="expenses"
            value={formData.expenses}
            onChange={handleChange}
            placeholder="Expenses Amount"
            className="w-full p-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
        <button
          onClick={toggleModal}
          className="mt-4 w-full px-4 py-4 bg-red-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
