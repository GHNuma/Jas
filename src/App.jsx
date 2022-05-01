import './App.css';
import { useState, useEffect,startTransition } from 'react';
// import Lesson1 from "./components/Lesson_1/Lesson1.jsx"
import axios from "axios"
import Card from './components/Card/Card';
import { Switch, FormGroup, FormControlLabel,FormControl, Input, Pagination, Skeleton } from '@mui/material';
function App() {
  
  const Base_URL="https://api.themoviedb.org/3/search/movie?"
  const api_key="d65708ab6862fb68c7b1f70252b5d91c"

  const [loading,setLoading]=useState(false)
  const [filmsData, setFilmsData]=useState([])
  const [page,setPage]=useState(1)
  const [filterSettings,setFilterSettings]=useState({
    adult:false,
    video:false,
    searching:'spider'
  })

  useEffect(()=>{
      const fetchData = async ()=>{
      setLoading(true)
      await axios.get(Base_URL+ `api_key=${api_key}&language=ru-RU&page=${page}&include_adult=${filterSettings.adult}&query=${filterSettings.searching}`)
      .then(res=>{
        setFilmsData(res.data)
        setLoading(false)
      })
    }
    fetchData()
  },[Base_URL,api_key,filterSettings.adult,filterSettings.searching,page])



  const checkboxHandler=(event)=>{
    setFilterSettings({...filterSettings, [event.target.name]:event.target.checked})
  }
  const handleSearch=(searchEvent)=>{
    startTransition(setFilterSettings({...filterSettings, [searchEvent.target.name]:searchEvent.target.value}))
  }
  const pageChange=(changePageEvent, value)=>{
    setPage(value)
  }
  
  return (
    <div>
      {/*Пока что такой отступ чтобы контент был виден*/}
      <br/>
        <div className='filter_container'>
          <div className='filter_content'>
            <FormControl>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                control={<Switch color="primary" checked={filterSettings.adult} name="adult" onChange={checkboxHandler} size="medium"/>}
                label="Adult"
                labelPlacement="bottom"
              />
              </FormGroup>
            </FormControl>
            <FormControl >
              <FormGroup aria-label="position" row>
                <FormControlLabel
                control={<Switch 
                  color="primary" 
                  checked={filterSettings.video} 
                  name="video" 
                  onChange={checkboxHandler} 
                  size="medium"/>}
                label="With video"
                labelPlacement="bottom"
              />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={<Input 
                  placeholder='search film by name'
                  value={filterSettings.searching}
                  type="text"
                  name="searching"
                  onChange={(e)=>{handleSearch(e)}}
                  size="medium"
                  />}
                label="Search"
                labelPlacement='bottom'
              />
              
            </FormControl>
          </div>
        </div>
        <div className='main_content'>
              {/* <Lesson1/> */}
          {filmsData.length!==0 ? 
          filmsData.results.map((film)=>(
            loading ? 
              <Skeleton variant="rectangular">
                <Card info={film} key={film.id}/>
              </Skeleton>
              : 
              <Card info={film} key={film.id}/> 
            ))
          :
            <div>
            </div>
          }
        </div>
        <Pagination count={filmsData.total_pages} page={page} onChange={pageChange} className="pagination"/>
        <br/>
    </div>
    
  );
}

export default App;
