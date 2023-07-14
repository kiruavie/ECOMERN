import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1>Créer un compte</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Nom Complet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                value={name}
                required
                onChange={(e) => SetName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre adresse email"
                value={email}
                required
                onChange={(e) => SetEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                required
                onChange={(e) => SetPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Créer un compte
              </Button>
            </Form.Group>
            <p className="pt-3 text-center">
              Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
