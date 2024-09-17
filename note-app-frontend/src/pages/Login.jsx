import React, { useContext, useState } from 'react';
import { Input, Text, Stack, Heading, InputGroup, InputRightElement, Button, Container } from '@chakra-ui/react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(auth);

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://note-application-fs44.onrender.com/user/login", {
        email,
        password
      });
      setLoading(false);
      alert("User Login Successful");
      login(response.data.token);
      console.log(response.data.token);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      setErrorMessage("Failed to login. Please check your credentials.");
    }
  };

  return (
    <Container 
      p={8} 
      
      borderRadius="lg" 
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" 
      h="400px"
       marginTop={50}
      
    >
      <Stack spacing={6} >
        <Heading as="h1" size="xl" color="blue.700" textAlign="center">
          Login
        </Heading>

        <Input 
          type='email' 
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          borderColor="gray.300"
        />

        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            color="gray.700"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            borderColor="gray.300"
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick} >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        {errorMessage && <Text color="red.500" textAlign="center">{errorMessage}</Text>}

        <Button colorScheme='blue' variant='solid' onClick={handleSubmit} isLoading={loading}>
          Login
        </Button>
      </Stack>

      <Text p={2} textAlign="center" color="blue.600">
        Not registered yet? <NavLink to="/register" style={{ color: 'blue' }}>Create an account</NavLink>
      </Text>
    </Container>
  );
}

export default Login;
