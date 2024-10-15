/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "../Components/Header";
import TableHeader from "../Components/Patients/TableHeader";


function Patient() {
  const [displayComponent, setDisplayComponent] = useState(null); // State to manage which component to display

  return (
    <div className="bg-gray-50 ml-0">
      <Header />
      <TableHeader displayComponent={displayComponent} setDisplayComponent={setDisplayComponent} />

    </div>
  );
}

export default Patient;
