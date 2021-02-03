import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import { Row, Col, Button, Nav } from "react-bootstrap";
import image1 from "../../images/kajak/kajak1.jpg";
import styled from "styled-components";

const Styles = styled.div`
  #product {
    background-color: #dddddd;
    width: 99%;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px -1px #848484;
  }

  img {
    width: 100%;
    height: 400px;
    padding: 10px;
    padding-bottom: 10px;
  }

  #dane {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      display: flex;
      flex-direction: column;
    }
    li {
      font-weight: bold;
      margin-left: 40px;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

function Kajak() {
  const itemIdDb = 5;
  const [price, setPrice] = useState(0);

  useEffect(() => {
    ProductService.getItemPrice(itemIdDb).then(
      (response) => {
        setPrice(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setPrice(_content);
      }
    );
  }, []);
  return (
    <Styles>
      <div id="product">
        <Row>
          <Col>
            <img src={image1} alt="First" />
          </Col>
          <Col id="dane">
            <h1>Kajak</h1>
            <ul>
              <h3>W zestawie:</h3>
              <li>2 wiosła</li>
              <li>2 kapoki</li>
              <li>kajak 2-osobowy</li>
            </ul>
            <h2>Cena:</h2>
            <p>{price}zł/dzień</p>
            <Button variant="dark">
              <Nav.Link href="/order/kajak">Zamów</Nav.Link>
            </Button>
          </Col>
        </Row>
      </div>
    </Styles>
  );
}

export default Kajak;
