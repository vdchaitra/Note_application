
import { createContext, useState } from "react";


export const auth=createContext()

function AuthContext({children}) {
    const[authDetail,setAuthDetail]=useState({
        isLoggedIn:false,
        token:null
    })


    const login=(token)=>{
       
        setAuthDetail({
            isLoggedIn:true,
            token:token,
            
            
        })
       
    }
    
    const logout=()=>{
        
        setAuthDetail({
            isLoggedIn:false,
            token:null
            
        })
        
        
    }
    
    
  return (
    <div>
        <auth.Provider value={{authDetail,login,logout}}>
            {children}
        </auth.Provider>
      
    </div>
  )
}

export default AuthContext



