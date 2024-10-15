import { useEffect, useState } from "react";
import axios from "axios";
import PatientsTable from "./PatientsTable";
import AddPatient from "./AddPatient";
import { Link } from 'react-router-dom';
import { exportToCSV } from './exportToCSV'; // Import the export function

function TableHeader({ displayComponent, setDisplayComponent }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

        const response = await axios.get(`${apiUrl}api/users`);
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = patients.filter((patient) =>
      patient.prenom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleDelete = async (patientId) => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      await axios.delete(`${apiUrl}api/users/${patientId}`);
      console.log("Patient deleted successfully");
      setPatients(patients.filter((patient) => patient._id !== patientId));
      setFilteredPatients(filteredPatients.filter((patient) => patient._id !== patientId));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const exportData = () => {
    exportToCSV();
  };

  const handleAddPatient = () => {
    setDisplayComponent("AddPatient");
  };

  return (
    <div className="bg-[url('./assets/doc.jpg')] h-screen bg-no-repeat bg-cover">
      <section className="flex items-center dark:bg-gray-900">
        <div className="w-auto max-w-screen-xl px-4 mx-auto lg:px-12 pt-20 md:w-2/3">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <Link onClick={() => setDisplayComponent("PatientsTable")} className="mr-3 font-semibold dark:text-white">
                  PATIENTS
                </Link>
                {/* <p className="text-gray-500 dark:text-gray-400">
                  Manage Patients
                </p> */}
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleAddPatient}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-blue-500 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300  focus:outline-none  mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-2 -ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Ajouter Patient
                </button>
                <button
                  type="button"
                  onClick={exportData}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none mr-2"
                >
                  Export Data
                </button>
              </div>
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Chercher par nom"
                  onChange={handleSearchChange}
                  className="border border-gray-300 p-2 lg:ml-8 ml-5 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {displayComponent === "AddPatient" ? (
        <AddPatient />
      ) : ( 
        <PatientsTable
          filteredUsers={filteredPatients}
          handleDelete={handleDelete}
        />
      )}
    </div> 
  );
}

export default TableHeader;
