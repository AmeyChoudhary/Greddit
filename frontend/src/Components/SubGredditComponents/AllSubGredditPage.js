import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import { useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';


const AllSubGredditPage = () => {

  let navigate = useNavigate()

  useEffect(() => {
    allSubGreddits();
    // is said to disble the warning of react hook dependency missing
    // eslint-disable-next-line
  }, [])

  const [subGreddits, setSubGreddits] = useState([])

  const allSubGreddits = async () => {
    const response = await fetch('http://localhost:4000/subgreddit/allsubgreddits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setSubGreddits(data);
  }
  
  return (
    <>
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
            onClick={() => { navigate('/subgreddit/mysubgreddits') }} >
            My Sub Greddits
          </button>
        </div>
      </div>

      <MDBContainer className="py-5 h-100 " >

<div className="d-flex justify-content-evenly align-items-center h-100 flex-wrap">
  {subGreddits.map((subGreddit) =>
    <div key={subGreddit.name}>

      <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
        <MDBCardHeader className="text-center">
          <MDBCardTitle>{subGreddit.name}</MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardText>
            {subGreddit.description}
          </MDBCardText>
          <MDBRow>
            <MDBCol>
              {subGreddit.members_num} Members
            </MDBCol>
            <MDBCol>
              {subGreddit.posts_num} Posts
            </MDBCol>
          </MDBRow>
          <MDBCardText>Banned Keywords are:</MDBCardText>
          <MDBRow>
            {subGreddit.banned_keywords.map((keyword, i) => [
              i > 0 && ",",
              <MDBCol key={i}>
                {keyword}
              </MDBCol>
            ])}
          </MDBRow>
      </MDBCardBody>
      <MDBCardFooter className="text-center">
        <MDBBtn color="primary" onClick={() => { navigate(`/subgreddit/${subGreddit.name}`) }}>View</MDBBtn>
      </MDBCardFooter>
    </MDBCard>
    </div>



  )}
</div>

</MDBContainer>

    </>
  )
}

export default AllSubGredditPage