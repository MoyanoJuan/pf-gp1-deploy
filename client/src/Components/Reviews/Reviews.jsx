import React from "react";
import { useSelector } from "react-redux";
import { Review } from "../index";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 184px;
  justify-content: space-around;
  align-items: start;
  position: relative;
`;

const Reviews = styled.div`
  display: flex;
  // flex-direction: row;
  width: 100%;
`;

const Titulo = styled.div`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  border: none;
  background-color: transparent;
  text-decoration: underline;

  cursor: pointer;
`;

export default function Producto({ setReseñas }) {
  const reviews = useSelector((state) => state.reviews);

  return (
    <Container>
      <Titulo>Reseñas de otros usuarios</Titulo>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setReseñas(true);
        }}
      >
        ver todas
      </Button>
      <Reviews>
        {reviews.length ? (
          reviews.slice(0, 4).map((review) => {
            return (
              <Review
                key={review.id}
                id={review.id}
                puntaje={review.puntaje}
                titulo={review.titulo}
                comentario={review.comentario}
                fecha={review.updatedAt.slice(0, 10)}
              />
            );
          })
        ) : (
          <Review comentario={"Aún no hay reseñas. ¡Creá la tuya!"} />
        )}
      </Reviews>
    </Container>
  );
}
