import React, { useState } from "react";
import {useauthStore,} from "../store/useAuthStore"
import { Navigate, useNavigate } from "react-router-dom";

const CustomPrompt = (val) => {
    const navigate = useNavigate()
  const {forgot,verify,updateInfo}=useauthStore();
  const [inputValue, setInputValue] = useState("");
  const [otp,setOtp]= useState("")
 const [gmail,setGmail]=useState("");
  const [result, setResult] = useState(false);
  const [change,setChange]=useState(false);
  const [resultuser,setResultuser]=useState("");
  const [resultpass,setResultpass]=useState("");

  const handleSubmit = async() => {
   let res = await forgot({email :inputValue.trim()});
   if(res==true){alert("Type Otp");
    setGmail(inputValue);
    setInputValue("");
   }
   else{alert("Resend")}
   setResult(res);
        };

   const handleSubmit1 = async()=>{
    let result = await verify({email:gmail,otp:otp});
    if(result){setChange(true);
        
    }
   }
   const handleSubmit2 = async()=>{
      let result = await updateInfo({email:gmail,userName:resultuser,password:resultpass});
      alert(result.data);
      if(result.status==200){ navigate("/login");}
     
   }

  return (

         <div style={{marginTop:'300px',marginLeft:'20px'}}>
            <div style={{ border: "1px solid black", padding: "20px", width: "300px" }} >
          <p>Enter your Email:</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          
        </div>
        {result && <div style={{ border: "1px solid black", padding: "20px", width: "300px" }} >
          <p>Type OTP</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleSubmit1}>Submit</button>
          
        </div>}
        {change && <div style={{ border: "1px solid black", padding: "20px", width: "300px" }} >
          <p>Type Your Newusername</p>
          <input
            type="text"
            value={resultuser}
            onChange={(e) => setResultuser(e.target.value)}
          />
          <p>Type Your New Password</p>
          <input
            type="password"
            value={resultpass}
            onChange={(e) => setResultpass(e.target.value)}
          />
          <button onClick={handleSubmit2}>Submit</button>
          
        </div>}


         </div>
        
  )   
};

export default CustomPrompt;
