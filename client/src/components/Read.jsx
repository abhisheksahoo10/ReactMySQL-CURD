import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setStudent(res.data[0]);
            })
            .catch(err => console.log(err))

        //   return () => {
        //     second
        //   }
    }, [id]);

    return (
        <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h3>Student Detail</h3>
                <div className='p-2'>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th><h5>ID:</h5></th>
                                <td><h5>{student.ID}</h5></td>
                            </tr>
                            <tr>
                                <th><h5>NAME:</h5></th>
                                <td><h5>{student.Name}</h5></td>
                            </tr>
                            <tr>
                                <th><h5>Specialities</h5></th>
                                <td><h5>{student.Specialities}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Link to="/" className="btn btn-primary mx-2">Back</Link>
                <Link to={`/edit/${student.ID}`} className='btn btn-info mx-2'>Edit</Link>
            </div>
        </div>
    )
}

export default Read