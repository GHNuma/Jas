import React from 'react'
import "./lesson1.css"
import {useState,useTransition,Suspense} from "react"


export default function Lesson1() {

    const [list,setList]=useState()

    const [startTransition, isPending] = useTransition({
      timeoutMs: 3000
    });
  
    const dataHandler = async ()=>{
      if(list){
        return setList(null)
      } else {
        const res = await fetch('https://api.github.com/users/zhanseit/repos')
        const data = await res.json()
        setList(data)
      }
    }

  return (
    <div className="container">
      <button 
      className='btn_click_me' 
      onClick={()=>dataHandler()}
      >
        {list ? "Remove info" : "Click me"}
      </button>
     
          {list ? 
            <div>
                <p className='table_title'>Информация о пользователях:</p>
              <table className='users_table'>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>full_name</th>
                </tr>
                {
                  list.map(user=>{
                    return(
                      <tr key={user.id}>
                        <th>{user.id}</th>
                        <th>{user.name}</th>
                        <th>{user.full_name}</th>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          :
          <div>
            <p></p>  
          </div>}
    </div>
  )
}
