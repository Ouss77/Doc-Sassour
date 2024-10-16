import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import PatientDetails from "../Patients/PatientDetails";
import AddPatientDetails from "../Patients/AddPatientDetails";

function QueueDisplay({ queue, setQueue }) {
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [addReport, setAddReport] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [motif, setMotif] = useState("");

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  useEffect(() => {
    console.log("Alert Message:", alertMessage);
  }, [alertMessage]);

  const handleRemovePatient = async (nom, prenom) => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}api/removeVisit`, {
        params: { nom, prenom },
      });

      if (response.status === 200) {
        setAlertMessage(`Visit for ${nom} ${prenom} removed successfully`);
        setTimeout(() => setAlertMessage(""), 2000);
        setQueue((prevQueue) =>
          prevQueue.filter(
            (patient) => patient.nom !== nom || patient.prenom !== prenom
          )
        );
      }
    } catch (error) {
      console.error("Failed to remove visit", error);
    }
  };

  const handleDossier = async (nom, prenom) => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await axios.get(
        `${apiUrl}api/users/getPatientId?nom=${encodeURIComponent(
          nom
        )}&prenom=${encodeURIComponent(prenom)}`
      );
      setSelectedPatientId(response.data.id);
      setShowPatientDetails(true);
    } catch (error) {
      console.error("Failed to retrieve patient ID", error);
    }
  };

  const handleClosePatientDetails = () => {
    setShowPatientDetails(false);
    setSelectedPatientId(null);
  };

  const handleChange = async (newMotif, id) => {
    console.log("Updating motif:", newMotif, "for id:", id);

    setMotif(newMotif);
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      console.log("hey", apiUrl);
      await axios.patch(`${apiUrl}api/updateMotif`, {
        id: id,
        motif: newMotif,
      });
      console.log("Motif updated successfully");
      setQueue((prevQueue) =>
        prevQueue.map(
          (patient) =>
            patient._id === id ? { ...patient, motif: newMotif } : patient
        )
      );
    } catch (error) {
      console.error("Failed to update motif", error);
    }
  };

  const handleReport = (id) => {
    setSelectedPatientId(id);
    setAddReport(true);
  };

  const handleCancelReport = () => {
    setAddReport(false);
    setSelectedPatientId(null);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`relative ${addReport ? "overflow-hidden" : ""}`}>
      {addReport && selectedPatientId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AddPatientDetails
            userId={selectedPatientId}
            onCancel={handleCancelReport}
          />
        </div>
      )}
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
          {alertMessage}
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2 text-center md:text-left">
        Today's Queue
      </h2>

      {/* Table wrapper with horizontal scrolling on mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Nom</th>
              <th className="py-2 px-4 text-left md:px-0 md:py-1">
                <span className="hidden md:inline">Liste d'attente</span>
                <span className="inline md:hidden">LT</span>
              </th>
              <th className="py-2 px-10 text-left">Motif</th>
              <th className="py-2 px-10 text-left">Dossier</th>
              <th className="py-2 px-4 text-left">Rapport</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue
              .filter((item) => item.dateVisited?.startsWith(today))
              .map((item, index) => (
                <tr
                  key={item._id + index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="hover:bg-gray-200"
                >
                  <td className="py-2 px-4">{item.nom} {item.prenom}</td>
                  <td className="py-2 px-4 md:px-20 ordinal">{index + 1}</td>
                  <td className="py-2 px-4">
                    <form className="max-w-sm mx-auto">
                      <select
                        id="motif"
                        value={item.motif}
                        onChange={(e) => handleChange(e.target.value, item._id)}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5"
                      >
                        <option value="Controle">Controle</option>
                        <option value="Visite">Visite</option>
                        <option value="Other Motif">Other Motif</option>
                      </select>
                    </form>
                  </td>
                  <td className="py-2 px-10">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 md:px-3 rounded w-full md:w-auto"
                      onClick={() => handleDossier(item.nom, item.prenom)}
                    >
                      Verifier
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-green-700 text-white py-1 px-2 md:px-2 rounded w-full md:w-auto"
                      onClick={() => handleReport(item.patientId)}
                    >
                      Ajouter
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-500 text-white py-1 px-2 md:px-2 rounded w-full md:w-auto"
                      onClick={() => handleRemovePatient(item.nom, item.prenom)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showPatientDetails && (
        <PatientDetails
          id={selectedPatientId}
          onClose={handleClosePatientDetails}
        />
      )}
    </div>
  );
}

export default QueueDisplay;
