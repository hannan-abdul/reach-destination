import React from 'react';
import { useParams } from 'react-router';
import maps from '../../images/Map.png';

const Destination = () => {
    const {name} = useParams();
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={name} alt=""/>
                </div>
                <div className='col-md-6'>
                    <img src={maps} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Destination;