import React, { useState, useContext, useEffect } from 'react';
import { Avatar, AvatarBadge, Button, Heading, Box, Input } from '@chakra-ui/react';
import { auth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { authDetail, logout } = useContext(auth);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("User"); // Default name
  const [newName, setNewName] = useState(name);

  // Function to extract token prefix
  const getTokenPrefix = (token) => {
    const tokenParts = token.split('.');
    const trimmedPayload = tokenParts[1].slice(0, -6);
    return `${tokenParts[0]}.${trimmedPayload}`;
  };

  useEffect(() => {
    if (authDetail?.token) {
      const tokenPrefix = getTokenPrefix(authDetail.token);
      const key = `userName_${tokenPrefix}`;
      const storedName = localStorage.getItem(key);

      if (storedName) {
        setName(storedName);
        setNewName(storedName);
      } else {
        console.log('No name found in local storage');
      }
    }
  }, [authDetail?.token]);

  const onLogout = () => {
    logout();
    setName("User"); // Reset to default name
    navigate("/login");
  };

  const onSave = () => {
    if (authDetail?.token) {
      const tokenPrefix = getTokenPrefix(authDetail.token);
      const key = `userName_${tokenPrefix}`;
      localStorage.setItem(key, newName);
      setName(newName);
      setIsEditing(false);
    } else {
      console.error('User is not authenticated');
    }
  };

  // Conditionally render profile only if the user is logged in
  if (!authDetail?.token) {
    return null; // If not logged in, don't show anything
  }

  return (
    <Box display="flex" alignItems="center" >
      <Avatar name={name} size="lg">
        <AvatarBadge boxSize='1.25em' bg='green.500' />
      </Avatar>

      <Box ml={4} flex="1">
        {!isEditing ? (
          <>
            <Heading size="md" mb={2}>{name}</Heading>
            <Button mt={2} colorScheme="blue" onClick={() => setIsEditing(true)}>
              Edit Name
            </Button>
          </>
        ) : (
          <>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              mb={2}
            />
            <Button
              colorScheme="green"
              onClick={onSave}
              mr={2}
            >
              Save
            </Button>
          </>
        )}
      </Box>
      
      <Button
        mt={10}
        ml={2}
        colorScheme="red"
        onClick={onLogout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
