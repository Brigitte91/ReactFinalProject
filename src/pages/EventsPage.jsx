/*eslint-disable*/

import React, { useEffect, useState, useContext } from "react";
import {
  Flex, Heading, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Select
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { EventSearch } from "../components/EventSearch";
import { CategoryContext } from "../components/CategoryContext";

export const loader = async () => {
  const events = await fetch('http://localhost:3000/events',);
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categories } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (events) {
      let filteredEvents = events;
      console.log('Events:', events);
      console.log('Selected Category (useeffect):', selectedCategory);


      if (selectedCategory !== '') {
        console.log('filtering by category:', selectedCategory)
        filteredEvents = events.filter(event =>
          event.categoryIds.some(categoryId =>
            categories.find(category => category.id === categoryId)?.name === selectedCategory
          )
        );
      }


      if (searchTerm !== '') {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredEvents(filteredEvents);
    }
  }, [searchTerm, selectedCategory, events]);

  const handleCategoryChange = (category) => {
    console.log('selected category:', category)
    setSelectedCategory(category);
  };


  return (
    <Flex flexDir='column' align='center' justify='center'>
      <Heading mb={10}>Events</Heading>
      <Flex flexDir='[column, row]' w={"xl"} gap={5} mb={5}>
        <EventSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} ></EventSearch>

        <label htmlFor="category">Filter by Category:</label>
        <Select id="category" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}

        </Select>
      </Flex>
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
      <Button onClick={onOpen} >Add event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>,
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            body          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={onClose} mr={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex >
  );
};