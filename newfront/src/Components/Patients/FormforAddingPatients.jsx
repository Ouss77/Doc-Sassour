/* eslint-disable react/prop-types */

function FormforAddingPatients({ userData, handleChange, handleSubmit, showSuccessAlert }) {
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
              <span className="font-medium">Ajouter! </span> Vous avez ajouté un patient avec succès.
            </div>
          </div>
        )}
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
              placeholder="Entre le nom"
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
              placeholder="Entrer le prenom"
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
            required
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
            required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-visit-date"
              type="number"
              name="tel"
              value={userData.tel}
              onChange={handleChange}
              placeholder="0661255659"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-visit-date"
            >
              CIN
            </label>
            <input
            required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-visit-date"
              type="text"
              name="CIN"
              value={userData.CIN}
              onChange={handleChange}
              placeholder="Numero de la carte Nationale"
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
            required
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default FormforAddingPatients;
