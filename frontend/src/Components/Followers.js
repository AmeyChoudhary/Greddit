import React from 'react'
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import jwt from 'jwt-decode';

const Followers = () => {

    const [user, setuser] = useState({})
    const [ followers, setfollowers ] = useState()
    const [ all_users, setall_users ] = useState({})



    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            let decoded_user = jwt(token)
            setuser(decoded_user)
            getUserFollowers()

        }
        // is said to disble the warning of react hook dependency missing
        // eslint-disable-next-line
    }, []);

    

    

    // useEffect(() => {
    //     getUserFollowers()
    //     // eslint-disable-next-line
    // }, []);


    // const getUserFollowers = () => {
    //     console.log(user.username)
        // const response = await fetch('http://localhost:4000/users/followers', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        //     body: JSON.stringify({
        //         "username": user.username
        //     })
        // });

        // let data = await response.json();
        // setfollowers(data.formattedFollowers)
        // setall_users(data.all_users)
        // console.log(all_users)
        // console.log(followers)
    // }

    const getUserFollowers = async() => {
        // console.log(user.username)
        const username = user.username
         const response = await fetch('http://localhost:4000/users/followers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username
            })
        });
        let data = await response.json();
        console.log(data)
        // setall_users(data.all_users)
        // console.log(all_users)
    }

    return (
        <>
            <Navbar></Navbar>
            <h1 align="center">Followers</h1>
            <h3>You are being followed by the following:</h3>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Position</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>John Doe</p>
                                    <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Software engineer</p>
                            <p className='text-muted mb-0'>IT department</p>
                        </td>
                        <td>
                            <MDBBadge color='success' pill>
                                Active
                            </MDBBadge>
                        </td>
                        <td>Senior</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                    alt=''
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>Alex Ray</p>
                                    <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Consultant</p>
                            <p className='text-muted mb-0'>Finance</p>
                        </td>
                        <td>
                            <MDBBadge color='primary' pill>
                                Onboarding
                            </MDBBadge>
                        </td>
                        <td>Junior</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                                    alt=''
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>Kate Hunington</p>
                                    <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Designer</p>
                            <p className='text-muted mb-0'>UI/UX</p>
                        </td>
                        <td>
                            <MDBBadge color='warning' pill>
                                Awaiting
                            </MDBBadge>
                        </td>
                        <td>Senior</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>


        </>
    )
}

export default Followers