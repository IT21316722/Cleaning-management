import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export default function ViewEmployee(props) {

  const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    });

  const [state, setState] = useState({
    name: '',
    phoneNumber: '',
    nic: '',
    address: '',
    city: '',
    department: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employees/${props.match.params.id}`)
      .then(response => {
        setState(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  function onSubmit(e) {
    e.preventDefault();
    console.log(state);
  }

  return (
    <div ref = {componentRef}>
      <br />
      <br />
      <h3><b><center>View Employee</center></b></h3> <br />
      <div className="rounded border border-primary p-5 fs-5">
        <div>
          <p>
            <b>Name: </b>
            {state.name}
          </p>
        </div>
        <div>
          <p>
            <b>Phone Number: </b>
            {state.phoneNumber}
          </p>
        </div>
        <div>
          <p>
            <b>Nic: </b>
            {state.nic}
          </p>
        </div>
        <div>
          <p>
            <b>Address: </b>
            {state.address}
          </p>
        </div>
        <div>
          <p>
            <b>City: </b>
            {state.city}
          </p>
        </div>
        <div>
          <p>
            <b>Department: </b>
            {state.department}
          </p>
        </div>
        <button className="btn btn-info" >
  <Link to="/" >Back to Employees</Link>
</button>
        
        {/*<button  className="btn btn-primary mt-5" onClick={handlePrint}> Download Report PDF </button>*/}
      </div>
    </div>
  );
}