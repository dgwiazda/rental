import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";

import AdminService from "../services/admin.service";

import { messageChangeAvailiable } from "../actions/admin";

import styled from "styled-components";
import {
  Container,
  Button,
  Table,
  NavDropdown,
  ButtonGroup,
} from "react-bootstrap";
import { setMessage } from "../actions/message";

const Styles = styled.div`
  .container {
    margin-top: 56px;

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

const BoardAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsSort, setProductsSort] = useState(0);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(0);
  const [access, setAccess] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartLegend, setChartLegend] = useState([]);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setAccess(currentUser.roles.includes("ROLE_ADMIN"));
    }
    getOrders();
  }, [currentUser]);

  const getOrders = async () => {
    await AdminService.getOrders().then((response) => {
      setOrders(response.data);
    });
    setShow(1);
  };
  const ordersSetProducts = (id, count) => {
    var products = "";
    for (var i = 0; i < count; i++) {
      if (i === count - 1) {
        products += id + i;
      } else {
        products += id + i + ", ";
      }
    }
    return products;
  };
  const sortOrdersByRentDateFromAsc = () => {
    AdminService.sortOrdersByRentDateFromAsc().then((response) => {
      setOrders(response.data);
    });
  };
  const sortOrdersByRentDateFromDesc = () => {
    AdminService.sortOrdersByRentDateFromDesc().then((response) => {
      setOrders(response.data);
    });
  };
  const sortOrdersByPriceAsc = () => {
    AdminService.sortOrdersByPriceAsc().then((response) => {
      setOrders(response.data);
    });
  };
  const sortOrdersByPriceDesc = () => {
    AdminService.sortOrdersByPriceDesc().then((response) => {
      setOrders(response.data);
    });
  };
  const sortOrdersByUserAsc = () => {
    AdminService.sortOrdersByUser().then((response) => {
      setOrders(response.data);
    });
  };

  const getProducts = () => {
    AdminService.getProducts().then((response) => {
      setProducts(response.data);
    });
    setProductsSort(0);
    setShow(2);
  };
  const sortProductsByPriceAsc = () => {
    AdminService.sortProductsByPriceAsc().then((response) => {
      setProducts(response.data);
    });
    setProductsSort(1);
  };
  const sortProductsByPriceDesc = () => {
    AdminService.sortProductsByPriceDesc().then((response) => {
      setProducts(response.data);
    });
    setProductsSort(2);
  };
  const sortProductsByIdAsc = () => {
    AdminService.sortProductsByIdAsc().then((response) => {
      setProducts(response.data);
    });
    setProductsSort(3);
  };
  const sortProductsByIdDesc = () => {
    AdminService.sortProductsByIdDesc().then((response) => {
      console.log(response);
      setProducts(response.data);
    });
    setProductsSort(4);
  };
  const changeAvailiable = async (id) => {
    await dispatch(messageChangeAvailiable(id)).then(() => {
      alert("Status dostępności zmieniony!");
    });
    if (productsSort === 0) {
      AdminService.getProducts().then((response) => {
        setProducts(response.data);
      });
    }
    if (productsSort === 1) {
      AdminService.sortProductsByPriceAsc().then((response) => {
        setProducts(response.data);
      });
    }
    if (productsSort === 2) {
      AdminService.sortProductsByPriceDesc().then((response) => {
        setProducts(response.data);
      });
    }
    if (productsSort === 3) {
      AdminService.sortProductsByIdAsc().then((response) => {
        setProducts(response.data);
      });
    }
    if (productsSort === 4) {
      AdminService.sortProductsByIdDesc().then((response) => {
        setProducts(response.data);
      });
    }
  }

  const getUsers = () => {
    AdminService.getUsers().then((response) => {
      setUsers(response.data);
    });
    setShow(3);
  };
  const sortUsersByUsernameAsc = () => {
    AdminService.sortUsersByUsernameAsc().then((response) => {
      setUsers(response.data);
    });
  };
  const sortUsersByUsernameDesc = () => {
    AdminService.sortUsersByUsernameDesc().then((response) => {
      setUsers(response.data);
    });
  };
  const sortUsersByEmailAsc = () => {
    AdminService.sortUsersByEmailAsc().then((response) => {
      setUsers(response.data);
    });
  };
  const sortUsersByEmailDesc = () => {
    AdminService.sortUsersByEmailDesc().then((response) => {
      setUsers(response.data);
    });
  };

  const getMonthly = () => {
    AdminService.getMonthlySales().then((response) => {
      response.data.push(0);
      setChartData(response.data);
    });
    setChartLabel("Sprzedaż miesięczna tego roku");
    setChartLegend([
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ]);
  }

  const getAnnually = async () => {
    var l;
    await AdminService.getAnnuallySales().then((response) => {
      setChartData(response.data);
      l = response.data.length;
    });
    setChartLabel("Sprzedaż roczna");
    let years = [];
    for (var i = 0; i < l; i++) {
      years.push(2021 + i);
    }
    setChartLegend(years);
  }

  const getChart = () => {
    getMonthly();
    setShow(4);
  };

  return (
    <div>
      {access ? (
        <Styles>
          <Container>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary" onClick={getOrders}>
                Zamówienia
              </Button>
              <Button variant="secondary" onClick={getProducts}>
                Produkty
              </Button>
              <Button variant="secondary" onClick={getUsers}>
                Użytkownicy
              </Button>
              <Button variant="secondary" onClick={getChart}>
                Przychód
              </Button>
            </ButtonGroup>

            {/* ORDERS */}
            {show === 1 && (
              <div>
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
                  <NavDropdown.Item onClick={sortOrdersByUserAsc}>
                    użytkownik
                  </NavDropdown.Item>
                </NavDropdown>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Od</th>
                      <th>Do</th>
                      <th>Cena</th>
                      <th>Username</th>
                      <th>Produkty ID</th>
                      <th>Produkt</th>
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
                        <td>
                          {ordersSetProducts(order.productId, order.quantity)}
                        </td>
                        <td>{order.productName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Products */}
            {show === 2 && (
              <div>
                <NavDropdown title="Sortuj" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={sortProductsByPriceDesc}>
                    najdroższe
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortProductsByPriceAsc}>
                    najtańsze
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortProductsByIdAsc}>
                    rosnąco
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortProductsByIdDesc}>
                    malejąco
                  </NavDropdown.Item>
                </NavDropdown>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Produkt</th>
                      <th>Kategoria</th>
                      <th>Cena</th>
                      <th>Opis</th>
                      <th>Dostępny</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.productType}</td>
                        <td>{product.category}</td>
                        <td>{product.price}zł</td>
                        <td>{product.description}</td>
                        <td>
                          {product.availiable.toString()}
                          <Button
                            id="cancel"
                            variant="warning"
                            onClick={() => changeAvailiable(product.id)}
                          >
                            Change
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Users */}
            {show === 3 && (
              <div>
                <NavDropdown title="Sortuj" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={sortUsersByUsernameAsc}>
                    nazwa rosnąco
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortUsersByUsernameDesc}>
                    nazwa malejąco
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortUsersByEmailAsc}>
                    email rosnąco
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={sortUsersByEmailDesc}>
                    email malejąco
                  </NavDropdown.Item>
                </NavDropdown>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nazwa użytkownika</th>
                      <th>Email</th>
                      <th>Ilość zamówień</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.ordersCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Sales */}
            {show === 4 && (
              <div>
                <ButtonGroup id="secondary-buttons">
                  <Button variant="info" onClick={getMonthly}>
                    Miesięczny
                  </Button>
                  <Button variant="info" onClick={getAnnually}>
                    Roczny
                  </Button>
                </ButtonGroup>
                <Bar
                  data={{
                    labels: chartLegend,
                    datasets: [
                      {
                        label: chartLabel,
                        data: chartData,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            )}
          </Container>
        </Styles>
      ) : (
        <Styles>
          <Container>
            <h1 id="access-denied">Access Denied</h1>
          </Container>
        </Styles>
      )}
    </div>
  );
};

export default BoardAdmin;
