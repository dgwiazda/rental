import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Button, Row, Col, Nav, Alert } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

const Styles = styled.div`
  .container {
    width: 300px;
    margin-top: 100px;
  }
  a {
    display: inline;
  }

  i {
    position: relative;
    top: 40px;
    left: 200px;
    color: grey;
  }

  .btn {
    margin-left: 10px;
  }

  p {
    margin-left: 18px;
  }
`;

const SignIn = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Styles>
      <Container>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Nazwa użytkownika</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <i onClick={togglePasswordVisiblity}>
              {passwordShown ? visible : notVisible}
            </i>
            <Input
              type={passwordShown ? "text" : "password"}
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <Row>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Zaloguj się</span>
                </Button>
              </Col>
            </Row>
          </div>
          <p>
            Nie masz konta?<Nav.Link href="/signup">Zarejestruj się</Nav.Link>
          </p>

          {message && (
            <div className="form-group">
              <Alert variant="danger">{message}</Alert>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Container>
    </Styles>
  );
};

export default SignIn;
