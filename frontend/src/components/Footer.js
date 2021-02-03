import React from "react";
import styled from 'styled-components'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const Styles = styled.div`

    footer {
        bottom: 0;
        background-color: #D6D6D6;
        margin-top: 300px;
    }

    #almost-bottom {
        display: flex;
    }

    #authors {
        width: 50%;
        margin-left: 100px;
        margin-top: 20px;
    }

    #links-label {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .links {
        display: flex;
        justify-content: center;
    }

    #total-bottom {
        display: flex;
        background-color: #343a40;
        width: 100%;
        height: 50px;
        color: white;
        justify-content: center;
        align-items: center;    
        
        p {
            margin-bottom: 0px;
        }
    }
`;

function Footer() {
    return (
        <Styles>
            <footer>
                <div id="almost-bottom">
                    <Container id="authors">
                        <h3>Wykonali</h3>
                        <h5>Damian Gwiazda</h5>
                        <h5>Kamil Katusza</h5>
                    </Container>
                    <Container>
                        <Row>
                            <Col id="links-label">
                                <h3>Power of Music</h3>
                            </Col>
                            <Col id="links-label">
                                <h3>Centrum Pomocy</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link1</Nav.Link></h5>
                            </Col>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link1</Nav.Link></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link2</Nav.Link></h5>
                            </Col>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link2</Nav.Link></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link3</Nav.Link></h5>
                            </Col>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link3</Nav.Link></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link4</Nav.Link></h5>
                            </Col>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link4</Nav.Link></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link5</Nav.Link></h5>
                            </Col>
                            <Col className="links">
                                <h5><Nav.Link href="#">Link5</Nav.Link></h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div id="total-bottom">
                    <p>&copy; 2020 Copyright: dgwiazda</p>
                </div>
            </footer>
        </Styles>
    )
}

export default Footer;