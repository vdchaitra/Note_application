import React, { useState } from 'react';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import { Input, Box, IconButton } from '@chakra-ui/react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const onClearSearch = () => {
    setSearchValue("");
    onSearch(""); // Clear the search in parent component
  };

  const handleSearch = () => {
    onSearch(searchValue); // Trigger search in parent component
  };

  return (
    <Box display="flex" alignItems="center" p={4} borderRadius="md" >
      <Input 
        type='text'
        placeholder='Search Notes'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        
        maxW="300px"
        flexGrow={1}
        p={5}             
        colorScheme="white"
        borderRadius="md"
        _focus={{ boxShadow: "outline" }}
      />
      
      {searchValue && (
        <IconButton 
          icon={<SmallCloseIcon />} 
          onClick={onClearSearch} 
          aria-label="Clear Search"
          bgColor="transparent" 
          _hover={{ bg: 'blue.100' }} 
          ml={2}
          isRound
        />
      )}

      <IconButton 
        icon={<Search2Icon />} 
        onClick={handleSearch} 
        aria-label="Search"
        bg="transparent" 
        _hover={{ bg: 'blue.100' }} 
        ml={2}
        isRound                    
      />
    </Box>
  );
}

export default SearchBar;
