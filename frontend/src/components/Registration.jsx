import React,{useState} from 'react'
import { Input,Button,Snackbar, Checkbox,Radio,FormControlLabel,RadioGroup,FormControl,FormLabel} from "@mui/material";

export const Registration = ({hobbies,login,setLogin}) => {
    
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [gender,setGender]=useState('male')
    const [open, setOpen] = useState(false);
    const [snackMsg,setSnackMsg]=useState("")
    const [checkBoxes,setCheckBoxes]=useState(
        new Array(hobbies.length).fill(false)
    )


    const handleRegistrationForm=async (e)=>{
        e.preventDefault()

        const userInfo=
            {
                userName,
                password,
                name,
                checkBoxes,
                gender
            }
            
        const rawResponse=await fetch("http://localhost:3030/registration", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(userInfo),
       })
        const res=await rawResponse.json()
        if(res && res.status===false){
          setSnackMsg("This UserName is taken , Try Another ;)")
          setOpen(true)
        }else{
          setSnackMsg("Succesfully Registered :)")
        }
    }

   const handleClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
     setOpen(false);
   };
   
   const updateCheckbox=(pos)=>{
    const update=checkBoxes.map((ele,key)=>pos===key?!ele:ele)
    setCheckBoxes(update)
   }


  return (
    <div className="registrationDiv">
      <form onSubmit={handleRegistrationForm} className="registrationForm">
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
          value={[password]}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></Input>

        <Input
          className="input"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        ></Input>

        <FormControl>
          <FormLabel id="hobbyLabel">Hobby</FormLabel>

          <div className="hobbiesCheckBoxes">
            {hobbies.map((ele, key) => {
              return (
                <div key={key}>
                  <Checkbox
                    name={ele}
                    value={ele}
                    checked={checkBoxes[key]}
                    onChange={() => updateCheckbox(key)}
                  />

                  <label>{ele}</label>
                </div>
              );
            })}
          </div>
        </FormControl>

        <div className="">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <div className="genderRadio">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        <Button variant="contained" type="submit">
          Register
        </Button>
        <div>
          Already Registered ?
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setLogin(true);
            }}
          >
            Login
          </Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={snackMsg}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </div>
  );
}
