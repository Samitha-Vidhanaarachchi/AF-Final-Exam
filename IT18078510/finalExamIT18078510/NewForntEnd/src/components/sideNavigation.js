import React from 'react';
import logo from "../assets/logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                {/*<NavLink exact={true} to="/dashboard" activeClassName="activeClass">*/}
                {/*    <MDBListGroupItem>*/}
                {/*        <MDBIcon icon="chart-pie" className="mr-2"/>*/}
                {/*        Dashboard*/}
                {/*    </MDBListGroupItem>*/}
                {/*</NavLink>*/}
                {/*<NavLink to="/profile" activeClassName="activeClass">*/}
                {/*    <MDBListGroupItem>*/}
                {/*        <MDBIcon icon="user" className="mr-2"/>*/}
                {/*        User Profile*/}
                {/*    </MDBListGroupItem>*/}
                {/*</NavLink>*/}

                <NavLink to="/lecture" activeClassName="activeClass" >
                    <MDBListGroupItem >
                        <MDBIcon icon="tasks" className="mr-2"  />
                        Courseweb
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/studentManagement" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user-graduate" className="mr-2" />
                        Student Management
                    </MDBListGroupItem>
                </NavLink>

                <NavLink to="/lectureManagement" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3"/>
                        Course Management
                    </MDBListGroupItem>
                </NavLink>

                <NavLink to="/logout" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="sign-out-alt" className="mr-3"/>
                        LogOut
                    </MDBListGroupItem>
                </NavLink>

            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;
