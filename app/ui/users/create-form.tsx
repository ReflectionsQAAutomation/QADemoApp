import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';
import { User } from '@/app/lib/api';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function Form() {


  const [selectedDate, setSelectedDate] = useState<string>('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [multiSelectedOptions, setMultiSelectedOptions] = useState<any[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'India', value: 'india' },
    { label: 'USA', value: 'usa' },
    { label: 'UK', value: 'uk' },
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (label: string, value: string) => {
    setSelectedOption(value);
    setSearchTerm(label); // Update the search term to show the selected option in the input
    setIsOpen(false); // Close the dropdown
  };


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

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
    <form className="space-y-4">
      {/* Fields in Rows with 3 Fields Each */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
          />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Country</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Select Country"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.label, option.value)}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedOption === option.value ? 'bg-blue-100' : ''
                    }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="border border-gray-300 p-2 rounded-md md:w-96 text-sm"
            placeholderText="DOB"
            dateFormat="dd MMMM yyyy"
            popperClassName="border border-gray-300 shadow-lg rounded-md"
          />
        </div>

      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
        <textarea
          placeholder="About user..."
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              type="radio"
              name="radioGroup"
              value="male"
              checked={radioValue === 'male'}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <span className="text-sm">Male</span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="radioGroup"
              value="female"
              checked={radioValue === 'female'}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <span className="text-sm">Female</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
        <div className="flex items-center">
          <div className="relative inline-block">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-500 text-white py-1 px-3 rounded-md cursor-pointer text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload File
            </label>
          </div>
          {file?.name && (
            <span className="ml-4 text-sm text-gray-700 dark:text-gray-300">{file?.name}</span>
          )}
        </div>
      </div>


      <div className="mb-4">
        <input
          type="checkbox"
          checked={checkboxValue}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm">Accept Agreements</label>
      </div>
      <div className="mb-4 flex space-x-2 pt-4 pb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm"
        >
          Create User
        </button>
        <button
          type="reset"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
