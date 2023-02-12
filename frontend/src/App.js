import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './Components/Authentication';
import FollowersPage from './Components/FollowersPage';
import FollowingPage from './Components/FollowingPage';
import PotentialFollowingPage from './Components/PotentialFollowingPage';
import Profile from "./Components/Profile";
import Protected from './Components/Protected';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route
            path="/profile"
            element={
              <Protected children={<Profile />}></Protected>
            }></Route>
            <Route 
            path="/profile/followers"
            element={
              <Protected children={<FollowersPage />}></Protected>
            }></Route>
            <Route
            path="/profile/followings"
            element={
              <Protected children={<FollowingPage />}></Protected>
            }></Route>
            <Route
            path="/profile/potential_followings"
            element={
              <Protected children={<PotentialFollowingPage />}></Protected>
            }></Route>
          <Route path="/" element={<Authentication />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
