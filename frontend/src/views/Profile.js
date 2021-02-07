import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

import { clearMessage, setMessage } from "../actions/message";
import { changeUsername, changePassword, changeEmail } from "../actions/user";

import styled from "styled-components";
import {
  Container,
  Jumbotron,
  FormGroup,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <Alert variant="danger" role="alert">
        Nieprawidłowy email.
      </Alert>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <Alert variant="danger" role="alert">
        Nazwa użytkownika musi mieć więcej niż 3 i mniej niż 20 znaków.
      </Alert>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <Alert variant="danger" role="alert">
        Hasło musi mieć więcej niż 6 i mniej niż 40 znaków.
      </Alert>
    );
  }
};

const Styles = styled.div`
  .container {
    margin-top: 76px;

    #from-backend {
      margin: 0 auto 20px auto;
    }
    p {
      margin-bottom: 50px;
    }

    a {
      display: inline;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: center;

      .alert {
        width: 250px;
      }

      .form-label {
        font-size: large;
      }

      .form-control {
        margin-bottom: 10px;
        width: 250px;
      }
    }
  }
`;

const Profile = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword0 = (e) => {
    const password = e.target.value;
    setPassword0(password);
  };
  const onChangePassword1 = (e) => {
    const password = e.target.value;
    setPassword1(password);
  };
  const onChangePassword2 = (e) => {
    const password = e.target.value;
    setPassword2(password);
  };
  const submitNewUsername = () => {
    dispatch(changeUsername(currentUser.id, username))
      .then(() => {
        setSuccessful(true);
        setTimeout(() => {
          setSuccessful(false);
          dispatch(clearMessage());
        }, 3000);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  const submitNewPassword = () => {
    if (password0 === password1) {
      dispatch(setMessage("Nowe hasło nie może być takie samo jak stare!"));
    } else {
      if (password1 !== password2) {
        dispatch(setMessage("Powtórzone hasło nie jest takie samo!"));
        return;
      } else {
        dispatch(changePassword(currentUser.id, password0, password2))
          .then(() => {
            setSuccessful(true);
            setTimeout(() => {
              setSuccessful(false);
              dispatch(clearMessage());
            }, 3000);
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    }
  };
  const submitNewEmail = () => {
    dispatch(changeEmail(currentUser.id, email))
      .then(() => {
        setSuccessful(true);
        setTimeout(() => {
          setSuccessful(false);
          dispatch(clearMessage());
        }, 3000);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <Styles>
      <Container>
        <Jumbotron>
          <h1>
            <strong>{currentUser.username}</strong> Profile
          </h1>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {message ? (
            <Row>
              <Alert
                id="from-backend"
                variant={successful ? "success" : "danger"}
              >
                {message}
              </Alert>
            </Row>
          ) : (
            ""
          )}

          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <label htmlFor="username">Nazwa użytkownika</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[vusername]}
                  />
                  <Button onClick={submitNewUsername} variant="primary">
                    Zmień nazwę
                  </Button>
                </FormGroup>
              </Form>
            </Col>
            <Col>
              <Form>
                <FormGroup>
                  <label htmlFor="password">Hasło</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password0}
                    placeholder="stare hasło"
                    onChange={onChangePassword0}
                  />
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password1}
                    placeholder="nowe hasło"
                    onChange={onChangePassword1}
                    validations={[vpassword]}
                  />
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password2}
                    placeholder="powtórz nowe hasło"
                    onChange={onChangePassword2}
                    validations={[vpassword]}
                  />
                  <Button onClick={submitNewPassword} variant="primary">
                    Zmień hasło
                  </Button>
                </FormGroup>
              </Form>
            </Col>
            <Col>
              <Form>
                <FormGroup>
                  <label htmlFor="email">Adres email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[validEmail]}
                  />
                  <Button onClick={submitNewEmail} variant="primary">
                    Zmień email
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </Styles>
  );
};

export default Profile;
