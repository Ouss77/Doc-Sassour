import { useEffect, useState } from "react";
import axios from "axios";
import FormforAddingPatients from "./FormforAddingPatients";
import {useNavigate} from 'react-router-dom'

function AddPatient() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    tel: "",
    CIN: ""
  });

const handleChange = (event) => {
  const { name, value } = event.target;
  setUserData({ ...userData, [name]: value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(userData.dateNaissance)
        .toISOString()
        .split("T")[0];
      console.log("Formatted Date:", formattedDate); // Debugging log

      const newData = {
        ...userData,
        visitDate: formattedDate,
      };
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

      await axios.post(`${apiUrl}api/users`, newData);
      console.log("User added successfully");
      setShowSuccessAlert(true);
      setUserData({
        nom: "",
        prenom: "",
        dateNaissance: "",
        mutuelle: "",
        adresse: "",
        tel: "",
        CIN: ""

      });
      // Refresh the page

      navigate('/Patient');

    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <FormforAddingPatients
        userData={userData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showSuccessAlert={showSuccessAlert}
      />
    </div>
  );
}

export default AddPatient;
