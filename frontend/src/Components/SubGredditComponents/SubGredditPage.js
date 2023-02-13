import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './NavBarSubGreddit'


const SubGredditPage = () => {

    let navigate = useNavigate()

    return (
        <div>
            <Navbar></Navbar>
            
        </div>
    )
}

export default SubGredditPage