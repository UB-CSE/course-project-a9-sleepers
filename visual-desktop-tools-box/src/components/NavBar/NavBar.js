import React, { useState, useEffect,Fragment } from 'react';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Nav,NavDropdown,NavItem} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import './NavBar.css';
import weather from 'weather-js'
// import { dark } from '@material-ui/core/styles/createPalette';
// import { ThemeProvider, createGlobalStyle } from 'styled-components';
// import storage from 'local-storage-fallback'
// import { Global } from '@emotion/core';
import GlobalStyle from '../Widgets/Settings/ToggleDark'
import Clock from '../Widgets/Clock-NavBar/Clock'
import Logout from '../Logout/Logout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const componentOptions = [
  { value: '/', label: 'Home' },
  { value: '/ToDoList', label: 'To-Do List' },
  { value: '/Calculator', label: 'Calculator' },
  { value: '/Notepad', label: 'Notepad' },
  { value: '/Calendar', label: 'Calendar' },
  { value: '/Countdown', label: 'Countdown' },
  { value: '/Stopwatch', label: 'Stopwatch' },
  { value: '/Stocks', label: 'Stocks' },
  { value: '/News', label: 'News' },
  { value: '/Timezone', label: 'Timezone' },
  { value: '/UnitConverter', label: 'Unit Converter' },
  { value: '/WPMTest', label: 'WPM Test' },
];


function  NavBar (props){


  const [temp,setTemp] = useState('');

  // weather.find({degreeType: 'F',search: ''}, function(err, result) {
  //   if(err) console.log(err);
  //   //console.log(result[0].current.feelslike)
  
  //   var x = result[0].current.temperature
  //   setTemp(x)
  //   //console.log(x)
  // });
  
  //console.log(temp)


  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedCompOption, setSelectedCompOption] = useState('');

  const {isAuthenticated,user } =  props.auth;


  // const {username} = user;
  
  const authLinks = (
    <Fragment>
      <NavItem className="px-3 " style={{marginTop:"0.4em"} }>
        <strong className="fontSize4" >{user?`Welcome, ${user.username}`: '' }</strong>
      </NavItem>
      <Nav.Item>
         <Logout/>
       </Nav.Item>
    </Fragment>
  )
  // {user?`Welcome, ${user.username}`: '' }
  const guestLinks = (
    <Fragment>
      <Nav.Link  as={NavLink} to= '/Login' className={"px-3"}>
         <h4 className={"fontSize4"}>Login / Sign Up</h4>
      </Nav.Link>
    </Fragment>
  )
  
  const selectStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menu: provided => ({ ...provided, zIndex: "9999 !important" })
  };

    return(
      <div>

      <style type="text/css">
        {`
          .mr-auto h3{
            font-size: .85em;
            margin: .5em;
          }
        `}
      </style>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
         <Navbar.Brand as={NavLink} to= '/' className={"px-3"}>
           <h4 className={"fontSize4"}>Home</h4>
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Tools" className={"px-3 h3"} id="collasible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to= '/ToDoList'>
                   <h3 className={"fontSize3"}>To-Do List</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Calculator'>
                  < h3 className={"fontSize3"}>Calculator</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Countdown'>
                  < h3 className={"fontSize3"}>Countdown</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Stopwatch'>
                  < h3 className={"fontSize3"}>Stopwatch</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Notepad'>
                  <h3 className={"fontSize3"}>Notepad</h3>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <h3 className={"fontSize3"} onClick={handleShow}>Clock</h3>
                    <Modal show={show} centered size="lg" onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Time</Modal.Title>
                      </Modal.Header>
                      <Clock/>
                    </Modal>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Calendar'>
                  <h3 className={"fontSize3"}>Calendar</h3>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item as={NavLink} to= '/Stocks'>
                  <h3 className={"fontSize3"}>Stocks</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/News'>
                  <h3 className={"fontSize3"}>News</h3>
                  </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/UnitConverter'>
                  <h3 className={"fontSize3"}>Unit Converter</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Currency'>
                  <h3 className={"fontSize3"}>Currency</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/Tictac'>
                  <h3 className={"fontSize3"}>Tic-Tac-Toe</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/WPMTest'>
                  <h3 className={"fontSize3"}>WPMTest</h3>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to= '/DrawingBoard'>
                  <h3 className={"fontSize3"}>DrawingBoard</h3>
                </NavDropdown.Item>

               </NavDropdown>
               <div className="searchbar">

              <Select
                styles={selectStyles}
                menuPlacement="auto"
                menuPosition="absolute"
                defaultValue={selectedCompOption}
                onChange={setSelectedCompOption}
                options={componentOptions}/>
              </div>

              <Link className="search" to={selectedCompOption.value}>Search</Link>
              </Nav>

              <Nav>
              <GlobalStyle />
                {isAuthenticated ? authLinks : guestLinks}
              <Nav.Link as={NavLink} to= '/AboutUs' className={"px-3"} >
                 <h4 className={"fontSize4"}>About us</h4>
              </Nav.Link>
              </Nav>
           </Navbar.Collapse>
         </Navbar>

      </div>
    );

}


NavBar.propTypes = {
  auth: PropTypes.object.isRequired

}

const mapStateToProps = state  =>({
  auth: state.auth
});

export default connect(mapStateToProps,null)(NavBar);