// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const VisitsChart = () => {
//   console.log('VisitsChart');
//   const [visitsData, setVisitsData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     const fetchVisits = async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
//         const response = await axios.get(`${apiUrl}api/visits`);
//         setVisitsData(response.data);
//       } catch (error) {
//         console.error('Error fetching visits data:', error);
//       }
//     };

//     fetchVisits();
//   }, []);

//   useEffect(() => {
//     // Set default start and end dates for the last two weeks
//     const defaultEndDate = new Date();
//     const defaultStartDate = new Date(defaultEndDate);
//     defaultStartDate.setDate(defaultStartDate.getDate() - 14);

//     setStartDate(defaultStartDate);
//     setEndDate(defaultEndDate);
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filteredVisits = visitsData.filter(visit => {
//         const visitDate = new Date(visit.dateVisited);
//         return visitDate >= startDate && visitDate <= endDate;
//       });

//       const visitCounts = {};

//       filteredVisits.forEach(visit => {
//         const visitDate = new Date(visit.dateVisited).toLocaleDateString('en-US');
//         if (visitCounts[visitDate]) {
//           visitCounts[visitDate] += 1;
//         } else {
//           visitCounts[visitDate] = 1;
//         }
//       });

//       const sortedDates = Object.keys(visitCounts).sort((a, b) => new Date(a) - new Date(b));
//       const counts = sortedDates.map(date => visitCounts[date]);

//       setChartData({
//         labels: sortedDates,
//         datasets: [
//           {
//             label: 'Visits per Day',
//             data: counts,
//             fill: false,
//             backgroundColor: 'rgb(75, 192, 192)',
//             borderColor: 'rgba(75, 192, 192, 0.2)',
//           },
//         ],
//       });
//     }
//   }, [startDate, endDate, visitsData]);

//   const handleDateChange = (dates) => {
//     if (dates === null) {
//       setStartDate(null);
//       setEndDate(null);
//     } else {
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center bg-gray-100">
//       <div className="w-full lg:w-3/5 mb-8 lg:mb-0">
//         <h1 className="text-2xl font-bold mb-4 text-center">Visits Chart</h1>
//         <div className="flex justify-center">
//           <div className="w-full md:w-4/5 lg:w-3/4">
//             <Line data={chartData} options={{}} height={300} />
//           </div>
//         </div>
//       </div>
//       <div className="w-full lg:w-2/5 ml-36 lg:ml-56">
//         <h2 className="text-lg font-bold mb-6 mr-28 text-center text-blue-800">Selection la Date</h2>
//         <DatePicker
//           selected={startDate}
//           onChange={handleDateChange}
//           startDate={startDate}
//           endDate={endDate}
//           selectsRange
//           inline
//           className="p-2 border border-blue-500 bg-blue-100 rounded w-full text-sm "
//         />
//       </div>
//     </div>
//   );
// };

// export	default	VisitsChart;