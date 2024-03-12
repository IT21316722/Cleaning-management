import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useReactToPrint }from 'react-to-print';

export default function EmployeesList() {

    const [getEmp, SetGetEmp] = useState([]);
    console.log(getEmp)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    });


    //get feed Data
    const getEmpData = async () => {

        const res = await fetch("http://localhost:5000/employees/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetEmp(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getEmpData();
    }, [])

    //Delete feed data
    const deleteEmp = async (id) => {

        const res2 = await fetch(`http://localhost:5000/employees/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 422 || !deleteData) {
            console.log("error");
        } else {
            getEmpData();

        }

    }
    //search feed
    const [searchInput,setSearchInput]=useState('');
    const searchEmp=(searchval)=>{
        setSearchInput(searchval)
    }
    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>Employees List</h4>
                <div class="ms-auto w-50">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search employee" 
                        onChange={(e)=>searchEmp(e.target.value)}
                    />
                </div>
            </div>
            
            <div className='underline' ></div>
            <table className="table table-bordered mt-5"  ref = {componentRef}>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Nic</th>
                        <th scope="col" >Address </th>
                        <th scope="col">City</th>
                        <th scope="col" >Department</th>
                        <th scope="col" >Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {getEmp.filter((val)=>{
                        if(searchInput == ""){
                            return val
                        }else if(val.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return val; 
                        }
                    }).map((result, id) => {
                        return (
                            <>
                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.name}</td>
                                    <td>{result.phoneNumber}</td>
                                    <td>{result.nic}</td>
                                    <td>{result.address}</td>
                                    <td>{result.city}</td>
                                    <td>{result.department}</td>
                                    <td>
                                        <Link className='btn btn-success ms-2' to={`/view/${result._id}`}>View</Link>
                                        <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                        <button className='btn btn-danger ms-2'
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deleteEmp(result._id)}>Delete</button>
                                    </td>
                                </tr>


                            </>
                        )
                    })}

                </tbody>
            </table>
            <button  className="btn btn-primary mt-5" onClick={handlePrint}> Download Report PDF </button>
        </div>
    )
}