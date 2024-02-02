import React, { useContext } from 'react';
import {
  Flex, Heading, Text, Image, Button, Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Tag, Stat, StatGroup, StatLabel, StatNumber, Card, Avatar
} from '@chakra-ui/react';
import { CategoryContext } from '../components/CategoryContext';
import { UserContext } from '../components/UserContext';
import { useLoaderData } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
export const loader = async ({ params }) => {
  const event = await (await fetch(`http://localhost:3000/events?id=${params.eventId}`)).json()
  return [event]
}


export const EventPage = () => {
  const [event] = useLoaderData()
  const eventDetails = event.length > 0 ? event[0] : null;
  const { categories } = useContext(CategoryContext)
  const { users } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const userId = users.find((id) => {
    return id.id === eventDetails.createdBy;
  });

  if (!userId) {
    return <p>Loading...</p>;
  }

  console.log("event data: ", event)
  return (
    <Flex flexDir='row' w='80vw' justify='center' align='center' m='auto'>
      <Flex w='60%' flexDir='column' justify='center' alignItems='start' gap={10}>
        <Heading>
          {eventDetails.title}
        </Heading>
        <Flex flexWrap="wrap" flexDir="row" justify="center" gap={2}>
          {eventDetails.categoryIds.map((id) => (
            <Tag
              key={id}
              colorScheme="pink"
              variant="subtle"
              fontSize={["xs", "sm"]}
            >
              {categories.find((category) => category.id === id)?.name || `Unknown Category with id ${id}`}
            </Tag>
          ))}
        </Flex>
        <Text>
          {eventDetails.description}
        </Text>
        <StatGroup gap={2} w={['xs', 'sm']} flexDir={['column', 'row']}>
          <Stat>
            <StatLabel>Starts:
            </StatLabel>
            <StatNumber fontSize='lg'>{eventDetails.startTime.substring(0, 10)}{" "}{eventDetails.startTime.substring(11, 16)}</StatNumber>
          </Stat>
          <Stat >
            <StatLabel>Ends:</StatLabel>
            <StatNumber fontSize='lg'>{eventDetails.endTime.substring(0, 10)}{" "}{eventDetails.endTime.substring(11, 16)}</StatNumber>
          </Stat>
        </StatGroup>
        <Card p={2} flexDir='row' align='center' gap={3}>
          <Avatar src={userId.image} />
          <Heading fontSize='sm'>{userId.name}</Heading>

        </Card>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              TExt
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


      </Flex>
      <Flex w='40%'>
        <Image src={eventDetails.image} />
      </Flex>
    </Flex>
  )
};
