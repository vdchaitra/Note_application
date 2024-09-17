
import { createRoot } from 'react-dom/client'
import App from "./App"
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import AuthContext from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <AuthContext>
    <BrowserRouter>
      <ChakraProvider >
        <App/>
      </ChakraProvider >
    </BrowserRouter>
  </AuthContext>
  
    
)
