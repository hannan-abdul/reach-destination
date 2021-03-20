import React, { useEffect, useState } from 'react';
import VehicleData from '../Data/data.json';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(VehicleData);
        console.log(VehicleData)
    }, [])
    return (
        <div className="container-fluid background">
            <div className="row justify-content-center vehicles">
                {
                    vehicles.map(vehicle =>
                        <div className="col-lg-2 card">
                            <Vehicle vehicle={vehicle}></Vehicle>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Home;