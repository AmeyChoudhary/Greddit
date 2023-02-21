import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NavbarModerator from './NavBarSubGreddit'
import Navbar from '../Navbar'
import jwt from 'jwt-decode'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const SubGredditPage = () => {

    let navigate = useNavigate()
    let params = useParams();
    const [subGreddit, setSubGreddit] = useState([])
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState("")
    const [user, setUser] = useState([])

    useEffect(() => {

        const Fetchdata = async () => {

            let token = localStorage.getItem("token");
            let subgreddit_name = params.subgreddit_name;
            getSubGreddit(subgreddit_name);
            getPosts(subgreddit_name);
            if (token) {
                let decoded_user = await jwt(token)
                let username = decoded_user.username;
                setUser(decoded_user)

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
                console.log(data.status);
                setStatus(data.status)
                console.log(status)

            }
            else {
                navigate("/auth?mode=login")
            }
        }
        Fetchdata();
        // is said to disble the warning of react hook dependency missing
        // eslint-disable-next-line
    }, []);

    const getSubGreddit = async (subgreddit_name) => {
        let respone = await fetch(`http://localhost:4000/subgreddit/info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "subgreddit_name": subgreddit_name
            }),
        });
        let data = await respone.json();
        setSubGreddit(data);
    }

    const getPosts = async (subgreddit_name) => {
        let respone = await fetch(`http://localhost:4000/posts/getposts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "subgreddit_name": subgreddit_name
            }),
        });
        let data = await respone.json();
        setPosts(data);
    }

    const CreatePost = async () => {
        // e.preventDefault();
        let subgreddit_name = params.subgreddit_name;
        navigate(`/subgreddit/${subgreddit_name}/createpost`)
    }

    const LeaveSubGreddit = async () => {
        let subgreddit_name = params.subgreddit_name;
        let response = await fetch(`http://localhost:4000/subgreddit/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": user.username,
                "subgreddit_name": subgreddit_name
            }),
        });
        let data = await response.json();
        console.log(data);
        setStatus("normal_user")
        
    }

    const JoinSubGreddit = async () => {
        let subgreddit_name = params.subgreddit_name;

        let response = await fetch(`http://localhost:4000/subgreddit/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "subgreddit_name": subgreddit_name
            }),
        });
        let data = await response.json();
        if (data.error) { }
        else {
            setStatus("requested")
        }

    }

    const ReportPost = async (post_id) => {

        let subgreddit_name = params.subgreddit_name;

        navigate(`/subgreddit/${subgreddit_name}/reportpost/${post_id}`)
    }
