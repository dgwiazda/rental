import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'
import image from '../images/jumbotron.jpg'

const Styles = styled.div`
    .jumbotron {
        background: url(${image}) no-repeat fixed bottom;
        background-size: cover;
        color: #efefef;
        height: 200px;
        position: relative;
        z-index: -2;
        border-radius: 0;
        margin-bottom: 0px;
        margin-top: 56px;
    }

    .overlay {
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

function Jumbotron() {
    return (
        <Styles>
        <Jumbo>
            <div className="overlay"></div>
            <Container>
                <h1>Witamy!</h1>
                <p>Uprawiaj sport jaki chcesz, gdzie chcesz i kiedy tylko chcesz.</p>
            </Container>
        </Jumbo>
        </Styles>
    )
}

export default Jumbotron;
