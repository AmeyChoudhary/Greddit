import React from 'react'
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

const Followers = () => {

    let navigate = useNavigate();
    const [user_orginal, Setuser_org] = useState({});
    const [followers, setfollowers] = useState({});
    const [followings, setfollowing] = useState({});
    const [potential_followings, setpotential_followings] = useState({});
    // const [all_users, setall_users] = useState({});



    useEffect(() => {

        const fetchdata = async () => {

            let token = localStorage.getItem("token");
            if (token) {
                let decoded_user = await jwt(token)
                Setuser_org(decoded_user)
            }
            else {
                navigate("/auth?mode=login")
            }
        }


        fetchdata();
        // is said to disble the warning of react hook dependency missing
        // eslint-disable-next-line
    }, []);

    const getUserFollowers = async () => {

        const username = user_orginal.username;
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
        setfollowers(data);

        // const response_all_users = await fetch('http://localhost:4000/users/all_users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        //     body: JSON.stringify({
        //         "username": username
        //     })
        // });
        // let data_all_users = await response_all_users.json();

        // setall_users_followers(data_all_users);
    }

    const Remove = async (e, username, followers_username) => {
        const response = await fetch('http://localhost:4000/users/followers/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username,
                "followers_username": followers_username
            })
        });
        let data = await response.json();
        console.log(data)

        e.target = () => {
            e.target.disabled = true;
        };

    }

    const getUserFollowing = async () => {
        const username = user_orginal.username;
        const response = await fetch('http://localhost:4000/users/followings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username
            })
        });
        let data = await response.json();

        setfollowing(data);

        // const response_all_users = await fetch('http://localhost:4000/users/all_users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        //     body: JSON.stringify({
        //         "username": username
        //     })
        // });
        // let data_all_users = await response_all_users.json();

        // setall_users_following(data_all_users);

    }

    const Unfollow = async (e, username, following_username) => {
        const response = await fetch('http://localhost:4000/users/followings/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username,
                "following_username": following_username
            })
        });
        let data = await response.json();
        console.log(data)

        e.target = () => {
            e.target.disabled = true;
        };
    }

    const getPotentialFollowings = async () => {
        const username = user_orginal.username;
        const response = await fetch('http://localhost:4000/users/potential_followings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username
            })
        });
        let data = await response.json();
        console.log("potential followings data" + data)
        setpotential_followings(data);


    }

    const Follow = async (username, potential_following_username) => {
        console.log("in follow")
        // console.log(key)
        const response = await fetch('http://localhost:4000/users/potential_followings/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": username,
                "potential_following_username": potential_following_username
            })

        });
        let data = await response.json();
        console.log(data)
        console.log("yo")

    }

    const [fillActive, setFillActive] = useState("free");

    const handleFillClick = (value) => {

        if (value === "followers") {
            getUserFollowers();
        }
        if (value === "followings") {
            getUserFollowing();
        }
        if (value === "people_to_follow") {
            getPotentialFollowings();
        }
        console.log(fillActive)
        if (value === fillActive) {
            return;
        }
        setFillActive(value);
    };

    return (

        <>
            <div>
                <Navbar></Navbar>
                <MDBTabs fill className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('followers')} active={fillActive === 'followers'}>
                            Followers
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('followings')} active={fillActive === 'followings'}>
                            followings
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('people_to_follow')} active={fillActive === 'people_to_follow'}>
                            People to follow
                        </MDBTabsLink>
                    </MDBTabsItem>

                </MDBTabs>

                {fillActive === "free" && <h1 align="center"> Click on the tabs to see the content </h1>}

                <MDBTabsContent>
                    <MDBTabsPane show={fillActive === 'followers'}>
                        <h3>You are being followed by the followings:</h3>
                        {/* <MDBBtn color='link' rounded size='sm' onClick={getUserFollowers}>Display followers</MDBBtn> */}

                        {followers.length > 0 && followers.map((followers) => <div key={followers.username}>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Username</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{followers.first_name + followers.last_name}</p>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{followers.followers_username}</p>

                                        </td>


                                        <td>
                                            <MDBBtn color='link' rounded size='sm' onClick={() => Remove(user_orginal.username, followers.followers_username)}>
                                                Remove from Followers
                                            </MDBBtn>
                                        </td>




                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </div>)}
                    </MDBTabsPane>
                    <MDBTabsPane show={fillActive === 'followings'}>
                        <h3>You are followings the followings:</h3>
                        {/* <MDBBtn color='link' rounded size='sm' onClick={getUserFollowing}>Display followings</MDBBtn> */}
                        {followings.length > 0 && followings.map((followings) => <div key={followings.username}>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Username</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{followings.first_name + followings.last_name}</p>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{followings.following_username}</p>

                                        </td>

                                        <td>
                                            <MDBBtn color='link' rounded size='sm' onClick={() => Unfollow(user_orginal.username, followings.following_username)}>
                                                Unfollow
                                            </MDBBtn>
                                        </td>

                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </div>)}

                    </MDBTabsPane>
                    <MDBTabsPane show={fillActive === 'people_to_follow'}>
                        <h3>People to follow:</h3>
                        {/* <MDBBtn color='link' rounded size='sm' onClick={getPotentialFollowings}>Display potential followings</MDBBtn> */}
                        {potential_followings.length > 0 && potential_followings.map((potential_followings) => <div key={potential_followings.username}>

                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Username</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{potential_followings.first_name + " " + potential_followings.last_name}</p>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{potential_followings.username}</p>

                                        </td>

                                        <td>
                                            <MDBBtn color='link' rounded size='sm' onClick={() => Follow(user_orginal.username, potential_followings.username)}>
                                                Follow
                                            </MDBBtn>
                                        </td>

                                    </tr>
                                </MDBTableBody>

                            </MDBTable>
                        </div>)}

                    </MDBTabsPane>



                </MDBTabsContent>


            </div>
        </>
    )
}

export default Followers