import React, {Component} from "react";
import {
    MDBCard,
    MDBCol,
    MDBRow,
    MDBView,
    MDBMask,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn,
    MDBIcon,
    MDBAlert
} from 'mdbreact';
import src1 from '../../../assets/img-1.jpg';
import 'sweetalert2/src/sweetalert2.scss';
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from "react-bootstrap";

export default class Courses extends Component {
    constructor(props) {
        super(props);


        this.state = {
            lectureList:[]
        }

        this.getDetails = this.getDetails.bind(this);
    }


    componentDidMount() {
        this.getDetails();
        // if(localStorage.getItem("Position") !=="Admin"){
        //     this.props.history.push('/');
        // }
    }
    getDetails(){
        console.log("get Lecture Details");
        axios.get(constants.backend_url + 'api/adminDetail/getAlldetail').then(response => {
            console.log(response.data);
            this.setState({lectureList:response.data})

        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (

            <MDBRow className="justify-content-center">

                {
                    this.state.lectureList.length === 0 ?
                        <tr >
                            <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                <MDBAlert color="danger" >
                                    No Courses Added
                                </MDBAlert>
                            </td>
                        </tr> :

                        this.state.lectureList.map(item => {
                            return(
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                        <MDBCard>
                            <iframe width="223" height="223"
                                    src={item.Video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                            </iframe>
                            <MDBCardBody>
                                <MDBCardTitle className="text-center mb-2 font-bold">{item.Module}</MDBCardTitle>
                                <MDBCardTitle sub
                                              className="text-center indigo-text mb-2 font-bold">{item.Lecture}</MDBCardTitle>
                                <MDBCardText>
                                    <strong className="mb-2">{item.Incharge} : </strong>
                                    {item.Description}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                            )
                        })}

            </MDBRow>

        );
    }
}
