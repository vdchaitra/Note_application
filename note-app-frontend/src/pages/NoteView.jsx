import React, { useState, useEffect, useContext } from 'react';
import { Box, Heading, Text, Button, Container, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../context/AuthContext';

function NoteView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { authDetail } = useContext(auth);
    
    const [error, setError] = useState(null);
    const note = location.state?.note; // Use optional chaining to safely access note
    const formattedDate = note ? new Date(note.updatedAt).toLocaleDateString() : null;

    const { colorMode } = useColorMode();
    const bg = useColorModeValue('blue.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('black', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    useEffect(() => {
        if (!note) {
            setError("Note not found.");
        }
    }, [note]);

    if (error) {
        return (
            <Container p={8} bg={bg} marginTop={50}>
                <Box p={4} bg={boxBg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
                    <Text color="red.500">{error}</Text>
                    <Button colorScheme="blue" onClick={() => navigate('/notes')}>Back to Notes</Button>
                </Box>
            </Container>
        );
    }

    if (!note) {
        return (
            <Container p={8} bg={bg} marginTop={50}>
                <Box p={4} bg={boxBg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
                    <Text color="red.500">Note not found.</Text>
                    <Button colorScheme="blue" onClick={() => navigate('/notes')}>Back to Notes</Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container p={8} bg={bg} marginTop={50} maxW="1000px">
            <Box p={4} bg={boxBg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
                <Heading as="h1" size="xl" mb={4} textTransform="uppercase" color={textColor}>
                    {note.title}
                </Heading>
                <Text mb={4} color={textColor}>{note.description}</Text>
                <Text mb={4} color={textColor}>{formattedDate}</Text>
                <Text mb={4} color={textColor}><strong>Status:</strong> {note.status ? "Important" : "Not Important"}</Text>
                <Button colorScheme="blue" onClick={() => navigate('/notes')}>Back to Notes</Button>
            </Box>
        </Container>
    );
}

export default NoteView;
