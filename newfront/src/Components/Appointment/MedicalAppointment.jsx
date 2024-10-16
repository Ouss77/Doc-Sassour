import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './calendarCustomStyles.css'; // Ensure this file exists and is styled correctly
import Header from '../Header';

const MedicalAppointment = () => {
  const [value, onChange] = useState(new Date());
  const [appointments, setAppointments] = useState({});

  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
      timeSlots.push(`${hour}:00`);
  }

  const fetchAppointments = async (date) => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL; // Make sure this is set in your environment variables
      const response = await axios.get(`${apiUrl}/appointments/${date}`);
      const formattedAppointments = response.data.reduce((acc, curr) => {
        acc[curr.time] = { note: curr.note, id: curr._id };  // Assuming backend sends _id
        return acc;
      }, {});
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const addAppointment = async (time, note) => {
    const dateKey = value.toISOString().split('T')[0];
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/appointments`, { date: dateKey, time, note });
      setAppointments((prev) => ({
        ...prev,
        [time]: { note: response.data.note, id: response.data._id }
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cancelAppointment = async (time) => {
    const appointmentId = appointments[time].id;
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/appointments/${appointmentId}`);
      setAppointments((prev) => {
        const newState = { ...prev };
        delete newState[time];
        return newState;
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-[url('./assets/doc.jpg')] h-screen bg-no-repeat bg-cover">
    <Header   />
        <div className="container mx-auto px-32 py-5 mt-16 ">
      <Calendar
        onChange={(newDate) => {
          onChange(newDate);
          fetchAppointments(newDate.toISOString().split('T')[0]);
        }}
        value={value}
        className="text-sm"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
        {timeSlots.map((time) => (
          <div key={time} className="relative group flex flex-col items-center mb-4">
            <button
              className={`w-full py-2 px-4 rounded-lg shadow-md text-white font-bold ${appointments[time] ? 'bg-red-500' : 'bg-green-500 hover:bg-green-700'}`}
              onClick={() => {
                if (!appointments[time]) {
                  const note = prompt(`Enter note for ${time}`);
                  if (note) {
                    addAppointment(time, note);
                  }
                }
              }}
              disabled={!!appointments[time]}
            >
              {time}
            </button>
            {appointments[time] && (
              <>
                <div className="absolute bottom-full mb-1 w-full text-center text-xs bg-black text-white py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {appointments[time].note}
                </div>
                <button
                  onClick={() => cancelAppointment(time)}
                  className="mt-1 bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default MedicalAppointment;
