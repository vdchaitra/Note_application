import React, { useState } from 'react';
import { Input, Stack, Heading, InputGroup, InputRightElement, Button, Container, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    if (!name || !email || !password || !gender || !age) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    
    try {
      await axios.post("https://note-application-fs44.onrender.com/user/register", {
        name,
        email,
        password,
        gender,
        age
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  return (
    <Container boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"  h="560px" marginTop={50} p={8}>
      <Stack spacing={6} maxW="md" mx="auto">
        <Heading as="h1" size="xl" color="blue.600">Register</Heading>

        {errorMessage && <Text color="red.500">{errorMessage}</Text>}

        <Input 
          type='text' 
          borderColor="gray.300"
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />

        <Input 
          type='email' 
          borderColor="gray.300"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />

        <Input 
          type='number' 
          borderColor="gray.300"
          placeholder='Enter your age'
          value={age}
          onChange={(e) => setAge(e.target.value)} 
        />

        <Select 
          placeholder='Select your gender' 
          borderColor="gray.300"
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Select>

        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter your password'
            borderColor="gray.300"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button colorScheme='blue' onClick={handleSubmit}>
          Register
        </Button>
      </Stack>
      <Text p={2} textAlign="center">
        Already have an account? <NavLink to="/login" style={{ color: 'blue' }}>Login</NavLink>
      </Text>
    </Container>
  );
}

export default Register;
