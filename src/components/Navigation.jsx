import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <Flex flexDir={['column', 'row']} alignItems={'center'} justifyContent={'center'} m={5}>
      <Button colorScheme='pink' variant='ghost' fontSize={'3xl'} p={10}>
        <Link to="/">All Events</Link>
      </Button>
    </Flex>
  );
};
