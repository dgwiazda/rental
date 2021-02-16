import React from "react";
import { Jumbotron as Jumbo } from "react-bootstrap";
import image from "../images/contentBackground.jpg";
import styled from "styled-components";

const Styles = styled.div`
  .jumbotron {
    margin: 15px 0 0 15px;
    background: url(${image}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 400px;
    width: 98%;
    position: relative;
    z-index: -2;

    h1 {
    }
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

function Content() {
  return (
    <Styles>
      <Jumbo>
        <div className="overlay"></div>
        <h1>Wypożyczalnia sprzętu sportowego</h1>
        <h1>Hehe</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Jumbo>
    </Styles>
  );
}

export default Content;
