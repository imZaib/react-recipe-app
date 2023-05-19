import React, { useState , useEffect} from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) =>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
        const recipes = await data.json();
        setCuisine(recipes.results);
    }

    useEffect(() => {
        getCuisine(params.type)
     console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.type])

  return (
    <Grid
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      {cuisine.map((item) => {
        return(
            <Card key={item.id}>
              <Link to={'/recipe/' + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    grid-gap: 3rem;

`;

const Card = styled.div`
    img{
    width: 100%;
    background-size: cover;
    border-radius: 2rem;
    border: 1px groove #f27121;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
        font-size: 12px;
    }

`

export default Cuisine