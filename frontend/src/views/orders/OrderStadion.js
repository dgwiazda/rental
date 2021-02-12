import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Calendar from "react-calendar";

import styled from "styled-components";
import { Container, Button, Row, Col, Form, Alert } from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

import ProductService from "../../services/product.service";
import OrderService from "../../services/order.service";

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

    #price-col {
      width: 300px;
    }
  }
  .select-disabled {
    background-color: rgba(0,0,0,0.1);
  }
`;

function OrderStadion() {
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [myDate, setMyDate] = useState(new Date());
  const [time, setTime] = useState("8:00");
  const availiableQuantityMax = 1;
  const [availiableQuantity, setAvailiableQuantity] = useState(
    availiableQuantityMax
  );
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [busyProducts, setBusyProducts] = useState([]);
  const [busyProductCount, setBusyProductCount] = useState(0);
  const [itemIdDb, setItemIdDb] = useState(30);
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let totalPrice = price;
  const [disabledOptions, setDisabledOptions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
    }
    ProductService.getItemPrice(itemIdDb).then((response) => {
      setPrice(response.data);
    });
    OrderService.getBoiskoAvailiable(itemIdDb).then((response) => {
      response.data ? setAvailiableQuantity(1) : setAvailiableQuantity(0);
    });
  }, [currentUser, itemIdDb]);

  useEffect(() => {
    if (availiableQuantity) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [availiableQuantity]);

  useEffect(() => {
    var date = myDate.toString().slice(0, 16);
    OrderService.getBoiskoHoursDiasble(
      itemIdDb,
      moment(date).format("YYYY-MM-DD")
    ).then((response) => {
      setBusyProducts(response.data);
    });
  }, [myDate]);

  useEffect(() => {
    var arr = [];
    setBusyProductCount(busyProducts.length);
    if (busyProducts.includes(8)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(10)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(12)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(14)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(16)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(18)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (busyProducts.includes(20)) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    setDisabledOptions(arr);
  }, [busyProducts]);

  useEffect(() => {
    busyProductCount === disabledOptions.length
      ? setBtnDisabled(true)
      : setBtnDisabled(false);
  }, [busyProductCount]);

  const sendRequest = () => {
    var t;
    if (time === "8:00") {
      t = "10:00";
    }
    if (time === "10:00") {
      t = "12:00";
    }
    if (time === "12:00") {
      t = "14:00";
    }
    if (time === "14:00") {
      t = "16:00";
    }
    if (time === "16:00") {
      t = "18:00";
    }
    if (time === "18:00") {
      t = "20:00";
    }
    if (time === "20:00") {
      t = "22:00";
    }
    var date0, date1;
    date0 =
      myDate.toString().slice(0, 16) +
      time +
      ":00" +
      myDate.toString().slice(24, -1);
    date1 =
      myDate.toString().slice(0, 16) +
      t +
      ":00" +
      myDate.toString().slice(24, -1);
    var data = {
      id: 1,
      rentDateFrom: moment(date0).format("YYYY-MM-DD HH:mm:ss:SSS"),
      rentDateTo: moment(date1).format("YYYY-MM-DD HH:mm:ss:SSS"),
      price: totalPrice,
      userId: currentUser.id,
      productId: itemIdDb,
      quantity: 1,
      disabledProducts: busyProducts,
      productsCount: availiableQuantityMax,
    };
    dispatch(messageAddOrder(data));
    setSuccess(true);
  };
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
                  Stadion ul. Brochowska 54
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
                    <Calendar
                      onChange={(date) => {
                        setMyDate(date);
                      }}
                      value={myDate}
                      minDate={new Date()}
                    />
                  </Col>
                  <Col>
                    <h2>Godzina:</h2>
                    <Form.Control
                      size="sm"
                      as="select"
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option
                        disabled={disabledOptions[0]}
                        className={disabledOptions[0] ? "select-disabled" : ""}
                      >
                        8:00
                      </option>
                      <option
                        disabled={disabledOptions[1]}
                        className={disabledOptions[1] ? "select-disabled" : ""}
                      >
                        10:00
                      </option>
                      <option
                        disabled={disabledOptions[2]}
                        className={disabledOptions[2] ? "select-disabled" : ""}
                      >
                        12:00
                      </option>
                      <option
                        disabled={disabledOptions[3]}
                        className={disabledOptions[3] ? "select-disabled" : ""}
                      >
                        14:00
                      </option>
                      <option
                        disabled={disabledOptions[4]}
                        className={disabledOptions[4] ? "select-disabled" : ""}
                      >
                        16:00
                      </option>
                      <option
                        disabled={disabledOptions[5]}
                        className={disabledOptions[5] ? "select-disabled" : ""}
                      >
                        18:00
                      </option>
                      <option
                        disabled={disabledOptions[6]}
                        className={disabledOptions[6] ? "select-disabled" : ""}
                      >
                        20:00
                      </option>
                    </Form.Control>
                  </Col>
                  <Col id="price-col">
                    <h2>Cena za 2 godziny:</h2>
                    <h3>{totalPrice}zł</h3>
                  </Col>
                </Row>
                <Button
                  id="submitButton"
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

export default OrderStadion;
