import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Header from '../Header';

const MedicamentTable = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(50); // Set to 50 items per page
    const [totalItems, setTotalItems] = useState(0);

    const CACHE_KEY = 'medicaments_cache';

    // Fetch medicaments from the API or localStorage
    const fetchMedicaments = async (pageNumber) => {
        setLoading(true);

        // Check if cached data exists
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setMedicaments(parsedData.medicaments);
            setTotalItems(parsedData.totalItems);
            setLoading(false);
            return;
        }

        // Fetch from the API if no cached data
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}medicaments?page=${pageNumber}&limit=${itemsPerPage}`);
            
            // Cache the data
            const dataToCache = {
                medicaments: response.data,
                totalItems: response.data.total,
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));

            // Set the fetched data
            setMedicaments(response.data);
            setTotalItems(response.data.total);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the page changes
    useEffect(() => {
        fetchMedicaments(page);
    }, [page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    // Spinner (loading state)
    if (loading) {
        return (
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Veuillez attendre, les données seront prêtes dans un instant
                </p>
            </div>
        );
    }

    // Error state
    if (error) return <div>{error}</div>;

    return (
        <>
        <Header />
        <div className="flex justify-center px-4 md:px-0 pt-20"> {/* Added padding for small screens */}
            <div className="overflow-x-auto w-full md:w-4/5"> {/* Full width on mobile, 75% on larger screens */}
                <h1 className="text-xl font-bold mb-4 text-center">Medicaments List</h1>
                
                <table className="table-auto min-w-full border-collapse border border-gray-300 bg-blue-900 text-white">
                    <thead>
                        <tr className="bg-gray-400"> {/* Gray header */}
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">CODE</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">NOM</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">DCI1</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">DOSAGE1</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">FORME</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">PRESENTATION</th>
                            <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base">PRIX_BR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicaments.length > 0 ? (
                            medicaments.map((medicament) => (
                                <tr key={medicament.CODE} className="hover:bg-gray-700"> {/* Hover effect */}
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.CODE}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.NOM}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.DCI1}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.DOSAGE1}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.FORME}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.PRESENTATION}</td>
                                    <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{medicament.PRIX_BR}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="border border-gray-300 text-center py-2">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination at the bottom */}
                <div className="mt-4 flex justify-center">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        firstPageText="First"
                        lastPageText="Last"
                        prevPageText="Previous"
                        nextPageText="Next"
                        itemClass="inline-block mx-1"
                        linkClass="px-3 py-1 border rounded text-gray-700 hover:bg-gray-200"
                        activeLinkClass="bg-blue-500 text-white"
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default MedicamentTable;
