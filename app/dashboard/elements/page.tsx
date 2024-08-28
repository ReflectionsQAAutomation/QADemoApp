"use client"
import { useState } from 'react';
// import { Tooltip } from 'react-tooltip'
import { lusitana } from '@/app/ui/fonts';
import { XMarkIcon } from '@heroicons/react/24/outline';

const DemoPage = () => {

  const [sliderValue, setSliderValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[] | []>([]);
  const [checkedItems, setCheckedItems] = useState({
    usa: false,
    canada: false,
    mexico: false,
  });


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleConfirmation = () => setConfirmationOpen(!confirmationOpen);

  const showAlert = (message: string) => setAlertMessage(message);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedOptions(selected);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Elements</h1>
      </div>


      {/* Modal */}
      <div className="mb-4 pt-4" id="open-modal-section">
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
      <div className='mb-4 pt-4' id="confirmation-dialog-section">
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
      <div className='mb-4 pt-4' id="error-message-section">
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
          <div id="error-message"
            className={`mt-2 p-2 rounded-md text-white ${alertMessage === 'Success!' ? 'bg-green-500' : alertMessage === 'Warning!' ? 'bg-yellow-500' : 'bg-red-500'}`}
          >
            {alertMessage}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className='mb-4 pt-4' id="toast-section">
        <button
          onClick={() => showToast('This is a toast message!')}
          className="bg-purple-500 text-white py-2 px-4 text-sm rounded-md hover:bg-purple-600"
        >
          Show Toast
        </button>
        {toastMessage && (
          <div id="toast-message" className="fixed bottom-4 right-4 bg-black text-white p-2 text-sm rounded-md shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Tooltips */}
      {/* <div className='mb-4 pt-4'> */}
      {/* <Tooltip showArrow={true} content="I am a tooltip">
          <Button>Hover me</Button>
        </Tooltip> */}
      {/* </div> */}
      <div className='mb-4 pt-4' id="alert-section">
        <button
          onClick={() => {
            const confirmed = window.confirm('Are you sure you want to proceed?');
            if (confirmed) {
              alert('You clicked OK!');
            } else {
              alert('You clicked Cancel.');
            }
          }}
          className="bg-indigo-500 text-white py-2 px-4 text-sm rounded-md hover:bg-indigo-600"
        >
          Show Alert
        </button>
      </div>


      <div className='mb-4 pt-4' id="multi-dropdown-section">
        <form>
          <div className='mb-6'>
            <label htmlFor='multi-select' className='block text-md font-medium text-gray-800'>
              Select Countries
            </label>
            <select
              id='multi-select'
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              className='mt-2 block w-full py-3 px-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base transition duration-200 ease-in-out'
            >
              <option value='usa'>United States</option>
              <option value='canada'>Canada</option>
              <option value='mexico'>Mexico</option>
              <option value='brazil'>Brazil</option>
              <option value='india'>India</option>
              <option value='germany'>Germany</option>
            </select>
          </div>

          <div className='mb-6'>
            <label className='block text-md font-medium text-gray-800'>Choose Countries</label>
            <div className='mt-3 space-y-3'>
              <label className='flex items-center'>
                <input
                  id='check-usa'
                  type='checkbox'
                  name='usa'
                  checked={checkedItems.usa}
                  onChange={handleCheckboxChange}
                  className='form-checkbox h-5 w-5 text-indigo-600 transition duration-200 ease-in-out'
                />
                <span className='ml-3 text-gray-700 text-base'>United States</span>
              </label>
              <label className='flex items-center'>
                <input
                  id='check-canada'
                  type='checkbox'
                  name='canada'
                  checked={checkedItems.canada}
                  onChange={handleCheckboxChange}
                  className='form-checkbox h-5 w-5 text-indigo-600 transition duration-200 ease-in-out'
                />
                <span className='ml-3 text-gray-700 text-base'>Canada</span>
              </label>
              <label className='flex items-center'>
                <input
                  id='check-mexico'
                  type='checkbox'
                  name='mexico'
                  checked={checkedItems.mexico}
                  onChange={handleCheckboxChange}
                  className='form-checkbox h-5 w-5 text-indigo-600 transition duration-200 ease-in-out'
                />
                <span className='ml-3 text-gray-700 text-base'>Mexico</span>
              </label>
            </div>
          </div>

          {/* <button
            type='submit'
            className='bg-indigo-500 text-white py-2 px-4 text-sm rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out'
          >
            Submit
          </button> */}
        </form>
      </div>

      {/* Sliders */}
      <div className='mb-4 pt-4' id='single-value-slider-section'>
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

      <div className='mb-4 pt-4' id='range-slider-section'>
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
