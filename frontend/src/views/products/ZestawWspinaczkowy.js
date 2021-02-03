import React, { useEffect, useState } from 'react'
import ProductService from '../../services/product.service'
import { Carousel, Row, Col, Button, Nav } from 'react-bootstrap'
import image1 from '../../images/zestawWspinaczkowy/zestawWspinaczkowy1.jpg'
import image2 from '../../images/zestawWspinaczkowy/zestawWspinaczkowy2.jpg'
import styled from 'styled-components'

const Styles = styled.div`

    #product {
        background-color: #DDDDDD;
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
    .nav-link {
        color: rgba(255,255,255,.8);
    }
    }

`;

function ZestawWspinaczkowy() {
    const [index, setIndex] = useState(0);
    const itemIdDb = 50;
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

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Styles>
            <div id="product">
                <Row>
                    <Col>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                    src={image1}
                                    alt="First"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src={image2}
                                    alt="Second"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col id="dane">
                        <h1>Zestaw wspinaczkowy</h1>
                        <ul>
                            <h3>W zestawie</h3>
                            <li>buty</li>
                            <li>haki</li>
                            <li>liny</li>
                            <li>rękawice</li>
                        </ul>
                        <h2>Cena:</h2>
                        <p>{price}zł/dzień</p>
                        <Button variant="dark"><Nav.Link href="/order/zestaw-wspinaczkowy">Zamów</Nav.Link></Button>
                    </Col>
                </Row>
            </div>
        </Styles>
    );
}

export default ZestawWspinaczkowy;
