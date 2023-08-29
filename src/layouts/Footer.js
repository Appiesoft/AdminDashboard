// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <footer
            className="footer"
           >
            <div className="container-fluid" >
                <Row>
                    <Col sm={6}>
                        {currentYear} © <a href="https://www.turnsapp.com/">TurnsApp</a>
                    </Col>

                    <Col sm={6}>
                        <div className="text-md-end footer-links">
                            <a href="https://www.turnsapp.com/about/">About</a>
                            <a href="https://www.turnsapp.com/contact">Contact Us</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
