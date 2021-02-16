import React from "react";
import { Container, Accordion, Card, Button, Nav } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    background-color: #dddddd;
    box-shadow: 5px 5px 10px -1px #848484;
    width: 250px;
    min-height: 400px;
    margin-left: 15px;
    margin-top: 15px;
    display: block;
    border-radius: 5px;
  }

  .accordion {
    padding-bottom: 10px;
  }

  .card {
    border: none;
  }

  .card-header {
    background-color: #dddddd;
    border: none;
    padding: 5px;
    .btn {
      font-weight: bold;
      border: none;
    }
  }

  .card-body {
    background-color: #dddddd;
    padding: 0 0 5px 40px;
  }
`;

function Categories() {
  return (
    <Styles>
      <Container>
        <h2>Kategorie:</h2>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="none" eventKey="0">
                Sporty zimowe
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Nav.Link href="/products/zestaw-do-nart">
                  Zestaw do nart
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Nav.Link href="/products/zestaw-snowboardowy">
                  Zestaw snowboardowy
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Nav.Link href="/products/zestaw-do-hokeja">
                  Zestaw do hokeja
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="none" eventKey="1">
                Sztuki walki
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Nav.Link href="/products/worek-treningowy">
                  Worki treningowe
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Nav.Link href="/products/mata">Maty</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="none" eventKey="2">
                Rehabilitacja
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Nav.Link href="/products/rower-stacjonarny">
                  Rower stacjonarny
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Nav.Link href="/products/bieznia">Bieżnia</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Nav.Link href="/products/szyna-cmp">Szyna CMP</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="none" eventKey="3">
                Boiska/Hale
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Nav.Link href="/products/orlik">Orliki</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Nav.Link href="/products/hala">Hale</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Nav.Link href="/products/stadion">Stadion</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="none" eventKey="4">
                Inne
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Nav.Link href="/products/kajak">Kajaki</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Nav.Link href="/products/spadochron">Spadochrony</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Nav.Link href="/products/rower">Rowery</Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Nav.Link href="/products/zestaw-wspinaczkowy">
                  Zestaw wspinaczkowy
                </Nav.Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </Styles>
  );
}

export default Categories;
