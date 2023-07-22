import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/NewProduct.css";
import axios from "../axios";
import { useCreateProductMutation } from "../services/appApi";

function NewProduct() {
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [category, SetCategory] = useState("");
  const [images, SetImages] = useState([]);
  const [imgToRemove, SetImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    SetImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        SetImgToRemove(null);
        SetImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Veuillez remplir tous les champs");
    }

    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.lenght > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "harlem-code-23",
        uploadPreset: "h2flkux7",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          SetImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }
  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Créer un produit</h1>
            {isSuccess && (
              <Alert variant="succes">Produit créé avec succès</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom du produit"
                value={name}
                required
                onChange={(e) => SetName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Entrez la description du produit"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => SetDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix en FCFA"
                value={price}
                required
                onChange={(e) => SetPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => SetCategory(e.target.value)}
            >
              <Form.Label>Categorie</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Selectionner une categorie --
                </option>
                <option value="technologie">Technologie</option>
                <option value="phones">Téléphones et Tablettes</option>
                <option value="laptops">Laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Télécharger des images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="pic" />
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                disabled={isLoading || isSuccess}
                style={{ backgroundColor: "skyblue", borderColor: "white" }}
              >
                Créer le produit
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
