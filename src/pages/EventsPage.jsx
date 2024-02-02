/*eslint-disable*/

import React, { useEffect, useState } from "react";
import {
  Flex, Heading, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { EventSearch } from "../components/EventSearch";

export const loader = async () => {
  const events = await fetch('http://localhost:3000/events',);
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()



  useEffect(() => {
    if (events) {
      console.log(events)
      const searchResult = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredEvents(searchResult);
  }
    , [searchTerm, events]);

  return (
    <Flex flexDir='column' align='center' justify='center'>
      <Heading mb={10}>Events</Heading>

      <EventSearch searchTerm={searchTerm} onSearchChange={setSearchTerm}></EventSearch>
      <Flex
        gap={[6, 12]}
        flexDir={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        flexWrap={'wrap'}
      >
        {filteredEvents.map((event) => (

          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard event={event}></EventCard>
          </Link>
        ))}
      </Flex>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>,
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            bodt          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};