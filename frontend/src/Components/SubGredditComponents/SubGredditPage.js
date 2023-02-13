import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'


const SubGredditPage = () => {

    let navigate = useNavigate()

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
                        onClick={() => { navigate('/subgreddit/mysubgreddits') }} >
                        My Sub Greddits
                    </button>
                    <button
                        type="button"
                        className="  p-4 m-2 btn btn-outline-secondary"
                        onClick={() => { navigate('/subgreddit/allsubgreddits') }}>
                        All Sub Greddits
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SubGredditPage