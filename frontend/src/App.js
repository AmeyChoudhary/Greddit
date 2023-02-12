import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './Components/Authentication';
import Followers from './Components/Followers';
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
            }

          />
          <Route 
            path="/followers_following"
            element={
              <Protected children={<Followers />}></Protected>
            }></Route>
          <Route path="/" element={<Authentication />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
