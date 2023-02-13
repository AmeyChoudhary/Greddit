import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './Components/Authentication';
import FollowersPage from './Components/FollowComponents/FollowersPage';
import FollowingPage from './Components/FollowComponents/FollowingPage';
import PotentialFollowingPage from './Components/FollowComponents/PotentialFollowingPage';
import Profile from "./Components/Profile";
import Protected from './Components/Protected';
import SubGredditPage from './Components/SubGredditComponents/SubGredditPage';
import CreateSubGredditPage from './Components/SubGredditComponents/CreateSubGredditPage';
import MySubGredditPage from './Components/SubGredditComponents/MySubGredditPage';
import AllSubGredditPage from './Components/SubGredditComponents/AllSubGredditPage';

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
            <Route 
            path="/subgreddit"
            element={
              <Protected children={<MySubGredditPage />}></Protected>
            }></Route>
            <Route
            path="/subgreddit/create"
            element={
              <Protected children={<CreateSubGredditPage />}></Protected>
            }></Route>
            <Route
            path="/subgreddit/mysubgreddits"
            element={
              <Protected children={< MySubGredditPage />}></Protected>
            }></Route>
            <Route
            path="/subgreddit/allsubgreddits"
            element={
              <Protected children={<AllSubGredditPage />}></Protected>
            }></Route>
            <Route 
            path="/subgreddit/:subgreddit_name"
            element={
              <Protected children={<SubGredditPage />}></Protected>
            }></Route>
            <Route path="/" element={<Authentication />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
