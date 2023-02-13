import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

import Navbar from '../Navbar';

import { useNavigate } from 'react-router-dom';

const CreateSubGredditPage = () => {

  let navigate = useNavigate()
  const enableSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { username, password } = document.forms[0];
    let btn = document.getElementById("submit");
    let isValid = true;
    if (username.value === "" || username.value === null) {
      isValid = false;
    }
    if (password.value === "" || password.value === null) {
      isValid = false;
    }

    btn.disabled = !isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    var { username, password } = document.forms[0];


    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        "username": username.value,
        "password": password.value,
      })
    });

    let data = await response.json();
    console.log(data)





    if (data.error) {
      alert(data.error)
    }
    else {

      localStorage.setItem("token", data.token);

      navigate('/profile')
    }
  }

  return (
    <div>

      <Navbar></Navbar>

      <div className="d-flex justify-content-center">
        <div className="btn-group shadow-0" role="group" aria-label="Basic example" >
          <button
            type="button"
            className="  p-4 m-2 btn btn-outline-secondary"
            onClick={() => { navigate('/subgreddit/create') }}>
            Create a New Subgreddit
          </button>
          <button
            type="button"
            className="  p-4 m-2 btn btn-outline-secondary"
            onClick={() => { navigate('/profile/potential_followings') }} >
            People To Follow
          </button>
        </div>
      </div>
      
      
      
      <form onSubmit={handleSubmit} onChange={enableSubmit}>

      




      </form>

    </div>
  )
}

export default CreateSubGredditPage




