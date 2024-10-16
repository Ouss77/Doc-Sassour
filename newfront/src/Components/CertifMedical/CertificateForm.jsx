import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import MedicalCertificate from './MedicalCertificate';
import axios from 'axios';
import MedicamentTable from '../Medicament/MedicamentTable';
import { Link } from 'react-router-dom';

const CertificateForm = () => {

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [cin, setCin] = useState('');
  const [days, setDays] = useState('deux (02)');
  const [medicament, setMedicament] = useState('');
  const [medicamentForme, setMedicamentForme] = useState(''); // Store the medication form
  const [medicaments, setMedicaments] = useState([]); // Store all medications
  const [filteredMedicaments, setFilteredMedicaments] = useState([]); // Store filtered medications
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [patients, setPatients] = useState([]); // Store all patients
  const [filteredPatients, setFilteredPatients] = useState([]); // Store filtered patients
  const [manualCinInput, setManualCinInput] = useState(true); 


 useEffect(() => {
    const CACHE_KEY = 'medicaments_cache';
    const cachedMedicaments = localStorage.getItem(CACHE_KEY);

    if (cachedMedicaments) {
      try {
        const parsedData = JSON.parse(cachedMedicaments);

        // Check if the data has a "medicaments" field and it's an array
        if (parsedData && Array.isArray(parsedData.medicaments)) {
          setMedicaments(parsedData.medicaments); // Set the medicaments array
        } else {
          console.error('Medications data is not an array:', parsedData);
        }
      } catch (error) {
        console.error('Error parsing medications from localStorage:', error);
      }
    } else {
      console.error('No medicaments found in localStorage.');
    }
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}api/users`);
        setPatients(response.data); // Store the fetched users
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);
  
  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const differenceInDays = end.diff(start, 'days') + 1; // +1 to include the start date
      setDays(`${differenceInDays} `);
    }
  }, [startDate, endDate]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setName(value);
    if (value) {
      // Filter locally from the list of all fetched patients
      const filtered = patients.filter(
        (patient) =>
          patient.nom.toLowerCase().includes(value) || patient.prenom.toLowerCase().includes(value)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  };

  // Handle name selection from suggestions
  const handleNameSelection = (selectedPatient) => {
    setName(`${selectedPatient.nom} ${selectedPatient.prenom}`);
    setCin(selectedPatient.CIN); // Auto-fill the CIN
    setFilteredPatients([]); // Clear suggestions
    setManualCinInput(false); // Disable manual CIN input
  };

  // Handle manual CIN input if no patient is selected
  const handleCinInput = (e) => {
    setCin(e.target.value);
    setManualCinInput(true); // Enable manual CIN input
  };

  // Handle filtering of medications as user types in the input
  const handleMedicamentInput = (e) => {
    const value = e.target.value.toLowerCase();
    setMedicament(value);

    if (value && Array.isArray(medicaments)) {
      // Filter medications locally by "NOM" field
      const filtered = medicaments.filter((med) =>
        med.NOM.toLowerCase().includes(value)
      );
      setFilteredMedicaments(filtered);
    } else {
      setFilteredMedicaments([]);
    }
  };

  // Handle medication selection
  const handleMedicamentSelection = (med) => {
    setMedicament(med.NOM); // Set the selected medication's name
    setMedicamentForme(med.FORME); // Store the medication's form
    setFilteredMedicaments([]); // Clear the suggestions
  };

  return (
    <div className="flex flex-wrap justify-center items-stretch bg-blue-50 p-4 rounded-lg mt-10 bg-[url('./assets/doc.jpg')] h-auto  bg-cover">
        <Link
        to={`/Medicament`}
          type="button"
          className="bg-blue-500 h-10 mt-10 p-2 rounded text-base hover:bg-blue-700"
        >
          Liste des medicaments
        </Link>
      <div className="w-full h-screen md:w-1/3 bg-white shadow-lg border rounded-md mt-10 ml-10 p-7">
        <h1 className="text-2xl font-bold mb-4">Generate Medical Certificate</h1>
        <form className="space-y-4">
          {/* Date Picker for the first date input */}
          <div>
            <label className="block text-sm font-medium mb-1">Date:</label>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              dateFormat="dd/MM/yyyy"
              className="p-2 border rounded-md w-full"
            />
          </div>

          {/* Name input with suggestions */}
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleSearchChange}
              className="p-2 border rounded-md w-full"
            />
            {/* Display filtered name suggestions */}
            {filteredPatients.length > 0 && (
              <ul className="border border-gray-300 rounded-md mt-2 bg-white max-h-40 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <li
                    key={patient._id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleNameSelection(patient)}
                  >
                    {patient.nom} {patient.prenom}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CIN input */}
          <div>
            <label className="block text-sm font-medium mb-1">CIN:</label>
            <input
              type="text"
              value={cin}
              onChange={handleCinInput}
              className={`p-2 border rounded-md w-full ${manualCinInput ? '' : 'bg-gray-100'}`}
              disabled={!manualCinInput} // Disable input if CIN is auto-filled
            />
          </div>

          {/* Days input (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Days:</label>
            <input
              type="text"
              value={days}
              readOnly
              className="p-2 border rounded-md w-full bg-gray-100"
            />
          </div>

          {/* Medication input with suggestions */}
          <div>
            <label className="block text-sm font-medium mb-1">Medicament:</label>
            <input
              type="text"
              value={medicament}
              onChange={handleMedicamentInput}
              className="p-2 border rounded-md w-full"
            />
            {/* Display filtered medication suggestions */}
            {filteredMedicaments.length > 0 && (
              <ul className="border border-gray-300 rounded-md mt-2 bg-white max-h-40 overflow-y-auto">
                {filteredMedicaments.map((med) => (
                  <li
                    key={med._id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleMedicamentSelection(med)} // Handle medication selection
                  >
                    {med.NOM} - {med.FORME} - {med.PRESENTATION}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display the selected medication form */}
          {medicamentForme && (
            <div>
              <label className="block text-sm font-medium mb-1">Forme:</label>
              <input
                type="text"
                value={medicamentForme}
                readOnly
                className="p-2 border rounded-md w-full bg-gray-100"
              />
            </div>
          )}

          {/* Date Range Picker */}
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

      <div className="w-full md:w-1/2 p-8">
        <MedicalCertificate
          date={moment(date).format('DD/MM/YYYY')}
          name={name}
          cin={cin}
          days={days}
          startDate={startDate ? moment(startDate).format('DD/MM/YYYY') : ''}
          endDate={endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
          medicament={medicament}
          medicamentForme={medicamentForme}
        />
      </div>
    </div>
  );
};

export default CertificateForm;
