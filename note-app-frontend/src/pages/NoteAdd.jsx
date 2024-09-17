import React, { useContext, useState, useEffect } from 'react';
import { Input, Text, Stack, Heading, Button, Container, Select, Textarea, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../context/AuthContext';

function NoteAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authDetail } = useContext(auth);  // Get the auth token from context
  const location = useLocation();  // Access the passed note data if editing
  const note = location.state?.note;  // Get the note passed via state if it exists (for editing)

  const bg = useColorModeValue('blue.50', 'gray.800'); // Background color for container based on color mode
  const inputBg = useColorModeValue('white', 'gray.700'); // Input fields background color
  const textColor = useColorModeValue('gray.800', 'gray.200'); // Text color based on color mode

  useEffect(() => {
    // If there's a note object, populate the fields for editing
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setStatus(note.status);
    }
  }, [note]);

  const handleSubmit = async () => {
    if (!title || !description || !status) {
      setErrorMessage("All fields are required");
      return;
    }

    setLoading(true);
    setErrorMessage("");  // Clear any previous errors

    try {
      if (note) {
        // Update existing note
        await axios.patch(`https://note-application-fs44.onrender.com/notes/update/${note._id}`, 
        {
          title,
          description,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${authDetail.token}`
          }
        });
        alert("Note updated successfully");
      } else {
        // Create new note
        await axios.post("https://note-application-fs44.onrender.com/notes/create", 
        {
          title,
          description,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${authDetail.token}`
          }
        });
        alert("Note created successfully");
      }

      setLoading(false);
      navigate("/notes");
    } catch (error) {
      setLoading(false);
      console.error("Error creating or updating note:", error);
      // Provide specific error message based on the error response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Failed to save the note. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container p={8} bg={bg} marginTop={50} borderRadius="lg">
      <Stack spacing={6}>
        <Heading as="h1" size="xl" color={textColor}>{note ? "Edit Note" : "Create Note"}</Heading>

        <Input 
          type='text' 
          bg={inputBg}
          color={textColor}
          value={title}
          placeholder='Enter your title'
          onChange={(e) => setTitle(e.target.value)} 
        />

        <Textarea
          type='text' 
          bg={inputBg}
          color={textColor}
          value={description}
          h={150}
          placeholder='Enter your description'
          onChange={(e) => setDescription(e.target.value)} 
        />

        <Select 
          placeholder='Select your status' 
          value={status} 
          bg={inputBg}
          color={textColor}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='true'>Important</option>
          <option value='false'>Not Important</option>
        </Select>

        {errorMessage && <Text color="red.500">{errorMessage}</Text>}

        <Button 
          colorScheme='blue' 
          variant='solid' 
          isLoading={loading}  // Show loading spinner if loading
          onClick={handleSubmit}
          disabled={loading}  // Disable button while loading
        >
          {note ? "Update Note" : "Add Note"}
        </Button>
      </Stack>
    </Container>
  );
}

export default NoteAdd;
