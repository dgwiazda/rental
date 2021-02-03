import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

const Styles = styled.div`

    h1 {
        font-size: 3em;
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }

    .container {
        margin-top: 50px;
    }
`;

function Contact() {
    return (
        <Styles>
            <h1>Masz pytania? Skontaktuj się z nami</h1>
            <Container>
                <Row>
                    <Col className="ml-4">
                        <h2>Telefon:</h2>
                    </Col>
                    <Col className="mr-4">
                        <h2>E-mail:</h2>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <h2>Adres:</h2>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={{ span: 3 }}>
                        <h2>123 456 789</h2>
                    </Col>
                    <Col>
                        <h2>powerofmusic@email.com</h2>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <h2>ul. Sienkiewicza 74a</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ offset: 8 }}>
                        <h2 className="ml-4">04-234 Opoczno</h2>
                    </Col>
                </Row>

            </Container>
        </Styles>

    )
}

export default Contact;