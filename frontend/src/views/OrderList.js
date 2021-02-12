import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container, Alert, Table, NavDropdown, Button } from "react-bootstrap";

import UserService from "../services/user.service";

import { messageDeleteOrder } from "../actions/user";

import moment from "moment";

const Styles = styled.div`
  .container {
    margin-top: 76px;

    #access-denied {
      margin: 150px;
    }
    .btn-group {
      display: flex;
      padding-top: 15px;
      margin-bottom: 15px;
    }
    .dropdown {
      a {
        float: right;
        color: rgba(0, 0, 0, 0.7);
      }

      .dropdown-menu {
        a:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    #cancel {
      float: right;
    }

    #secondary-buttons {
      width: 300px;
      float: right;
    }
  }
`;

function OrderList() {
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [productsSort, setProductsSort] = useState(0);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const today = new Date();

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
      UserService.getUserOrders(currentUser.id).then((response) => {
        setOrders(response.data);
        setProductsSort(0);
      });
    }
  }, [currentUser]);

  const sortOrdersByRentDateFromAsc = () => {
    UserService.sortUserOrdersByRentDateFromAsc(currentUser.id).then(
      (response) => {
        setOrders(response.data);
        setProductsSort(1);
      }
    );
  };
  const sortOrdersByRentDateFromDesc = () => {
    UserService.sortUserOrdersByRentDateFromDesc(currentUser.id).then(
      (response) => {
        setOrders(response.data);
        setProductsSort(2);
      }
    );
  };
  const sortOrdersByPriceAsc = () => {
    UserService.sortUserOrdersByPriceAsc(currentUser.id).then((response) => {
      setOrders(response.data);
      setProductsSort(3);
    });
  };
  const sortOrdersByPriceDesc = () => {
    UserService.sortUserOrdersByPriceDesc(currentUser.id).then((response) => {
      setOrders(response.data);
      setProductsSort(4);
    });
  };
  const sortOrdersByProductAsc = () => {
    UserService.sortUserOrdersByProductAsc(currentUser.id).then((response) => {
      setOrders(response.data);
      setProductsSort(5);
    });
  };

  const deleteOrder = async (id) => {
    await dispatch(messageDeleteOrder(id)).then(() => {
      alert(message);
    });
    if (productsSort === 0) {
      UserService.getUserOrders(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
    if (productsSort === 1) {
      UserService.sortOrdersByRentDateFromAsc(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
    if (productsSort === 2) {
      UserService.sortOrdersByRentDateFromDesc(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
    if (productsSort === 3) {
      UserService.sortOrdersByPriceAsc(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
    if (productsSort === 4) {
      UserService.sortOrdersByPriceDesc(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
    if (productsSort === 5) {
      UserService.sortOrdersByProductAsc(currentUser.id).then((response) => {
        setOrders(response.data);
      });
    }
  };

  return (
    <div>
      {access ? (
        <Styles>
          <Container>
            <NavDropdown title="Sortuj" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={sortOrdersByRentDateFromAsc}>
                najbliższe
              </NavDropdown.Item>
              <NavDropdown.Item onClick={sortOrdersByRentDateFromDesc}>
                najdalsze
              </NavDropdown.Item>
              <NavDropdown.Item onClick={sortOrdersByPriceDesc}>
                najdroższe
              </NavDropdown.Item>
              <NavDropdown.Item onClick={sortOrdersByPriceAsc}>
                najtańsze
              </NavDropdown.Item>
              <NavDropdown.Item onClick={sortOrdersByProductAsc}>
                produkt
              </NavDropdown.Item>
            </NavDropdown>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produkt</th>
                  <th>Cena</th>
                  <th>Ilość</th>
                  <th>Od</th>
                  <th>Do</th>
                  <th>Anuluj</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.userOrderId}</td>
                    <td>{order.product}</td>
                    <td>{order.price}zł</td>
                    <td>{order.quantity}</td>
                    <td>{order.rentDateFrom}</td>
                    <td>{order.rentDateTo}</td>
                    {order.rentDateFrom >
                    moment(today).format("YYYY-MM-DD HH:mm:ss:SSS") ? (
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteOrder(order.id)}
                        >
                          X
                        </Button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Styles>
      ) : (
        <Styles>
          <Container>
            <Alert id="access-denied" variant="danger">
              Musisz być zalogowany, by móc zobaczyć swoje zamówienia!
            </Alert>
          </Container>
        </Styles>
      )}
    </div>
  );
}
export default OrderList;
