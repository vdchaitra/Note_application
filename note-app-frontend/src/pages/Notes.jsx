import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text, IconButton, SimpleGrid, useToast, Select, useColorMode, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { EditIcon, DeleteIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { auth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SeachBar'; // Import the SearchBar component

function Notes() {
    const [notes, setNotes] = useState([]);
    const [sortOption, setSortOption] = useState('all'); // Default sorting option
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const { authDetail } = useContext(auth);
    const navigate = useNavigate();
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode(); // Hook to toggle between light and dark mode
    const bg = useColorModeValue('gray.100', 'gray.900'); // Background color for light and dark mode
    const cardBg = useColorModeValue('white', 'gray.700'); // Card background color
    const textColor = useColorModeValue('gray.800', 'gray.200'); // Text color

    const fetchNotes = async () => {
        try {
            const res = await axios.get("https://note-application-fs44.onrender.com/notes", {
                headers: {
                    Authorization: `Bearer ${authDetail.token}`,
                },
            });
            const notesArray = Array.isArray(res.data) ? res.data : res.data.notes || res.data.data || [];
            setNotes(notesArray);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [authDetail.token]); // Added authDetail.token as a dependency to refetch if token changes

    // Filtering and sorting notes
    const filteredAndSortedNotes = notes
        .filter(note => {
            const lowercasedTitle = note.title.toLowerCase();
            const lowercasedDescription = note.description.toLowerCase();
            const lowercasedSearchTerm = searchTerm.toLowerCase();

            // Check if search term is in title or description
            const isMatching = lowercasedTitle.includes(lowercasedSearchTerm) || lowercasedDescription.includes(lowercasedSearchTerm);

            // Check if note should be included based on sortOption
            if (sortOption === 'true') {
                return isMatching && note.status === true;
            } else if (sortOption === 'false') {
                return isMatching && note.status === false;
            }
            return isMatching; // Return all notes if 'all' is selected
        })
        .sort((a, b) => {
            // Optional: Sort by date or other criteria if needed
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

    const onEditNote = (note) => {
        navigate("/notes/create", { state: { note } });
    };

    const onDeleteNote = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`https://note-application-fs44.onrender.com/notes/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${authDetail.token}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
            toast({
                title: "Note deleted.",
                description: "The note has been successfully deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting note:", error);
            toast({
                title: "Error deleting note.",
                description: "An error occurred while trying to delete the note. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const viewNoteDetails = (note) => {
        navigate(`/notes/view/${note._id}`, { state: { note } });
    };

    const handleSearch = (term) => {
        setSearchTerm(term); // Update the search term
    };

    return (
        <Box p={5} m={10} rounded="md" maxW="1500px" mx="auto" minH="500px" bg={bg}>
            <Flex justify="space-between" align="center" mb={4}>
                <Heading p={4} color={textColor} textAlign="center">Welcome to Notes...</Heading>
                <IconButton
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    aria-label="Toggle color mode"
                />
            </Flex>
            <Flex justify="space-between" mb={4}>
                <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    size="md"
                    onClick={() => navigate("/notes/create")}
                >
                    Add Note
                </Button>
                <Select
                    maxW="200px"
                    placeholder="Sort by"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="all">All Notes</option>
                    <option value="true">Important Notes</option>
                    <option value="false">Not Important Notes</option>
                </Select>
            </Flex>
            <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar component */}
            <Box p={5} borderRadius={15} bg={bg}>
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                    {filteredAndSortedNotes.length === 0 ? (
                        <Text textAlign="center" color={textColor}>No notes available. Start by adding one!</Text>
                    ) : (
                        filteredAndSortedNotes.map((item, index) => {
                            const formattedDate = new Date(item.updatedAt).toLocaleDateString();
                            const shortDescription = item.description.length > 100
                                ? item.description.slice(0, 60) + "..."
                                : item.description;

                            return (
                                <Box
                                    key={index}
                                    p={4}
                                    borderRadius="md"
                                    borderWidth={1}
                                    borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                                    bg={cardBg}
                                    onClick={() => viewNoteDetails(item)}
                                    _hover={{ cursor: 'pointer', bg: useColorModeValue('gray.100', 'gray.600') }}
                                >
                                    <Flex justify="space-between" align="center">
                                        <Heading size="sm" color="blue.600" textTransform="uppercase">{item.title}</Heading>
                                        <Flex>
                                            <IconButton
                                                icon={<EditIcon />}
                                                onClick={(e) => { e.stopPropagation(); onEditNote(item); }}
                                                ml={2}
                                                size="sm"
                                                variant="ghost"
                                                aria-label="Edit Note"
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                onClick={(e) => onDeleteNote(item._id, e)}
                                                ml={2}
                                                size="sm"
                                                variant="ghost"
                                                aria-label="Delete Note"
                                            />
                                        </Flex>
                                    </Flex>
                                    <Text fontSize="xs" mt={1} color="gray.500">{formattedDate}</Text>
                                    <Text mt={2} color={textColor}>{shortDescription}</Text>
                                </Box>
                            );
                        })
                    )}
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export default Notes;
