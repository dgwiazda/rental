import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container, Alert, Table } from "react-bootstrap";

import UserService from "../services/user.service";

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
  const { message } = useSelector((state) => state.message);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_USER"));
      console.log(UserService.getUserOrders(currentUser.id));
    }
  }, [currentUser]);

  return (
    <div>
      {access ? (
        <Styles>
          <Container>
            {/* <NavDropdown title="Sortuj" id="basic-nav-dropdown">
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
            <NavDropdown.Item onClick={sortOrdersByUserAsc}>
              użytkownik
            </NavDropdown.Item>
          </NavDropdown> */}
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
                    <td>{order.id}</td>
                    <td>{order.rentDateFrom}</td>
                    <td>{order.rentDateTo}</td>
                    <td>{order.price}zł</td>
                    <td>{order.user}</td>
                    {/* <td>{ordersSetProducts(order.productId, order.quantity)}</td> */}
                    <td>{order.productName}</td>
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
