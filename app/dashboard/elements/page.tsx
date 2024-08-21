"use client"
import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { lusitana } from '@/app/ui/fonts';
import { XMarkIcon } from '@heroicons/react/24/outline';

const DemoPage = () => {

  const [sliderValue, setSliderValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleConfirmation = () => setConfirmationOpen(!confirmationOpen);

  const showAlert = (message: string) => setAlertMessage(message);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Elements</h1>
      </div>


      {/* Modal */}
      <div className="mb-4 pt-4">
        <button
          onClick={toggleModal}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 text-sm"
        >
          Open Modal
        </button>
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg relative max-w-md w-full">
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm"
                  />
                </div>
              </form>

              <div className="flex justify-end mt-4">
                <button
                  onClick={toggleModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 text-sm"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <div className='mb-4 pt-4'>
        <button
          onClick={toggleConfirmation}
          className="bg-yellow-500 text-white py-2 px-4 text-sm rounded-md hover:bg-yellow-600"
        >
          Open Confirmation Dialog
        </button>
        {confirmationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-sm w-full">
              <h2 className="text-sm font-semibold mb-2">Are you sure?</h2>
              <div className="flex justify-end gap-2">
                <button
                  onClick={toggleConfirmation}
                  className="bg-red-500 text-white py-2 px-4 text-sm rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleConfirmation}
                  className="bg-green-500 text-white py-2 px-4 text-sm rounded-md hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className='mb-4 pt-4'>
        <button
          onClick={() => showAlert('Success!')}
          className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-600 mr-2"
        >
          Show Success Alert
        </button>
        <button
          onClick={() => showAlert('Warning!')}
          className="bg-yellow-500 text-white py-2 px-4 text-sm rounded-md hover:bg-yellow-600 mr-2"
        >
          Show Warning Alert
        </button>
        <button
          onClick={() => showAlert('Error!')}
          className="bg-red-500 text-white py-2 px-4 text-sm rounded-md hover:bg-red-600"
        >
          Show Error Alert
        </button>
        {alertMessage && (
          <div
            className={`mt-2 p-2 rounded-md text-white ${alertMessage === 'Success!' ? 'bg-green-500' : alertMessage === 'Warning!' ? 'bg-yellow-500' : 'bg-red-500'}`}
          >
            {alertMessage}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className='mb-4 pt-4'>
        <button
          onClick={() => showToast('This is a toast message!')}
          className="bg-purple-500 text-white py-2 px-4 text-sm rounded-md hover:bg-purple-600"
        >
          Show Toast
        </button>
        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-black text-white p-2 text-sm rounded-md shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Tooltips */}
      <div className='mb-4 pt-4'>
        <Tooltip content="This is a tooltip" place="right" >
          <button
            data-tip="Hover over me!"
            className="bg-purple-500 text-white py-2 px-4 text-sm rounded-md hover:bg-purple-600"
          >Hover over me</button>
        </Tooltip>
      </div>
      <div>
        <button
          onClick={() => alert('Tooltip clicked!')}
          className="bg-indigo-500 text-white py-2 px-4 text-sm rounded-md hover:bg-indigo-600"
        >
          Clickable Tooltip
        </button>
      </div>

      {/* Sliders */}
      <div className='mb-4 pt-4'>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Single Value Slider:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none"
        />
        <div className="text-center mt-2 text-sm text-gray-600">{sliderValue}</div>
      </div>

      <div className='mb-4 pt-4'>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Range Slider:</label>
        <div className="flex gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={rangeValue[0]}
            onChange={(e) => setRangeValue([Number(e.target.value), rangeValue[1]])}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={rangeValue[1]}
            onChange={(e) => setRangeValue([rangeValue[0], Number(e.target.value)])}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none"
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">{`Range: ${rangeValue[0]} - ${rangeValue[1]}`}</div>
      </div>
    </div>
  );
};

export default DemoPage;
