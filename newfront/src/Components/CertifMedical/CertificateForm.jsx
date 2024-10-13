import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import MedicalCertificate from './MedicalCertificate';

const CertificateForm = () => {
  const [date, setDate] = useState('02/06/2024');
  const [name, setName] = useState('SASSOUR OUSSAMA');
  const [cin, setCin] = useState('Z6199360');
  const [days, setDays] = useState('deux (02)');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const differenceInDays = end.diff(start, 'days') + 1; // +1 to include the start date
      setDays(`${differenceInDays} `);
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-wrap justify-center items-stretch bg-blue-50 p-4 rounded-lg h-full mt-10">
      <div className="w-full h-screen md:w-1/3 bg-white shadow-lg border rounded-md mt-10 ml-10 p-7">
        <h1 className="text-2xl font-bold mb-4">Generate Medical Certificate</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CIN:</label>
            <input
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Days:</label>
            <input
              type="text"
              value={days}
              readOnly
              className="p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date Range:</label>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2  p-8 ">
        <MedicalCertificate
          date={date}
          name={name}
          cin={cin}
          days={days}
          startDate={startDate ? moment(startDate).format('DD/MM/YYYY') : ''}
          endDate={endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
        />
      </div>
    </div>
  );
};

export default CertificateForm;
