import React, { useContext } from 'react';
import { Flex, Heading, Text, Image, Button, Modal, Tag, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { CategoryContext } from '../components/CategoryContext';
import { UserContext } from '../components/UserContext';

export const loader = async ({params}) => {
  const event = await fetch(`http://localhost:3000/events/${params.id}`,)
  return {event: await event.json()}
}


export const EventPage = ({event}) => {
  const {categories} = useContext(CategoryContext);

  return (
  <Flex flexDir='column'>
    <Flex w='60%'>
    <Heading>
      {event.title}
    </Heading>
    <Text>
      {event.description}
    </Text>
    <StatGroup display='flex' alignItems='baseline'>
            <Stat p={3}>
              <StatLabel>Starts:
              </StatLabel>
              <StatNumber  fontSize='lg'>{event.startTime.slice(11,16)}</StatNumber>
            </Stat>
            <Stat p={3}>
              <StatLabel>Ends:</StatLabel>
              <StatNumber fontSize='lg'>{event.endTime.slice(11,16)}</StatNumber>
            </Stat>
          </StatGroup>
          
    </Flex>
    <Flex w='40%'>
      <Image src={event.image} />
    </Flex>
    </Flex>
  )
};
