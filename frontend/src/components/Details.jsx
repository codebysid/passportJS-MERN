import React,{useState} from 'react'
import { Button } from "@mui/material";

export const Details = ({hobbiesStatic,user}) => {
  const [detailsBtn,setDetailsBtn] =useState(true)
  const [detailsOfUser,setDetailsOfUser]=useState([])

  const showDetails=async()=>{

    const data=await fetch('http://localhost:3030/details',
    {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({userName:user.userName})   
    })

    const res=await data.json()
    setDetailsOfUser([res])
    setDetailsBtn(false)
  }
  return (
    <div>
      {detailsBtn?
      <Button 
      variant="contained"
      onClick={showDetails}
      >
          Show Details
        </Button>:detailsOfUser && detailsOfUser.map((ele,key)=>{
                    return (
                      <div className="details" key={key}>
                        <p>
                          <span className="title">Name:</span>
                          {ele.name}
                        </p>
                        <p>
                          <span className="title">Hobby:</span>
                          {
                            ele.hobbies.map((ele,key)=>{
                                return ele===true?<span key={key} id='hobby'>{hobbiesStatic[key]},</span>:null
                            })
                          }
                        </p>
                        <p>
                          <span className="title">Gender:</span>
                          {ele.gender}
                        </p>
                        <Button variant="contained" type="submit"
                        onClick={()=>{
                            window.location.reload()                    
                        }}
                        >
                          LogOut
                        </Button>
                      </div>
                    );
                 })
        }
        </div>
  )
}
