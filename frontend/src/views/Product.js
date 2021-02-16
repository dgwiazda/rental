import React, { useState, useEffect } from "react";
import { Carousel, Row, Col, Button, Nav } from "react-bootstrap";
import bieznia1 from "../images/bieznia/bieznia1.jpg";
import bieznia2 from "../images/bieznia/bieznia2.jpg";
import hala1 from "../images/hala/hala1.jpg";
import kajak1 from "../images/kajak/kajak1.jpg";
import mata1 from "../images/mata/mata1.jpg";
import orlik1 from "../images/orlik/orlik1.jpg";
import rower1 from "../images/rower/rower1.jpg";
import rower2 from "../images/rower/rower2.jpg";
import rower3 from "../images/rower/rower3.jpg";
import rowerStacjonarny1 from "../images/rowerStacjonarny/rowerStacjonarny1.jpg";
import rowerStacjonarny2 from "../images/rowerStacjonarny/rowerStacjonarny2.jpg";
import rowerStacjonarny3 from "../images/rowerStacjonarny/rowerStacjonarny3.jpg";
import spadochron1 from "../images/spadochron/spadochron1.jpg";
import stadion1 from "../images/boisko/boisko1.jpg";
import szyna1 from "../images/szyna/szyna2.jpg";
import worek1 from "../images/worek/worek1.jpg";
import worek2 from "../images/worek/worek2.jpg";
import hokej1 from "../images/hokej/hokej1.jpg";
import hokej2 from "../images/hokej/hokej2.jpg";
import narty1 from "../images/narty/narty1.jpg";
import narty2 from "../images/narty/narty2.jpg";
import narty3 from "../images/narty/narty3.jpg";
import snowboard1 from "../images/snowboard/snowboard1.jpg";
import snowboard2 from "../images/snowboard/snowboard2.jpg";
import wspinaczkowy1 from "../images/zestawWspinaczkowy/zestawWspinaczkowy1.jpg";
import wspinaczkowy2 from "../images/zestawWspinaczkowy/zestawWspinaczkowy2.jpg";
import styled from "styled-components";
import ProductService from "../services/product.service";

const Styles = styled.div`
  #product {
    background-color: #dddddd;
    width: 99%;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px -1px #848484;
  }

  .carousel {
    width: 100%;
    height: 400px;
    a {
      height: 380px;
      top: 10px;
    }
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
  }

  .product-description {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.8);
  }
`;

function Product(props) {
  const [price, setPrice] = useState(0);
  const [index, setIndex] = useState(0);
  const images = [
    bieznia1,
    bieznia2,
    hala1,
    kajak1,
    mata1,
    orlik1,
    rower1,
    rower2,
    rower3,
    rowerStacjonarny1,
    rowerStacjonarny2,
    rowerStacjonarny3,
    spadochron1,
    stadion1,
    szyna1,
    worek1,
    worek2,
    hokej1,
    hokej2,
    narty1,
    narty2,
    narty3,
    snowboard1,
    snowboard2,
    wspinaczkowy1,
    wspinaczkowy2,
  ];

  useEffect(() => {
    ProductService.getItemPrice(props.itemIdDb).then((response) => {
      setPrice(response.data);
    }, []);
    console.log(props.imageId.length);
  });

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Styles>
      <div id="product">
        <Row>
          <Col>
            {props.imageId.length === 1 ? (
              <img src={images[props.imageId[0]]} alt="First" />
            ) : (
              ""
            )}
            {props.imageId.length === 2 ? (
              <div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img src={images[props.imageId[0]]} alt="First" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={images[props.imageId[1]]} alt="Second" />
                  </Carousel.Item>
                </Carousel>
              </div>
            ) : (
              ""
            )}
            {props.imageId.length === 3 ? (
              <div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img src={images[props.imageId[0]]} alt="First" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={images[props.imageId[1]]} alt="Second" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={images[props.imageId[2]]} alt="Thrid" />
                  </Carousel.Item>
                </Carousel>
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col id="dane">
            <h1>{props.title}</h1>
            {props.description}
            <h2>Cena:</h2>
            <p>
              {price}
              {props.pricePer}
            </p>
            <Button variant="dark">
              <Nav.Link href={"/order/" + props.link}>Zamów</Nav.Link>
            </Button>
          </Col>
        </Row>
      </div>
    </Styles>
  );
}

export default Product;
