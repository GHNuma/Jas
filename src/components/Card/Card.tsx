import React,{FC} from 'react'
import "./card.css"
import { Rating } from '@mui/material'
import {IFilm} from "../types/types"
interface CardProps {
  info:IFilm
}

const Card:FC<CardProps>=({info}) => {
  return (
    <div 
      className='card_container' 
      style={
      info.poster_path ? 
        {backgroundImage:`url(https://image.tmdb.org/t/p/original/${info.poster_path})`}
        : 
        {backgroundImage:"url(empty_poster.png)",backgroundSize:"contain"}
      }
    >
        <div className='card_details'>
            <Rating
            name="simple-controlled"
            className='rating_stars'
            precision={0.5}
            size='small'
            readOnly
            value={info.vote_average/2}
            />
            <p className='film_title' style={info.poster_path===null ? {color:"black",textDecoration:"line-through"} : {color:"white"}}>{info.original_title}</p>
        </div>
    </div>
  )
}

export default Card;