import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBView,
    MDBContainer,
    MDBBtnGroup,
    MDBIcon, MDBFormInline,
    MDBCard,
    MDBCardBody,
    MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert, MDBPagination, MDBPageItem, MDBPageNav,
} from 'mdbreact';
import './UserManage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from 'react-bootstrap';


export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartitem: '',
            detailList: [],
            currentPage: 1,
            userPerPage: 5,
            empty: false,
            searched: false,
            CustomerName: '',
            foundSearch: false,
            searchList: []


        }

        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.changePage = this.changePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);



    }

    componentDidMount() {
        this.getDetails();

    }

    sweetalertfunction(id) {

        console.log("button clicks");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                axios.get(constants.backend_url + 'api/userDetail/deleteUser/' + id).then(response => {
                    if (response.data.userDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            '',
                            'Delete Failed !.',
                            'error'
                        )
                    } else {
                        Swal.fire(
                            '',
                            'Customer Deleted !',
                            'success'
                        )
                        this.getDetails();
                    }
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Customer details not deleted',
                    'error'
                )
            }
        })
    }


    getDetails() {
        console.log("get user details");
        axios.get(constants.backend_url + 'api/userDetail/getAllusers').then(response => {
            this.setState({detailList: response.data})
        }).catch(function (error) {
            console.log(error);
        })
    }

    changePage(event) {
        this.setState({
            CustomerName: event.target.value,
        });
    }

    firstPage() {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    }

    nextPage() {

        if (this.state.currentPage < Math.ceil(this.state.detailList.length / this.state.userPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage() {

        if (this.state.currentPage < Math.ceil(this.state.detailList.length / this.state.userPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.detailList.length / this.state.userPerPage)
            })
        }

    }

    onChangeName(e) {
        this.setState({
            CustomerName: e.target.value,
        });

        console.log("search user");
        if (e.target.value !== '') {

            axios.get(constants.backend_url + 'api/userDetail/seachUser/' + e.target.value).then(response => {
                if (response.data.message === 'not found') {
                    this.setState({
                        searched: false,
                        // foundSearch: false

                    })

                    console.log("not found");
                } else {

                    this.setState({
                        searchList: response.data,
                        searched: true,
                        // foundSearch: true
                    })
                    console.log(" found");
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            this.setState({
                searched: false,

            })
            this.getDetails();
        }


    }

    render() {
        const {detailList, currentPage, userPerPage, CustomerName} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentUsers = detailList.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(detailList.length / userPerPage);


        return (

            <div id='parallaxintro'>


                <MDBView>
                    <MDBMask className='rgba-white-light'/>
                    <MDBContainer className='d-flex justify-content-center align-items-center'
                                  style={{height: '100%', width: '100%', paddingTop: '0rem'}}>
                        <MDBRow>
                                    <div className=" container-fluid AddItemHeight">
                                        <MDBRow>
                                            <MDBCol size="12">
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <form>
                                                            <MDBTable responsive>
                                                                <MDBTableHead color="secondary-color" textWhite>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Email Address</th>
                                                                        <th>Contact Number</th>
                                                                        <th>Student Number</th>

                                                                        <th>Action</th>
                                                                    </tr>
                                                                </MDBTableHead>

                                                                {
                                                                    currentUsers.length === 0 ?
                                                                        <tr>
                                                                            <td colSpan="12" style={{
                                                                                textAlign: "center",
                                                                                fontWeight: "bold"
                                                                            }}>
                                                                                <MDBAlert color="danger">
                                                                                    No Users Registered
                                                                                </MDBAlert>
                                                                            </td>
                                                                        </tr> :
                                                                        currentUsers.map(item => {

                                                                            return (
                                                                                <MDBTableBody>
                                                                                    <tr>
                                                                                        <td>{item.firstName + "  " + item.lastName}</td>
                                                                                        <td>{item.email}</td>
                                                                                        <td>{item.phoneNumber}</td>
                                                                                        <td>{item.stdNumber}</td>
                                                                                        <td>
                                                                                            <MDBBtn tag="a" size="sm"
                                                                                                    color="danger"
                                                                                                    onClick={() => this.sweetalertfunction(item._id)}>
                                                                                                <MDBIcon size="lg"
                                                                                                         icon="times-circle"/>
                                                                                            </MDBBtn>
                                                                                        </td>
                                                                                    </tr>
                                                                                </MDBTableBody>
                                                                            )
                                                                        })}

                                                            </MDBTable>
                                                            <div style={{"float": "left", "color": "#6f42c1"}}> Showing
                                                                Page {currentPage} of {totalPages} </div>
                                                            <div style={{"float": "right"}}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend></InputGroup.Prepend>
                                                                    <MDBBtnGroup>
                                                                        <MDBBtn color="secondary" size="sm"
                                                                                disabled={currentPage === 1 ? true : false}
                                                                                onClick={this.firstPage}>First</MDBBtn>
                                                                        <MDBBtn color="secondary" size="sm"
                                                                                disabled={currentPage === 1 ? true : false}
                                                                                onClick={this.prevPage}>Prev</MDBBtn>
                                                                    </MDBBtnGroup>
                                                                    <input type="text" className="pageNumCss"
                                                                           name="currentPage" value={currentPage}
                                                                           onChange={this.changePage} disabled/>
                                                                    <InputGroup.Append>
                                                                        <MDBBtnGroup>
                                                                            <MDBBtn color="secondary" size="sm"
                                                                                    disabled={currentPage === totalPages ? true : false}
                                                                                    onClick={this.nextPage}>Next</MDBBtn>
                                                                            <MDBBtn color="secondary" size="sm"
                                                                                    disabled={currentPage === totalPages ? true : false}
                                                                                    onClick={this.lastPage}>Last</MDBBtn>
                                                                        </MDBBtnGroup>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </form>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                        </MDBRow>
                    </MDBContainer>
                </MDBView>
            </div>
        );
    }
}
