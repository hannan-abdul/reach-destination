import React from 'react';
import { useParams } from 'react-router';
import maps from '../../images/Map.png';
import { useForm } from "react-hook-form";
import './Destination.css';

const Destination = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const { name } = useParams();
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder='Pick From' name="example" ref={register({ required: true })} />
                        <input placeholder='Pick To' name="exampleRequired" ref={register({ required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <input type="Submit"/>
                    </form>
                </div>
                <div className='col-md-8'>
                    <img className='map-img' src={maps} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Destination;