import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import NavbarModerator from '../SubGredditComponents/NavBarSubGreddit';

export const Stats = () => {

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

        await getStats(subgreddit_name);
        // console.log("This is report", reports);
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
        if (data.status === "moderator" || data.status === "member" || data.status === "blocked" || data.status === "requested" || data.status === "normal_user"){
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

  const getStats = async (subgreddit_name) => {
    let response = await fetch(`http://localhost:4000/moderator/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "subgreddit_name": subgreddit_name
      }),
    });
    let data = await response.json();
    setReports(data);
  }



  return (
    <>
      <NavbarModerator></NavbarModerator>
      {console.log("This is report", reports)}
      
      
 
    </>
  )
}

export default Stats
