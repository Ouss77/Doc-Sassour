import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientSearch from "./PatientSearch";
import QueueDisplay from "./QueueDisplay";
import VisitsChart from "./VisitsChart";

function AddConsultation() {
  const [showQueue, setShowQueue] = useState(true); // Initially show Queue
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}api/visits`);
        console.log(response.data)
        setQueue(response.data);
      } catch (error) {
        console.error("Failed to fetch queue", error);
      }
    };
    fetchQueue();
  }, []);
const handleAddToQueue = async (patient) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const isAlreadyInQueue = queue.some(
      (item) => item._id === patient._id && item.dateVisited.startsWith(today)
    );

    if (isAlreadyInQueue) {
      console.log("Patient already in the queue for today.");
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    await axios.post(`${apiUrl}api/addVisit`, {
      nom: patient.nom,
      prenom: patient.prenom,
      patientId: patient._id,
      motif: "Controle",
    });
    console.log("Visit added successfully");

    // Fetch the updated queue to reflect the new patient immediately
    const response = await axios.get(`${apiUrl}api/visits`);
    setQueue(response.data);
  } catch (error) {
    console.error("Failed to register visit", error);
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Add Patient to Consultation Queue
        </h1>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
          onClick={() => setShowQueue(!showQueue)}
        >
          {showQueue ? "Show Visits Chart" : "Show Queue"}
        </button>
      </div>
      {showQueue ? (
        <div>
          <PatientSearch onAddToQueue={handleAddToQueue} />
          <QueueDisplay queue={queue} setQueue={setQueue} />
        </div>
      ) : (
        <VisitsChart />
      )}
    </div>
  );
}

export default AddConsultation;
