import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="grey" className="text-center font-small darken-2">


            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: JavaTech.com
            </p>
        </MDBFooter>
    );
}

export default Footer;
