/* eslint-disable react/prop-types */
import { FaPlus, FaRegEye, FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function PatientActions({ user, handleDelete, displayPatient, handleMedicalInfo, handleEditClick }) {
    return (
        <div className='flex'>
            <a
                href="#"
                className="font-medium text-black dark:text-blue-500 hover:underline"
                onClick={() => displayPatient(user._id)}
            >
                <FaRegEye className="mr-1" />
            </a>
            <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => handleMedicalInfo(user)}
            >
                <FaPlus className="mr-1" />
            </a>
            <a
                href="#"
                className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                onClick={() => handleEditClick(user)}
            >
                <FaUserEdit className="mr-1" />
            </a>
            <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                onClick={() => handleDelete(user._id)}
            >
                <MdDelete className="mr-1" />
            </a>
        </div>
    );
}

function PatientRow({ user, handleDelete, displayPatient, handleMedicalInfo, handleEditClick }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-3 lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.nom}</td>
            <td className="px-3 lg:px-6py-4">{user.prenom}</td>
            <td className="px-3 lg:px-6 py-4">{user.tel}</td>
            <td className="px-3 lg:px-6 py-4 hidden sm:table-cell">{user.dateNaissance}</td>
            <td className="px-3 lg:px-6 py-4 hidden sm:table-cell">{user.CIN}</td>
            <td className="px-3 lg:px-6 py-4 text-right">
                <PatientActions
                    user={user}
                    handleDelete={handleDelete}
                    displayPatient={displayPatient}
                    handleMedicalInfo={handleMedicalInfo}
                    handleEditClick={handleEditClick}
                />
            </td>
        </tr>
    );
}

export default PatientRow;


