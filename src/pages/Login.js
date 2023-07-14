import React, { useState } from "react";
import { Col, Container, Row, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Se connecter à votre compte</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre adresse Email"
                value={email}
                required
                onChange={(e) => SetEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                required
                onChange={(e) => SetPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Se connecter
              </Button>
            </Form.Group>

            <p className="pt-3 text-center">
              Vous n'avez pas de comptet ?{" "}
              <Link to="/signup">Créer un compte</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
};

export default Login;
