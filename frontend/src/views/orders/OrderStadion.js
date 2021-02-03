import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Calendar from "react-calendar";

import styled from "styled-components";
import { Container, Button, Row, Col, Form, Alert } from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

import ProductService from "../../services/product.service";

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
`;

function OrderStadion() {
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("8:00");
  const itemIdDb = 30;
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let totalPrice = price;

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);
  useEffect(() => {
    ProductService.getItemPrice(itemIdDb).then((response) => {
      setPrice(response.data);
    });
  }, []);

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
      date.toString().slice(0, 16) +
      time +
      ":00" +
      date.toString().slice(24, -1);
    date1 =
      date.toString().slice(0, 16) + t + ":00" + date.toString().slice(24, -1);
    var data = {
      id: 1,
      rentDateFrom: moment(date0).format("YYYY-MM-DD HH:mm:ss:SSS"),
      rentDateTo: moment(date1).format("YYYY-MM-DD HH:mm:ss:SSS"),
      price: totalPrice,
      userId: currentUser.id,
      productId: itemIdDb,
      quantity: 1,
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
                <h1>Stadion ul. Brochowska 54</h1>
                <Row>
                  <Col>
                    <Calendar
                      onChange={(e) => setDate(e)}
                      value={date}
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
                      <option>8:00</option>
                      <option>10:00</option>
                      <option>12:00</option>
                      <option>14:00</option>
                      <option>16:00</option>
                      <option>18:00</option>
                      <option>20:00</option>
                    </Form.Control>
                  </Col>
                  <Col id="price-col">
                    <h2>Cena za 2 godziny:</h2>
                    <h3>{price}zł</h3>
                  </Col>
                </Row>
                <Button id="submitButton" type="submit" onClick={sendRequest}>
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
