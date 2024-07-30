import React, { useState } from "react";
import axios from "axios";
import './FlightStatus.css'; // Adjust path according to actual location

function FlightStatus() {
    const [flightID, setFlightID] = useState("");
    const [flight, setFlight] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getFlightStatus = async (flightID) => {
        setAnimate(true); // Start exit animation
        setTimeout(async () => {
            try {
                setFlight(null);
                setErrorMessage('');
                const backendResponse = await axios.get(`http://localhost:3000/flight/status?flight_id=${flightID}`);
                setFlight(backendResponse.data);
                setShowResult(true);
            } catch (error) {
                console.error("Unable to fetch data from backend: ", error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage('No such flight found in the database');
                } else {
                    setErrorMessage("An error occurred while fetching data.");
                }
                setShowResult(true); // Ensure the result view is shown even if there's an error
            } finally {
                setAnimate(false); // End exit animation
            }
        }, 1000); // Match animation duration
    };

    const handleSearchAgain = () => {
        setAnimate(true); // Start enter animation
        setTimeout(() => {
            setShowResult(false);
            setFlightID(''); // Clear the input field
            setAnimate(false); // End enter animation
        }, 1000); // Match animation duration
    };

    return (
        <div className='bg-rose-100 w-full h-screen flex items-center justify-center'>
            {!showResult ? (
                <div className={`rounded-2xl bg-gray-200 p-4 max-w-md w-max flex flex-col ${animate ? 'animate-rotate-out' : ''}`}>
                    <div className="border-b-4 border-red-500 py-2">
                        <h1 className="text-2xl font-bold text-red-500 text-center">Flight Status</h1>
                    </div>
                    <div className="w-full flex-grow">
                        <div className="flex items-center space-x-2 mt-5">
                            <label className="mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Flight ID:
                            </label>
                            <input
                                className="flex h-8 w-50 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter flight ID"
                                value={flightID}
                                onChange={(e) => setFlightID(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="mt-1 text-xs text-gray-500">*This field is required</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-auto'>
                        <button
                            onClick={() => getFlightStatus(flightID)}
                            className='mt-2 w-16 bg-black text-white text-sm font-sans font-semibold rounded-2xl py-1 hover:bg-green-600 transform active:scale-50 transition-transform duration-800'
                        >
                            Search
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`rounded-2xl bg-gray-200 p-4 max-w-md w-max flex flex-col ${animate ? 'animate-rotate-in' : ''}`}>
                    <div className="border-b-4 border-red-500 py-2">
                        <h1 className="text-2xl font-bold text-red-500 text-center">Flight Details</h1>
                    </div>
                    {errorMessage ? (
                        <div className="bg-red-600 p-4 rounded-md mb-4 mt-2">
                            <p>{errorMessage}</p>
                        </div>
                    ) : (
                        <div className="bg-gray-250 p-4 rounded-md">
                            {/* <h2 className="text-2xl mb-2">Flight Details</h2> */}
                            <p><strong>Flight ID:</strong> {flight.Flight_Number}</p>
                            <p><strong>Airline:</strong> {flight.Airline}</p>
                            <p><strong>Status:</strong> {flight.Status}</p>
                            <p><strong>Departure:</strong> {flight.Scheduled_Departure}</p>
                            <p><strong>Departure Gate:</strong> {flight.Departure_Gate}</p>
                            <p><strong>Arrival:</strong> {flight.Scheduled_Arrival}</p>
                            <p><strong>Arrival Gate:</strong> {flight.Arrival_Gate}</p>
                        </div>
                    )}
                    <div className='flex justify-center mt-4'>
                        <button
                            onClick={handleSearchAgain}
                            className='mt-2 w-40 bg-black text-white text-sm font-sans font-semibold rounded-2xl py-1 hover:bg-green-600 transform active:scale-50 transition-transform duration-800'
                        >
                            Search Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FlightStatus;
