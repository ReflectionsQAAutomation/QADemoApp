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

  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const options = [
    { label: 'India', value: 'india' },
    { label: 'USA', value: 'usa' },
    { label: 'UK', value: 'uk' },
    { label: 'Canada', value: 'canada' },
    { label: 'Australia', value: 'australia' },
    { label: 'Germany', value: 'germany' },
    { label: 'France', value: 'france' },
    { label: 'Italy', value: 'italy' },
    { label: 'Brazil', value: 'brazil' },
    { label: 'Japan', value: 'japan' },
    { label: 'China', value: 'china' },
    { label: 'South Korea', value: 'south-korea' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'South Africa', value: 'south-africa' },
    { label: 'Russia', value: 'russia' },
    { label: 'Spain', value: 'spain' },
    { label: 'Netherlands', value: 'netherlands' },
    { label: 'Sweden', value: 'sweden' },
    { label: 'Norway', value: 'norway' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Finland', value: 'finland' },
    { label: 'New Zealand', value: 'new-zealand' },
    { label: 'Argentina', value: 'argentina' },
    { label: 'Chile', value: 'chile' },
    { label: 'Colombia', value: 'colombia' },
    { label: 'Peru', value: 'peru' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'Thailand', value: 'thailand' },
    { label: 'Indonesia', value: 'indonesia' },
    { label: 'Philippines', value: 'philippines' },
    { label: 'Turkey', value: 'turkey' },
    { label: 'Saudi Arabia', value: 'saudi-arabia' },
    { label: 'United Arab Emirates', value: 'uae' },
    { label: 'Israel', value: 'israel' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'Morocco', value: 'morocco' },
    { label: 'Nigeria', value: 'nigeria' },
    { label: 'Kenya', value: 'kenya' },
    { label: 'Ghana', value: 'ghana' },
    { label: 'Zimbabwe', value: 'zimbabwe' },
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (label: string, value: string) => {
    setSelectedOption(value);
    setSearchTerm(label);
    setIsOpen(false); 
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 5000);
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

  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() - 18)

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
            id="email"
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
            id="password"
            type="password"
            placeholder="Enter password"
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Country</label>
          <input
            id="country"
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
            <ul className="mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
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
            id="dateofbirth"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="border border-gray-300 p-2 rounded-md w-full text-sm"
            placeholderText="DOB"
            dateFormat="MMMM dd, yyyy"
            popperClassName="border border-gray-300 shadow-lg rounded-md"
            calendarClassName="dob_calendar"
            dayClassName={(date) => `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
            wrapperClassName="dob_wrapper w-full"
            maxDate={maxDate}
          />
        </div>

      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
        <textarea
          id="about"
          placeholder="About user..."
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              id="genderm"
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
              id="genderf"
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
              id="profileimage"
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
          id="agreements"
          checked={checkboxValue}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm">Accept Agreements</label>
      </div>
      <div className="mb-4 flex space-x-2 pt-4 pb-4">
        <button
          id="createuser"
          type="submit"
          onClick={() => showToast('User has been created successfully!')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm"
        >
          Create User
        </button>
        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-black text-white p-2 text-sm rounded-md shadow-lg">
            {toastMessage}
          </div>
        )}
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
