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
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



const NavbarModerator = () => {

  const [subgreddit_name, setSubgredditName] = useState("")

  const params = useParams();
  useEffect (() => {
    let subgreddit_name = params.subgreddit_name;
    setSubgredditName(subgreddit_name);
    // eslint-disable-next-line
  }, [])

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
              <MDBNavbarLink active aria-current='page'  href= {'/subgreddit/' + subgreddit_name + '/user_list' }>Users Lists

              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'  href= {'/subgreddit/' + subgreddit_name + '/joining_requests' } >Joining Requests
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'  href= {'/subgreddit/' + subgreddit_name + '/stats' } >Stats
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'  href= {'/subgreddit/' + subgreddit_name + '/reported' } >Reported Page
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/savedposts' >My Saved Posts
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