import axios from "axios";
import { useState } from "react";
/* eslint-disable react/prop-types */

function AddPatientDetails({userId, onCancel}) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [userData, setUserData] = useState({

    mutuelle: "",
    motif: "",
    diagnostic: "",
    traitement: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

      await axios.post(`${apiUrl}api/users/addMedicalInfo/${userId}`, userData);
      console.log("User added successfully");
      setShowSuccessAlert(true);
      setUserData({
        mutuelle: "",
        motif: "",
        diagnostic: "",
        traitement: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 via-blue-400 mt-5 flex items-center justify-center w-3/4 mx-auto pt-10 px-10 pb-5 rounded-3xl">
      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        {showSuccessAlert && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success alert!</span> User added
              successfully.
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-status"
            >
              Mutuelle
            </label>
            <input
            required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-status"
              type="text"
              name="mutuelle"
              value={userData.mutuelle}
              onChange={handleChange}
              placeholder="Type de mutuelle"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-motif"
            >
              Motif
            </label>
            <input
            required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-motif"
              name="motif"
              value={userData.motif} // Set the value directly here
              onChange={handleChange}
              placeholder="Motif de consultation"

            >
            </input>
          </div>
          
        </div>
        <div className=" flex-wrap -mx-3 mb-2">
          <div className="w-full  px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-full-name"
            >
              traitement
            </label>
            <input
            required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-20"
              id="grid-full-name"
              type="text"
              name="traitement"
              value={userData.traitement}
              onChange={handleChange}
              placeholder="Traitement a donner"
            />
          </div>
          <div className="w-full  px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-telephone"
            >
              Diagnostic
            </label>
            <input
            required
              className="appearance-none h-20 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-telephone"
              type="text"
              name="diagnostic"
              value={userData.diagnostic}
              onChange={handleChange}
              placeholder="diagnostique du jour"
            />
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Ajouter Consultation
        </button>
        <button
          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddPatientDetails;
