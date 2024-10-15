import axios from 'axios';
import Papa from 'papaparse';

// Function to flatten the medicalInfos array
function flattenPatientData(patients) {
  return patients.flatMap(patient => {
    const { medicalInfos, ...patientData } = patient;
    if (medicalInfos.length === 0) {
      return { ...patientData, ...emptyMedicalInfo() };
    } else {
      return medicalInfos.map(info => ({ ...patientData, ...info }));
    }
  });
}

function emptyMedicalInfo() {
  return {
    id: '',
    tension: '',
    motif: '',
    diagnostic: '',
    traitement: '',
    mutuelle: '',
    dateVisite: ''
  };
}

export async function exportToCSV() {
  try {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const response = await axios.get(`${apiUrl}api/users`);
    const patients = response.data;

    // Flatten the patient data to handle nested medicalInfos
    const flattenedData = flattenPatientData(patients);

    // Convert JSON to CSV
    const csv = Papa.unparse(flattenedData);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'patients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
  }
}
