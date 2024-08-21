'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    if (startDate) {
      params.set('startDate', startDate.toISOString());
    } else {
      params.delete('startDate');
    }

    if (endDate) {
      params.set('endDate', endDate.toISOString());
    } else {
      params.delete('endDate');
    }

    if (selectedOption) {
      params.set('option', selectedOption);
    } else {
      params.delete('option');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center space-x-4">
      {/* Search Input */}
      <div className="relative  p-1">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      {/* Datepicker for start date */}
      <div className="relative  p-1">
        <label htmlFor="startDate" className="sr-only">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500"
          placeholderText="Start Date"
          dateFormat="dd MMMM yyyy"
          popperClassName="border border-gray-300 shadow-lg rounded-md"
        />
      </div>

      {/* Datepicker for end date */}
      <div className="relative p-1">
        <label htmlFor="endDate" className="sr-only">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500"
          placeholderText="End Date"
          dateFormat="dd MMMM yyyy"
          popperClassName="border border-gray-300 shadow-lg rounded-md"
        />
      </div>

      {/* Radio buttons */}
      <div className="flex items-center space-x-4 p-1">
        <div className="relative">
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="" disabled>Select Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

    </div>
  );
}
