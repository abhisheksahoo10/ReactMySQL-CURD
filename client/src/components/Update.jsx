import React,{useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Update() {
    const {id} = useParams();
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setValues({
                    ...values,
                    name: res.data[0].Name,
                    specialities: res.data[0].Specialities
                });
            })
            .catch(err => console.log(err))
    }, [id]);
    const [values,setValues] = useState({
        name: '',
        specialities: ''
    })

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`,values)
          .then(res=>{
              console.log(res)
              navigate('/');
          }).catch(err=>console.log(err))
    }
   
    return (
        <>
            <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={handleUpdate}>
                        <h3>Add Student</h3>
                        <div className='mb-2'>
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder='Enter Name' className='form-control' value={values.name}
                                onChange={e => setValues({ ...values, name: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Specialities</label>
                            <input type="text" placeholder='Enter Specialities' className='form-control' value={values.specialities}
                                onChange={e => setValues({ ...values, specialities: e.target.value })} />
                        </div>
                        <button className='btn btn-success my-2 px-4'>Update</button>
                    </form>
                </div>
            </div>
        </>
  )
}

export default Update