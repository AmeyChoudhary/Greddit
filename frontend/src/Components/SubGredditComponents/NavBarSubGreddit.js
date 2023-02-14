import React, { useState } from 'react';
// eslint-disable-next-line
import {
  MDBContainer,
  MDBNavbar,
  // eslint-disable-next-line
  MDBNavbarBrand,
  // eslint-disable-next-line
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';
// eslint-disable-next-line

import { useNavigate } from "react-router-dom";



const NavbarModerator = () => {
  const [showNav, setShowNav] = useState(false);

  let navigate = useNavigate();

  const Signout = () => {
    localStorage.removeItem("token");
    navigate("/auth?mode=login");
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand >Greddit</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/profile'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'  href='/subgreddit/' >Users

              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/subgreddit/:subgreddit_name/joining_requests' >Joining Requests

              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/subgreddit/:subgreddit_name/stats' >Stats
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/subgreddit/:subgreddit_name/reported_page' >Reported Page
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/subgreddit/mysubgreddits' >My SubGreddits
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={Signout}>Sign Out</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavbarModerator;