import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Vehicle.css';

const Vehicle = (props) => {
    const { image, name } = props.vehicle;

    const history = useHistory();
    const exploreVehicle = (name) =>{
        const url = `/destination/${name}`;
        history.push(url)
    }

    return (
        <div>
            <Link onClick={()=>exploreVehicle(name)}>
                <div className="vehicle-container">
                    <img src={image} alt="picture" />
                    <h3>{name}</h3>
                </div>
            </Link>
        </div>
    );
};

export default Vehicle;