// /moderator
    return (
        <>
            {status === "moderator" && subGreddit[0] && 
                <>
                    <NavbarModerator></NavbarModerator>

                    <center>

                        <h1 >
                            {subGreddit[0].name}</h1>

                        <p>{subGreddit[0].description}</p>


                    </center>


                    <MDBContainer className="py-5 h-100 " >

                        <div className="d-flex justify-content-evenly align-items-center h-100">
                            {posts.map((post) =>
                                <div key={post._id}>

                                    <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
                                        <MDBCardHeader className="text-center">
                                            <MDBCardTitle>{post.title} </MDBCardTitle>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBCardText>
                                                {post.content}
                                            </MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {post.upvotes} Upvotes
                                                </MDBCol>
                                                <MDBCol>
                                                    {post.downvotes} Downvotes
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow>
                                                <MDBBtn onClick={() => ReportPost(post._id) } >Report</MDBBtn>
                                            </MDBRow>

                                        </MDBCardBody>
                                        <MDBCardFooter className="text-center">
                                            <MDBCardText>{post.posted_by.username}</MDBCardText>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </div>
                            )}
                        </div>

                    </MDBContainer>

                    <center>
                        <MDBBtn onClick={CreatePost}>Create Post</MDBBtn>
                    </center>

                </>
            }

            {status === "member" && subGreddit[0] &&
                <>
                    <Navbar></Navbar>
                    <center>

                        <h1 >
                            {subGreddit[0].name}</h1>

                        <p>{subGreddit[0].description}</p>


                    </center>

                    <MDBContainer className="py-5 h-100 " >

                        <div className="d-flex justify-content-evenly align-items-evenly h-100">
                            {posts.map((post) =>
                                <div key={post._id}>

                                    <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
                                        <MDBCardHeader className="text-center">
                                            <MDBCardTitle>{post.title} </MDBCardTitle>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBCardText>
                                                {post.content}
                                            </MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {post.upvotes} Upvotes
                                                </MDBCol>
                                                <MDBCol>
                                                    {post.downvotes} Downvotes
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBBtn onClick={() => ReportPost(post._id) } >Report</MDBBtn>
                                            </MDBRow>

                                        </MDBCardBody>
                                        <MDBCardFooter className="text-center">
                                            <MDBCardText>{post.posted_by.username} </MDBCardText>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </div>
                            )}
                        </div>

                    </MDBContainer>
                    <center>
                        <MDBBtn onClick={CreatePost}>Create Post</MDBBtn>
                    </center>
                    {/* leave button */}
                    <right>
                        <MDBBtn onClick={LeaveSubGreddit}>Leave Sub Greddit</MDBBtn>
                    </right>

                </>
            }
            {status === "blocked" && subGreddit[0] &&
                <>
                    <Navbar></Navbar>
                    <center>
                        <h1>You can't view the contents of this sub greddit as you are blocked by the moderator</h1>
                    </center>
                </>
            }
            {status === "requested" && subGreddit[0] &&
                <>
                    <Navbar></Navbar>
                    <center>

                        <h1 >
                            {subGreddit[0].name}</h1>

                        <p>{subGreddit[0].description}</p>


                    </center>

                    <MDBContainer className="py-5 h-100 " >

                        <div className="d-flex justify-content-evenly align-items-evenly h-100">
                            {posts.map((post) =>
                                <div key={post._id}>

                                    <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
                                        <MDBCardHeader className="text-center">
                                            <MDBCardTitle>{post.title} </MDBCardTitle>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBCardText>
                                                {post.content}
                                            </MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {post.upvotes} Upvotes
                                                </MDBCol>
                                                <MDBCol>
                                                    {post.downvotes} Downvotes
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBCardBody>
                                        <MDBCardFooter className="text-center">
                                            <MDBCardText>{post.posted_by.username}</MDBCardText>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </div>
                            )}
                        </div>

                    </MDBContainer>

                    <center>
                        <h3> Request is Pending. Please wait</h3>
                    </center>

                    {/* Make button saying request is pending */}

                </>
            }
            {status === "normal_user" && subGreddit[0] &&
                <>
                    <Navbar></Navbar>
                    <center>

                        <h1 >
                            {subGreddit[0].name}</h1>

                        <p>{subGreddit[0].description}</p>


                    </center>

                    <MDBContainer className="py-5 h-100 " >

                        <div className="d-flex justify-content-evenly align-items-evenly h-100">
                            {posts.map((post) =>
                                <div key={post._id}>

                                    <MDBCard className="shadow-0" style={{ maxWidth: '22rem' }}>
                                        <MDBCardHeader className="text-center">
                                            <MDBCardTitle>{post.title} </MDBCardTitle>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBCardText>
                                                {post.content}
                                            </MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {post.upvotes} Upvotes
                                                </MDBCol>
                                                <MDBCol>
                                                    {post.downvotes} Downvotes
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBCardBody>
                                        <MDBCardFooter className="text-center">
                                            <MDBCardText>{post.posted_by.username}</MDBCardText>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </div>
                            )}
                        </div>

                    </MDBContainer>

                    <center>
                        <MDBBtn onClick={JoinSubGreddit}>Request to Join this Sub Greddit</MDBBtn>
                    </center>

                    {/* Make follow button */}
                </>


            }
        </>
    )
}

export default SubGredditPage