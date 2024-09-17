import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Profile from './Profile';


function Navbar({ onSearch }) { // Pass search handler as a prop
  return (
    <Flex align="center" justify="space-between" p={5}>
      <Heading>Notes</Heading>
      
      <Profile />
    </Flex>
  );
}

export default Navbar;
