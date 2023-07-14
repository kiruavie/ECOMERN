import React from "react";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../Categories";
import "../styles/Home.css";
const Home = () => {
  return (
    <div>
      <img
        src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
        alt="home-img"
        className="home-banner"
      />
      <div className="feature-products-container container mt-4">
        <h2>Derniers produits</h2>
        {/* les derniers produits */}
      </div>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: "right",
            display: "block",
            textDecoration: "none",
          }}
        >
          Voir plus {">>"}
        </Link>
      </div>
      {/* la bannière de vente*/}
      <div className="sale__banner--container mt-4">
        <img
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          alt="sale-banner"
        />
      </div>
      <div className="recent-products-container conatainer mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer to={`category/${category.name.toLocaleLowerCase()}`}>
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-title"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
