import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Popular() {
  const [populer, setPopuler] = useState([]);

  useEffect(() => {

    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem("popular");

    if(check){
      setPopuler(JSON.parse(check));
    }
    else{

    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();

    localStorage.setItem("popular", JSON.stringify(data.recipes));
    setPopuler(data.recipes);
    console.log(data.recipes);
    }
  };



  return (
    <Wrapper>
      <h3>Popular</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "5rem",
          gap: "",
        }}
      >
        {populer.map((recipes) => {
          return (
            <SplideSlide key={recipes.id}>
             
              <Card >
                <Link to={"/recipe/" + recipes.id}>
                  <p>{recipes.title}</p>
                  <img src={recipes.image} alt={recipes.title} />
                <Gradient/>
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin:0rem 0.5rem;

  img {
    border-radius: 2rem;
    position: absolute;
    left:0;
    width:100%;
    height: 100%;
    object-fit:cover;
  }
  p{
    position: absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    height:40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`

  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))

`;

export default Popular;
