import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Calendar from "react-calendar";

import styled from "styled-components";
import { Container, Button, Row, Col, Form, Alert } from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

import ProductService from "../../services/product.service";
import OrderService from "../../services/order.service";

import { clearMessage } from "../../actions/message";

import { messageAddOrder } from "../../actions/order";

import moment from "moment";

const Styles = styled.div`
  .container {
    display: flex;
    margin-top: 80px;
    align-items: center;
    flex-direction: column;

    .if-alert {
      margin: 150px;
    }

    h1 {
      margin-bottom: 40px;
    }

    #submitButton {
      margin-top: 30px;
    }

    .row {
      dispaly: flex;
      align-items: center;

      h2 {
        font-size: large;
      }

      h3 {
        font-size: medium;
      }
    }

    .col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    #type {
      width: 200px;
    }

    #price-col {
      width: 300px;
    }
  }
`;

function OrderRower() {
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [myDate, setMyDate] = useState(new Date());
  const [itemCount, setItemCount] = useState(1);
  const [daysCount, setDaysCount] = useState(1);
  const availiableQuantityMax = 2;
  const [availiableQuantity, setAvailiableQuantity] = useState(
    availiableQuantityMax
  );
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [busyProducts, setBusyProducts] = useState(0);
  const [busyProductCount, setBusyProductCount] = useState(0);
  const [itemIdDb, setItemIdDb] = useState(21);
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const { message } = useSelector((state) => state.message);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState(" - kolażówka");
  const dispatch = useDispatch();
  let totalPrice = price * daysCount * itemCount;

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
    }
    ProductService.getItemPrice(itemIdDb).then((response) => {
      setPrice(response.data);
    });
    OrderService.getRowerKolazowkaUnavailiable().then((response) => {
      var len = response.data.length;
      setAvailiableQuantity(availiableQuantityMax - len);
    });
  }, [currentUser]);

  const getUniqueBusyProductCount = () => {
    if (itemIdDb === 21) {
      OrderService.getRowerKolazowkaBusy(
        moment(myDate[0]).format("YYYY-MM-DD HH:mm:ss:SSS"),
        moment(myDate[1]).format("YYYY-MM-DD HH:mm:ss:SSS")
      ).then((response) => {
        setBusyProducts(response.data);
        setBusyProductCount(response.data.length);
      });
    }
    if (itemIdDb === 23) {
      OrderService.getRowerGorskiBusy(
        moment(myDate[0]).format("YYYY-MM-DD HH:mm:ss:SSS"),
        moment(myDate[1]).format("YYYY-MM-DD HH:mm:ss:SSS")
      ).then((response) => {
        setBusyProducts(response.data);
        setBusyProductCount(response.data.length);
      });
    }
    if (itemIdDb === 25) {
      OrderService.getRowerMiejskiBusy(
        moment(myDate[0]).format("YYYY-MM-DD HH:mm:ss:SSS"),
        moment(myDate[1]).format("YYYY-MM-DD HH:mm:ss:SSS")
      ).then((response) => {
        setBusyProducts(response.data);
        setBusyProductCount(response.data.length);
      });
    }
  };

  useEffect(() => {
    getOptions();
  }, [busyProductCount]);

  const getOptions = () => {
    var optionsTemp = [];
    var orderableCount = availiableQuantity - busyProductCount;
    console.log(orderableCount);
    if (orderableCount) {
      setBtnDisabled(false);
      for (var i = 0; i < orderableCount; i++) {
        optionsTemp.push(i + 1);
      }
    } else {
      setBtnDisabled(true);
    }
    setOptions(optionsTemp);
  };

  const onChange = (date) => {
    setMyDate(date);
    let diffTime = Math.abs(date[1] - date[0]);
    setDaysCount(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    getUniqueBusyProductCount();
  }, [myDate]);

  const onTypeChange = (e) => {
    dispatch(clearMessage());
    if (e.target.value === "kolażówka") {
      setTitle(" - kolażówka");
      OrderService.getRowerKolazowkaUnavailiable().then((response) => {
        var len = response.data.length;
        setAvailiableQuantity(availiableQuantityMax - len);
      });
      setItemIdDb(21);
    }
    if (e.target.value === "górski") {
      setTitle(" - górski");
      OrderService.getRowerGorskiUnavailiable().then((response) => {
        var len = response.data.length;
        setAvailiableQuantity(availiableQuantityMax - len);
      });
      setItemIdDb(23);
      
    }
    if (e.target.value === "miejski") {
      setTitle(" - miejski");
      OrderService.getRowerMiejskiUnavailiable().then((response) => {
        var len = response.data.length;
        setAvailiableQuantity(availiableQuantityMax - len);
      });
      setItemIdDb(25);
    }
  };

  const sendRequest = () => {
    var data = {
      id: 1,
      rentDateFrom: moment(myDate[0]).format("YYYY-MM-DD HH:mm:ss:SSS"),
      rentDateTo: moment(myDate[1]).format("YYYY-MM-DD HH:mm:ss:SSS"),
      price: totalPrice,
      userId: currentUser.id,
      productId: itemIdDb,
      quantity: itemCount,
      disabledProducts: busyProducts,
      productsCount: availiableQuantityMax,
    };
    dispatch(messageAddOrder(data));
    setSuccess(true);
  };

  useEffect(() => {
    if (availiableQuantity) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [availiableQuantity]);

  return (
    <div>
      {access ? (
        <div>
          {success ? (
            <Styles>
              <Container>
                <Alert className="if-alert" variant="success">
                  {message}
                </Alert>
              </Container>
            </Styles>
          ) : (
            <Styles>
              <Container>
                <h1>
                  Rower{title}{" "}
                  {availiableQuantity ? (
                    ""
                  ) : (
                    <span>(aktualnie niedostępny)</span>
                  )}
                </h1>
                {btnDisabled && availiableQuantity ? (
                  <Alert variant="warning">Niedostępny w tym terminie!</Alert>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <h2>Rodzaj:</h2>
                    <Form.Control
                      id="type"
                      size="sm"
                      as="select"
                      onChange={onTypeChange}
                    >
                      <option>kolażówka</option>
                      <option>górski</option>
                      <option>miejski</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Calendar
                      onChange={onChange}
                      value={myDate}
                      minDate={new Date()}
                      selectRange={true}
                      returnValue={"range"}
                    />
                  </Col>
                  <Col>
                    <h2>Ilość sztuk:</h2>
                    <Form.Control
                      size="sm"
                      as="select"
                      onChange={(e) => setItemCount(e.target.value)}
                    >
                      {options.map((option, index) => {
                        return (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col id="price-col">
                    <h2>Cena za {daysCount} dni:</h2>
                    <h3>{totalPrice}zł</h3>
                  </Col>
                </Row>
                <Button
                  id="submitButton"
                  type="submit"
                  onClick={sendRequest}
                  disabled={btnDisabled ? true : false}
                >
                  Zarezerwuj
                </Button>
              </Container>
            </Styles>
          )}
        </div>
      ) : (
        <Styles>
          <Container>
            <Alert className="if-alert" variant="danger">
              Musisz być zalogowany, by dokonać zamówienia!
            </Alert>
          </Container>
        </Styles>
      )}
    </div>
  );
}

export default OrderRower;
