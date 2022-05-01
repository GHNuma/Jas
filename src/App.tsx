import './App.css';
import { useState, useEffect, startTransition } from 'react';
// import Lesson1 from "./components/Lesson_1/Lesson1.jsx"
import axios from "axios"
import Card from './components/Card/Card';
import { Switch, FormGroup, FormControlLabel,FormControl, Input, Pagination, Skeleton } from '@mui/material';
import { ChangeEvent } from 'react';
import { ICatalog } from './components/types/types';

interface IFilterSettings{
  isAdult:boolean,
  withVideo:boolean,
  searching:string
}

const App = () => {
  
  const Base_URL:string="https://api.themoviedb.org/3/search/movie?"
  const api_key:string="d65708ab6862fb68c7b1f70252b5d91c"

  const [loading,setLoading]=useState<boolean>(false)
  const [filmsData, setFilmsData]=useState<ICatalog>()
  const [page,setPage]=useState<number>(1)
  const [filterSettings,setFilterSettings]=useState<IFilterSettings>({
    isAdult:false,
    withVideo:false,
    searching:'spider'
  })

  useEffect(()=>{
      const fetchData = async ():Promise<void>=>{
      setLoading(true)
      await axios.get<ICatalog>(Base_URL + `api_key=${api_key}&language=ru-RU&page=${page}&include_adult=${filterSettings.isAdult}&query=${filterSettings.searching}`)
      .then(res=>{
        setFilmsData(res.data)
        setLoading(false)
      })
    }
    fetchData()
  },[Base_URL,api_key,filterSettings.isAdult,filterSettings.searching,page])



  const checkboxHandler=(event:ChangeEvent<HTMLInputElement>):void=>{
    setFilterSettings({...filterSettings, [event.target.name]:event.target.checked})
  }

  const handleSearch=(searchEvent:ChangeEvent<HTMLInputElement>):void=>{
      startTransition(()=>{
        setFilterSettings({...filterSettings, [searchEvent.target.name]:searchEvent.target.value})
      })
  }

  const pageChange=(changePageEvent:ChangeEvent<unknown>, value:number):void=>{
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
                control={<Switch 
                  color="primary" 
                  checked={filterSettings.isAdult} 
                  name="isAdult" 
                  onChange={checkboxHandler} 
                  size="medium"
                />}
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
                  checked={filterSettings.withVideo} 
                  name="withVideo" 
                  onChange={checkboxHandler} 
                  size="medium"
                />}
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
                  name="searching"
                  onChange={handleSearch}
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
          {filmsData ? 
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
        <Pagination count={filmsData && filmsData.total_pages} page={page} onChange={pageChange} className="pagination"/>
        <br/>
    </div>
    
  );
}

export default App;
