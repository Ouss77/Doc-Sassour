/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

function PatientDetails({ id, onClose }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (id) {
          console.log(id)
          const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}api/users/medicalInfo/${id}`);
        
          setPatients(response.data);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
  
    fetchPatients();
  }, [id]); // Include userId in the dependency array

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-300">Patient Details</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Visits
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Mutuelle
                </th>
                <th scope="col" className="px-6 py-3 bg-blue-50 dark:bg-gray-800">
                  Motif
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Diagnostic
                </th>
                <th scope="col" className="px-6 py-3 bg-blue-50 dark:bg-gray-800">
                  Traitement
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 bg-blue-50 dark:bg-blue-800">{patient.id}</td>
                  <td className="px-6 py-4 bg-blue-50 dark:bg-blue-800">{patient.mutuelle}</td>
                  <td className="px-6 py-4 bg-blue-50 dark:bg-blue-800">{patient.motif}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-blue-800">{patient.diagnostic}</td>
                  <td className="px-6 py-4 bg-blue-50 dark:bg-blue-800">{patient.traitement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
