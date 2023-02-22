import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import NavbarModerator from '../SubGredditComponents/NavBarSubGreddit';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Reported_Page = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);

  useEffect(() => {

    const Fetchdata = async () => {

      let token = localStorage.getItem("token");
      let subgreddit_name = params.subgreddit_name;

      if (token) {
        let decoded_user = await jwt(token)
        let username = decoded_user.username;

        await getReports(subgreddit_name);
        console.log("This is report", reports);
        let response = await fetch(`http://localhost:4000/subgreddit/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "subgreddit_name": subgreddit_name
          }),
        });
        let data = await response.json();
        if (data.status === "moderator") {
        }
        else {
          navigate("/subgreddit")
        }

      }
      else {
        navigate("/auth?mode=login")
      }
    }
    Fetchdata();
    // is said to disble the warning of react hook dependency missing
    // eslint-disable-next-line
  }, []);

  const getReports = async (subgreddit_name) => {
    const response = await fetch(`http://localhost:4000/moderator/reported_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "in_subgreddit": subgreddit_name
      }),
    });
    const data = await response.json();
    // setReports(data);
    // yahan dikkat hain
    console.log("This is data", data)
    setReports(data); 
  }


  const AcceptUser = async (username, first_name, last_name) => {
  }

  const RejectUser = async (username) => {
  }


  return (
    <>
      <NavbarModerator></NavbarModerator>
      <>The following Reports have been made: </>

      

      <MDBContainer className="py-5 h-100 " >

        <div className="d-flex justify-content-evenly align-items-center h-100">
          {console.log("From body", reports)}
          {reports && reports.map((report) =>
            <div key={report._id}>
              <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
                <MDBCardHeader className="text-center">
                  <MDBCardTitle>Reported By: {report.reported_by.username} </MDBCardTitle>
                  <MDBCardTitle>User reported: {report.poster.username} </MDBCardTitle>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBCardText>
                     Post Content: {report.post_content}
                  </MDBCardText>
                  <MDBCardText>
                    Reason: {report.reason}
                  </MDBCardText>
                  <MDBRow className="d-flex justify-content-evenly">
                    <MDBCol>
                      {/* <button className="btn btn-success" onClick={() => AcceptUser(report.username)}>Accept</button> */}
                    </MDBCol>
                    <MDBCol>
                      {/* <button className="btn btn-danger" onClick={() => RejectUser(report.username)}>Reject</button> */}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>

              </MDBCard>
            </div>
          )}
        </div>

      </MDBContainer> 

    </>
  )
}

export default Reported_Page