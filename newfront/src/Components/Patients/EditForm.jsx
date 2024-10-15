/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditForm({ userId, onCancel, userData: initialUserData, onEditComplete }) {
    const [userData, setUserData] = useState(initialUserData);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setUserData({ ...userData, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const response =await axios.put(`${apiUrl}api/users/${userId}`, userData);
        console.log('User updated:', response.data);
        onEditComplete(); // Inform the parent component that editing is complete
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div className="bg-blue-600 mt-5 flex items-center justify-center w-max mx-auto pt-10 px-10 pb-5 rounded-3xl">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-full-name"
            >
              Nom
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-full-name"
              type="text"
              name="nom"
              value={userData.nom}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-telephone"
            >
              Prenom
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-telephone"
              type="text"
              name="prenom"
              value={userData.prenom}
              onChange={handleChange}
              placeholder="Entrer votre nom"
            />
          </div>
        </div>
      <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-status"
            >
              Date de Naissance
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-status"
              type="date"
              name="dateNaissance"
              value={userData.dateNaissance}
              onChange={handleChange}
              placeholder="Inserer date"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-visit-date"
            >
              Tele
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-visit-date"
              type="number"
              name="tel"
              value={userData.tel}
              onChange={handleChange}
              placeholder="0661255659"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-description"
            >
              Adress
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              name="adresse"
              value={userData.adresse}
              onChange={handleChange}
              placeholder="Rue Al Woroud, Guercif"
            />
          </div>
        </div>


        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditForm;
