import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBView,
    MDBContainer, MDBPagination, MDBPageItem, MDBPageNav,
    MDBNavbar,
    MDBIcon, MDBDataTable, MDBFormInline,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBInput, MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert, MDBBtnGroup
} from 'mdbreact';

import './CourseAdd.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from "react-bootstrap";



export default class CourseAdd extends Component {
    constructor(props) {
        super(props);


        this.state = {
            AdminName:'',
            AdminNameValidation: false,
            AdminEmail: '',
            AdminEmailValidation: false,
            AdminPosition: '',
            AdminPositionValidation: false,
            AdminPassword: '',
            AdminPasswordValidation: false,
            AdminCPass: '',
            AdminCPassValidation: false,
            currentPage: 1,
            userPerPage: 2,
            adminList:[],
            selectedId : '',
            selectedName : '',
            selectedEmail : '',
            selectedPosition : '',
            selectedPassword : '',
            selectedConfirm : '',
            edited: false,


        }

        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.submitAdmin = this.submitAdmin.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPass = this.onChangeConfirmPass.bind(this);
        this.editAdmin = this.editAdmin.bind(this);
        this.editAdminUpdate = this.editAdminUpdate.bind(this);

        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

        this.onChangeName2 = this.onChangeName2.bind(this);
        this.onChangeEmail2 = this.onChangeEmail2.bind(this);
        this.onChangePosition2 = this.onChangePosition2.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeConfirmPass2 = this.onChangeConfirmPass2.bind(this);

    }

    componentDidMount() {
        this.getDetails();
        // if(localStorage.getItem("Position") !=="Admin"){
        //     this.props.history.push('/');
        // }
    }

    getDetails(){
        console.log("get Admin Details");
        axios.get(constants.backend_url + 'api/adminDetail/getAlldetail').then(response => {
            console.log(response.data);
            this.setState({adminList:response.data})
            // this.countgender();
        }).catch(function (error) {
            console.log(error);
        })
    }


    onChangeName(e)
    {
        this.setState({
            AdminName: e.target.value,
            AdminNameValidation: false
        });
    }

    onChangeEmail(e)
    {
        this.setState({
            AdminEmail: e.target.value,
            AdminEmailValidation: false
        });

    }

    onChangePosition(e)
    {
        this.setState({
            AdminPosition:  e.target.value,
            AdminPositionValidation: false
        });

    }

    onChangePassword(e)
    {
        this.setState({
            AdminPassword: e.target.value,
            AdminPasswordValidation: false
        });

    }

    onChangeConfirmPass(e)
    {
        this.setState({
            AdminCPass: e.target.value,
            AdminCPassValidation: false
        });

    }



    onChangeName2(e)
    {
        this.setState({
            selectedName: e.target.value,
            AdminNameValidation: false
        });
    }

    onChangeEmail2(e)
    {
        this.setState({
            selectedEmail: e.target.value,
            AdminEmailValidation: false
        });

    }

    onChangePosition2(e)
    {

        this.setState({
            selectedPosition: e.target.value,
            AdminPositionValidation: false
        });


    }

    onChangePassword2(e)
    {
        this.setState({
            selectedPassword: e.target.value,
            AdminPasswordValidation: false
        });

    }

    onChangeConfirmPass2(e)
    {
        this.setState({
            selectedConfirm: e.target.value,
            AdminCPassValidation: false
        });

    }


    firstPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    }

    nextPage(){

        if(this.state.currentPage < Math.ceil(this.state.adminList.length / this.state.userPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage(){

        if(this.state.currentPage < Math.ceil(this.state.adminList.length / this.state.userPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.adminList.length / this.state.userPerPage)
            })
        }

    }

    editAdmin(id, module, lecture, incharge, description, video){
        console.log(id)
        this.setState({
            selectedId:id,
            selectedName : module,
            selectedEmail : lecture,
            selectedPosition : incharge,
            selectedPassword : description,
            selectedConfirm : video,
            edited : true

        })

    };

    editAdmindel(id, module, lecture, incharge, description, video){
        console.log(id)
        this.setState({
            selectedId:id,
            selectedName : module,
            selectedEmail : lecture,
            selectedPosition : incharge,
            selectedPassword : description,
            selectedConfirm : video,
            edited : false

        })

    };

    editAdminUpdate(id, module, lecture, incharge, description, video){
            if(this.state.selectedName !== ''){
                if(this.state.selectedEmail !== ''){
                    if(this.state.selectedPosition !== ''){
                        if(this.state.selectedPassword !== ''){
                            if(this.state.selectedConfirm !== '' ){

                                    axios.get(constants.backend_url + 'api/adminDetail/updateDetail/'+ id+'/'+ module+'/'+ lecture+'/'+ incharge+'/'+ description +'/'+ video).then(response => {
                                        if (response.data.adminUpdate === 'successful') {
                                            Swal.fire(
                                                '',
                                                'Lecture Updated !.',
                                                'success'
                                            )

                                            this.setState({
                                                selectedId:'',
                                                selectedName : '',
                                                selectedEmail : '',
                                                selectedPosition : '',
                                                selectedPassword : '',
                                                selectedConfirm : '',
                                                edited : false})
                                        }else {
                                            Swal.fire(
                                                '',
                                                'Update Failed !',
                                                'error'
                                            )}


                                    });

                            }else{console.log("cpass empty");
                                this.setState({
                                    AdminCPassValidation: true
                                })
                            }
                        }else{console.log("pass empty");
                            this.setState({
                                AdminPasswordValidation: true
                            })
                        }
                    }else{console.log("position empty");
                        this.setState({
                            AdminPositionValidation: true
                        })
                    }
                }else{console.log("Email empty");
                    this.setState({
                        AdminEmailValidation: true
                    })
                }
            }else{console.log("Name empty''");
                this.setState({
                    AdminNameValidation: true
                })
            }






        this.getDetails();
    }

    sweetalertfunction(id){
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
                axios.get(constants.backend_url + 'api/adminDetail/deleteAdmin/'+ id).then(response => {
                    if (response.data.adminDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            '',
                            'Delete Failed !.',
                            'error'
                        )


                    }else {
                        Swal.fire(
                            '',
                            'Lecture Deleted !',
                            'success'
                        )
                        this.setState({
                            AdminName:'',
                            AdminNameValidation: false,
                            AdminEmail: '',
                            AdminEmailValidation: false,
                            AdminPosition: '',
                            AdminPositionValidation: false,
                            AdminPassword: '',
                            AdminPasswordValidation: false,
                            AdminCPass: '',
                            AdminCPassValidation: false,
                            currentPage: 1,
                            userPerPage: 5,
                            adminList:[],
                            selectedId : '',
                            selectedName : '',
                            selectedEmail : '',
                            selectedPosition : '',
                            selectedPassword : '',
                            selectedConfirm : '',
                            edited: false
                        })
                        this.editAdmindel(this.state.selectedId, this.state.selectedName, this.state.selectedEmail, this.state.selectedPosition, this.state.selectedPassword , this.state.selectedConfirm);
                        this.getDetails();
                    }
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Lecture not deleted',
                    'error'
                )
            }
        })
    }




    submitAdmin(event) {
        event.preventDefault();
        // event.target.className += " was-validated";


            if(this.state.AdminName !== ''){
                if(this.state.AdminEmail !== ''){
                    if(this.state.AdminPosition !== ''){
                        if(this.state.AdminPassword !== ''){
                            if(this.state.AdminCPass !== '' ){
                                    console.log("Validation complete");
                                    const newadminDetail = {
                                        Module: this.state.AdminName,
                                        Lecture: this.state.AdminEmail,
                                        Incharge: this.state.AdminPosition,
                                        Description: this.state.AdminPassword,
                                        Video:this.state.AdminCPass

                                    }
                                    console.log("newAdminDetail")
                                    console.log(newadminDetail)
                                    console.log("newAdminDetail")
                                    axios.post(constants.backend_url + 'api/adminDetail/add', newadminDetail)
                                        .then(res => {
                                                console.log(res)
                                                console.log(newadminDetail);
                                                if (res.data.AdminDetail === 'successful') {
                                                    console.log("*************************************************");
                                                    Swal.fire(
                                                        '',
                                                        'Lecture added successfully !.',
                                                        'success'
                                                    );
                                                    this.setState({
                                                        AdminName:'',
                                                        AdminNameValidation: false,
                                                        AdminEmail: '',
                                                        AdminEmailValidation: false,
                                                        AdminPosition: '',
                                                        AdminPositionValidation: false,
                                                        AdminPassword: '',
                                                        AdminPasswordValidation: false,
                                                        AdminCPass: '',
                                                        AdminCPassValidation: false
                                                    })
                                                    this.getDetails();

                                                } else {
                                                    Swal.fire(
                                                        '',
                                                        'Lecture not added !',
                                                        'error'
                                                    )
                                                }
                                            }
                                        );

                            }else{console.log("cpass empty");
                                this.setState({
                                    AdminCPassValidation: true
                                })
                            }
                        }else{console.log("pass empty");
                            this.setState({
                                AdminPasswordValidation: true
                            })
                        }
                    }else{console.log("position empty");
                        this.setState({
                            AdminPositionValidation: true
                        })
                    }
                }else{console.log("Email empty");
                    this.setState({
                        AdminEmailValidation: true
                    })
                }
            }else{console.log("Name empty''");
                this.setState({
                    AdminNameValidation: true
                })
            }
    };




    render() {
        const{adminList, currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentUsers = adminList.slice(firstIndex, lastIndex );
        const totalPages = Math.ceil(adminList.length / userPerPage) ;
        return (
            <div id='parallaxintro'>

                <MDBRow>
                    <MDBCol size="8">
                        <MDBCard>
                            <MDBCardBody>

                                <form>
                                    <MDBTable responsive>
                                        <MDBTableHead color="secondary-color" textWhite>
                                            <tr>
                                                <th>Module</th>
                                                <th>Lecture</th>
                                                <th>Incharge</th>
                                                <th>Description</th>
                                                <th>Video Source</th>
                                                <th>Action</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>

                                            {
                                                currentUsers.length === 0 ?
                                                    <tr >
                                                        <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                                            <MDBAlert color="danger" >
                                                                No Courses Added
                                                            </MDBAlert>
                                                        </td>
                                                    </tr> :
                                                    currentUsers.map(item => {
                                                        return(


                                                            <tr>
                                                                <td>{item.Module}</td>
                                                                <td>{item.Lecture}</td>
                                                                <td>{item.Incharge}</td>
                                                                <td>{item.Description}</td>
                                                                <td>{item.Video}</td>

                                                                <td>
                                                                    <MDBBtn tag="a" size="sm" color="success" onClick={()=>this.editAdmin(item._id, item.Module, item.Lecture, item.Incharge, item.Description, item.Video )} >
                                                                        <MDBIcon size="lg" icon="pen" />
                                                                    </MDBBtn>&nbsp;&nbsp;&nbsp;

                                                                    <MDBBtn tag="a" size="sm" color="danger"  onClick={() => this.sweetalertfunction(item._id)}>
                                                                        <MDBIcon size="lg" icon="times-circle" />
                                                                    </MDBBtn>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })}
                                        </MDBTableBody>
                                    </MDBTable>
                                    <div style={{"float" : "left" , "color" : "#6f42c1"}}> Showing Page {currentPage} of {totalPages} </div>
                                    <div style={{"float" : "right" }}>
                                        <InputGroup>
                                            <InputGroup.Prepend></InputGroup.Prepend>
                                            <MDBBtnGroup>
                                                <MDBBtn color="secondary" size="sm" disabled={currentPage === 1 ? true : false}  onClick={this.firstPage}>First</MDBBtn>
                                                <MDBBtn color="secondary" size="sm" disabled={currentPage === 1 ? true : false} onClick={this.prevPage} >Prev</MDBBtn>
                                            </MDBBtnGroup>

                                            <input type="text" className="pageNumCss" name="currentPage" value={currentPage} onChange={this.changePage} disabled/>
                                            <InputGroup.Append>
                                                <MDBBtnGroup>
                                                    <MDBBtn color="secondary" size="sm" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>Next</MDBBtn>
                                                    <MDBBtn color="secondary" size="sm" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>Last</MDBBtn>
                                                </MDBBtnGroup>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>

                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="4">
                        <MDBCard>
                            <MDBCardBody>

                                {
                                    this.state.edited ?

                                        <form >
                                            <p className="h4 text-center py-1">Course Manage</p>
                                            <label htmlFor="defaultFormCardNameEx1"
                                                   className="grey-text font-weight-light">Module</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                              <i className="fa fa-tasks prefix"></i>
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Module"
                                                    aria-label="Module"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.selectedName}
                                                    onChange={this.onChangeName2}
                                                />
                                                {
                                                    this.state.AdminNameValidation ? <MDBAlert color="danger">
                                                        Module Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx2"
                                                   className="grey-text font-weight-light">Lecture</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="book" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Lecture"
                                                    aria-label="Lecture"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.selectedEmail}
                                                    onChange={this.onChangeEmail2}
                                                />
                                                {
                                                    this.state.AdminEmailValidation ? <MDBAlert color="danger">
                                                        Lecture Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx3"
                                                   className="grey-text font-weight-light">Incharge</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="chalkboard-teacher" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Incharge"
                                                    aria-label="Incharge"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.selectedPosition}
                                                    onChange={this.onChangePosition2}
                                                />
                                                {
                                                    this.state.AdminPositionValidation ? <MDBAlert color="danger">
                                                        Incharge Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx4"
                                                   className="grey-text font-weight-light">Description</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="file" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    aria-label="Description"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.selectedPassword}
                                                    onChange={this.onChangePassword2}
                                                />
                                                {
                                                    this.state.AdminPasswordValidation ? <MDBAlert color="danger">
                                                        Description Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>

                                            <label htmlFor="defaultFormCardEmailEx5"
                                                   className="grey-text font-weight-light">Video Source</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <MDBIcon fab icon="youtube" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Video Source"
                                                    aria-label="VideoSource"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.selectedConfirm}
                                                    onChange={this.onChangeConfirmPass2}
                                                />
                                                {
                                                    this.state.AdminCPassValidation ?
                                                        <MDBAlert color="danger">
                                                            Video Source Fild Empty
                                                        </MDBAlert> : ''
                                                }
                                            </div>

                                            <div className="text-center py-4 mt-0">
                                                <MDBBtn outline color="success" type="button" onClick={()=>this.editAdminUpdate(this.state.selectedId,this.state.selectedName,this.state.selectedEmail,this.state.selectedPosition,this.state.selectedPassword,this.state.selectedConfirm)}>
                                                    <b>Update Lecture</b>
                                                    <MDBIcon icon="pen" className="ml-2"/>
                                                </MDBBtn>
                                            </div>
                                        </form>
                                        :

                                        <form onSubmit={this.submitAdmin}>
                                            <p className="h4 text-center py-1">Course Manage</p>
                                            <label htmlFor="defaultFormCardNameEx1"
                                                   className="grey-text font-weight-light">Module</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                              <i className="fa fa-tasks prefix"></i>
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Module"
                                                    aria-label="Module"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.AdminName}
                                                    onChange={this.onChangeName}
                                                />
                                                {
                                                    this.state.AdminNameValidation ? <MDBAlert color="danger">
                                                        Module Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx2"
                                                   className="grey-text font-weight-light">Lecture</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                             <MDBIcon icon="book" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Lecture"
                                                    aria-label="Lecture"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.AdminEmail}
                                                    onChange={this.onChangeEmail}
                                                />
                                                {
                                                    this.state.AdminEmailValidation ? <MDBAlert color="danger">
                                                        Lecture Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx3"
                                                   className="grey-text font-weight-light">Incharge</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="chalkboard-teacher" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Incharge"
                                                    aria-label="Incharge"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.AdminPosition}
                                                    onChange={this.onChangePosition}
                                                />

                                                {
                                                    this.state.AdminPositionValidation ? <MDBAlert color="danger">
                                                        Incharge Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>


                                            <label htmlFor="defaultFormCardEmailEx4"
                                                   className="grey-text font-weight-light">Description</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                             <MDBIcon icon="file" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    aria-label="Description"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.AdminPassword}
                                                    onChange={this.onChangePassword}
                                                />
                                                {
                                                    this.state.AdminPasswordValidation ? <MDBAlert color="danger">
                                                        Description Field Empty
                                                    </MDBAlert> : ''
                                                }
                                            </div>

                                            <label htmlFor="defaultFormCardEmailEx5"
                                                   className="grey-text font-weight-light">Video Source</label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                             <MDBIcon fab icon="youtube" />
                                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Video Source"
                                                    aria-label="VideoSource"
                                                    aria-describedby="basic-addon"
                                                    value={this.state.AdminCPass}
                                                    onChange={this.onChangeConfirmPass}
                                                />
                                                {
                                                    this.state.AdminCPassValidation ?
                                                        <MDBAlert color="danger">
                                                            Video Source Fild Emplty
                                                        </MDBAlert> : ''
                                                }
                                            </div>

                                            <div className="text-center py-4 mt-0">
                                                <MDBBtn className="btn btn-outline-purple" type="submit">
                                                    <b>Add Lecture</b>
                                                    <MDBIcon icon="plus" className="ml-2"/>
                                                </MDBBtn>
                                            </div>
                                        </form>
                                }


                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>


            </div>
        );
    }
}
