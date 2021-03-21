import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import './Destination.css';
import Direction from '../Direction/Direction';

const Destination = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const { name } = useParams();
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 col-12'>
                    <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder='Pick From' onBlur={e =>setOrigin(e.target.value)} name="example" ref={register({ required: true })} />
                        <input placeholder='Pick To' onBlur={e =>setDestination(e.target.value)} name="exampleRequired" ref={register({ required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <input type="Submit"/>
                    </form>
                </div>
                <div className='col-lg-8 col-12'>
                    <Direction origin={origin} destination={destination}></Direction>
                </div>
            </div>
        </div>
    );
};

export default Destination;