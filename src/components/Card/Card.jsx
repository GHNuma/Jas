import React from 'react'
import "./card.css"
import { Rating } from '@mui/material'
export default function Card({info}) {
  return (
    <div className='card_container' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${info.poster_path})`}}>
        <div>
            <Rating
            name="simple-controlled"
            className='rating_stars'
            precision={0.5}
            size='small'
            readOnly
            value={info.vote_average/2}
            // Тут вопрос которое поле показывает рейтинг
            />
            <p className='film_title'>{info.original_title}</p>
        </div>
    </div>
  )
}
