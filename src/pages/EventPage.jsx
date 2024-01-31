import React, { useContext } from 'react';
import { Flex, Heading, Text, Image, Button, Modal, Tag, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { CategoryContext } from '../components/CategoryContext';
import { UserContext } from '../components/UserContext';
import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/events/${params.eventId}`,)
  const event = await response.json()
  console.log(event.id)
  return { event }
}


export const EventPage = () => {
  const { event } = useLoaderData()

  console.log("event data: ", event)
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
            <StatNumber fontSize='lg'>{event.startTime.slice(11, 16)}</StatNumber>
          </Stat>
          <Stat p={3}>
            <StatLabel>Ends:</StatLabel>
            <StatNumber fontSize='lg'>{event.endTime.slice(11, 16)}</StatNumber>
          </Stat>
        </StatGroup>

      </Flex>
      <Flex w='40%'>
        <Image src={event.image} />
      </Flex>
    </Flex>
  )
};
