import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <Alert className="invalid-alert" variant="danger" role="alert">
        To pole jest wymagane!
      </Alert>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <Alert className="invalid-alert" variant="danger" role="alert">
        Nieprawidłowy email.
      </Alert>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <Alert className="invalid-alert" variant="danger" role="alert">
        Nazwa użytkownika musi mieć więcej niż 3 i mniej niż 20 znaków.
      </Alert>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <Alert className="invalid-alert" variant="danger" role="alert">
        Hasło musi mieć więcej niż 6 i mniej niż 40 znaków.
      </Alert>
    );
  }
};

const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;
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
`;

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <Styles>
      <Container>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Nazwa użytkownika</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Adres email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[validEmail]}
                />
              </div>

              <div className="form-group">
                <div>
                  <label htmlFor="password">Hasło</label>
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? visible : notVisible}
                  </i>
                </div>
                <Input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <Row>
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit">Załóż konto</Button>
                  </Col>
                </Row>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <Alert variant={successful ? "success" : "danger"}>
                {message}
              </Alert>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Container>
    </Styles>
  );
};

export default SignUp;
