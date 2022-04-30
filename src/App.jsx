import './App.css';
import { useState, useEffect } from 'react';
// import Lesson1 from "./components/Lesson_1/Lesson1.jsx"
import axios from "axios"
import Card from './components/Card/Card';
import { Switch, FormGroup, FormControlLabel,FormControl } from '@mui/material';
function App() {

  const [filmsData, setFilmsData]=useState([])
  const [filterSettings,setFilterSettings]=useState({
    adult:false,
    video:false
  })

  useEffect(()=>{
      const fetchData = async ()=>{
      await axios.get("https://api.themoviedb.org/3/search/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&page=1&include_adult=false&query=spider")
      .then(res=>setFilmsData(res.data))
    }
    fetchData()
  },[])


  const checkboxHandler=(event)=>{
    setFilterSettings({...filterSettings, [event.target.name]:event.target.checked})
  }

  return (
    <div>
        <div className='filter_container'>
          <FormControl >
            <FormGroup aria-label="position" row>
              <FormControlLabel
              control={<Switch color="primary" checked={filterSettings.adult} name="adult" onChange={(e)=>checkboxHandler(e)}/>}
              label="Adult"
              labelPlacement="bottom"
            />
            </FormGroup>
          </FormControl>
          <FormControl >
            <FormGroup aria-label="position" row>
              <FormControlLabel
              control={<Switch color="primary" checked={filterSettings.video} name="video" onChange={(e)=>checkboxHandler(e)}/>}
              label="With video"
              labelPlacement="bottom"
            />
            </FormGroup>
          </FormControl>

          <section>
            <input placeholder='search film by name'/>
          </section>
        </div>
         <div className='main_content'>
              {/* <Lesson1/> */}
          {filmsData.length!==0 ? filmsData.results.map((film)=>{
              return(
                <Card info={film}/>
              )
            })
            :
            <div>
            </div>
          }


          </div>
    </div>
    
  );
}

export default App;
