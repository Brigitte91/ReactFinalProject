import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Image,
  Heading,
  Text,
  Tag,
  StatGroup,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

export const EventCard = ({ event }) => {
  const { categories } = useContext(CategoryContext);
  console.log(categories)


  return (
    <Card
      cursor="pointer"
      _hover={{ transform: "scale(1.01)" }}
      w={[300, 400]}
      h={500}
      flexWrap="wrap"
      backgroundColor="white"
      variant="elevated"
    >
      <CardHeader p="0">
        <Image
          src={event.image}
          w={[300, 400]}
          h={200}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          objectFit="cover"
        />
      </CardHeader>
      <CardBody>
        <Flex flexDir="column" gap={2} justify="center" align="center">
          <Heading fontSize={["md", "xl"]} textAlign="center" mb={2}>
            {event.title}
          </Heading>
          <Flex flexWrap="wrap" flexDir="row" justify="center" gap={2}>
          {event.categoryIds.map((id) => (
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
          <Text noOfLines={4}>{event.description}</Text>
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
      </CardBody>
    </Card>
  );
};
