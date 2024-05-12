import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values,setValues] = useState({
        name: "",
        specialities: ""
    })
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/student',values)
           .then(res =>{
              console.log(res);
              navigate('/');
           })
           .catch(err =>console.log(err))
    }
  return (
    <>
        <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h3>Add Student</h3>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' 
                        onChange={e=>setValues({...values,name:e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Specialities</label>
                        <input type="text" placeholder='Enter Specialities' className='form-control'
                        onChange={e=>setValues({...values,specialities:e.target.value})}/>
                    </div>
                    <button className='btn btn-success my-2 px-4'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Create