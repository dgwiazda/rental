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

function OrderWspinaczkowy() {
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [date, setDate] = useState(new Date());
  const [itemCount, setItemCount] = useState(1);
  const [daysCount, setDaysCount] = useState(1);
  const itemIdDb = 50;
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let totalPrice = price * daysCount * itemCount;

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);
  useEffect(() => {
    ProductService.getItemPrice(itemIdDb).then(
      (response) => {
        setPrice(response.data);
      }
    );
  }, []);

  const onChange = (date) => {
    setDate(date);
    let diffTime = Math.abs(date[1] - date[0]);
    setDaysCount(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const sendRequest = () => {
    var data = {
      id: 1,
      rentDateFrom: moment(date[0]).format("YYYY-MM-DD HH:mm:ss:SSS"),
      rentDateTo: moment(date[1]).format("YYYY-MM-DD HH:mm:ss:SSS"),
      price: totalPrice,
      userId: currentUser.id,
      productId: itemIdDb,
      quantity: itemCount,
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
                <h1>Zestaw wspinaczkowy</h1>
                <Row>
                  <Col>
                    <Calendar
                      onChange={onChange}
                      value={date}
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
                      <option>1</option>
                      <option>2</option>
                    </Form.Control>
                  </Col>
                  <Col id="price-col">
                    <h2>Cena za {daysCount} dni:</h2>
                    <h3>{price * daysCount * itemCount}zł</h3>
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

export default OrderWspinaczkowy;
