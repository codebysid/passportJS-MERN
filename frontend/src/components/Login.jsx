import React,{useState} from 'react'
import { Input, Button, Snackbar } from "@mui/material";
import { Details } from './Details';

export const Login = ({hobbies}) => {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [open, setOpen] = useState(false);
    const [snackBar,setSnackBar]=useState(false)
    const [user,setUser] =useState({})

     const handleClose = (event, reason) => {
       if (reason === "clickaway") {
         return;
       }
       setSnackBar(false);
     }

    const handleLoginForm=async(e)=>{
        e.preventDefault()
        
        const data=await fetch('http://localhost:3030/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userName,password})
        })

        const res=await data.json()
        if(res.authenticated) {
          setOpen(true)
          setSnackBar(false)
        }
        else {
          setOpen(false)
          setSnackBar(true)
        }
       
        
    }

  return (
<>
    {open?<Details
    hobbiesStatic={hobbies}
    user={{userName:userName,password:password}}
    />:<div>
      <form onSubmit={handleLoginForm} className="loginForm">
        <Input
          id="userName"
          className="input"
          placeholder="User Name"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        ></Input>
        <Input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></Input>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Invalid Username or Password"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </div>}

</>
    
  );
}
