import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import Stars from "../../Stars/Stars";
import styled from "styled-components";

const Contenedor = styled.div`
  height: 85vh;
  background-color: white;
  margin-left: 2%;

  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
    margin: 0;
  }
`;
const ContenedorReseñas = styled.div`
  display: flex;
  flex-wrap: wrap;
  // padding-top: 25px;
`;

const StyledLink = styled(Link)`
  width: 230px;
  text-decoration: none;
  color: black;

  @media screen and (max-width: 560px) {
    width: 186px;
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  @media screen and (min-width: 560px) {
    display: none;
  }
`;

const Review = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: start;
  padding: 0px 17px;
  margin-bottom: 10px;
  height: 140px;
  width: 90%;
  background-color: #80808038;
  border-radius: 5px;

  @media screen and (max-width: 560px) {
    margin-bottom: 10px;
  }
`;

const TituloReview = styled.span`
  height: 18px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
`;

const ComentarioReview = styled.span`
  height: 60px;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  margin-bottom: 20px;
`;

const Boton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 70px;
  height: 30px;
  background: white;
  border: 1px solid black;
  color: black;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
`;

const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
  margin: 1%;
`;

export default function Reseñas() {
  const user = useSelector((state) => state.userInfo);
  const id = user.uid;
  const reseñas = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  function handleClick() {
    setShow((current) => !current);
  }

  return (
    <Contenedor style={{ display: show ? "block" : "none" }}>
      <H1>Mis reseñas</H1>
      <BotonCerrar onClick={handleClick}>X</BotonCerrar>
      <ContenedorReseñas>
        {reseñas?.map((review) => {
          return (
            <StyledLink key={review.id} to={`/productos/${review.productoId}`}>
              <Review>
                <Stars rating={review.puntaje} />
                <TituloReview>{review.titulo}</TituloReview>
                <ComentarioReview>{review.comentario}</ComentarioReview>
                <Boton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteReview(review.id));
                  }}
                >
                  Eliminar
                </Boton>
              </Review>
            </StyledLink>
          );
        })}
      </ContenedorReseñas>
    </Contenedor>
  );
}
