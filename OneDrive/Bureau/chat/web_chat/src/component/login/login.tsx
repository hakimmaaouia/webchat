import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import image from "../../assets/8.svg"
import { useHistory } from "react-router-dom";


  const Login=()=>{


    const [Name,setName]=useState("");
   const [Room,setRoom]=useState("");  
   const [visible,setVisible]=useState(false); 

   let history = useHistory();
   const handleClick=()=>{
     if((Room.length>1) && (Name.length>1)){
     history.push(`/chat?Room=${Room}&Name=${Name}`);
   
     }else{
       setVisible(true)
     }
   }
   
    return (
      <div style={{lineHeight:"50px"}}>
        <img src={image} height="100px" width="100px"></img>    <div style={{color:"#D38B5D",fontSize:"35px",fontWeight:"bold"}}>join</div>
      
<hr style={{height:"1px",background:"#000", border:"1px solid #000", width:"65%"}}></hr>
   <div>
        <TextField id="Room" label="Room" style={{width:"65%"}}  onChange={(evet)=>setRoom(evet.target.value)}/>
        </div>
        <div>
        <TextField id="Name" label="Name" style={{width:"65%"}}  onChange={(evet)=>setName(evet.target.value)}/>
        </div>
        <div>
        <Button variant="contained"  style={{width:"65%"}} onClick={handleClick}> Sign in</Button>
        </div>

  {visible ? (<div style={{border:"1px solid red",color:"red",borderRadius:"5px",fontSize:"12px"}}>
        The name or room you’ve entered doesn’t match any account
          </div>):null }
        

      </div>
    );
  }
  
  export default Login;