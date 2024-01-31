/*eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";

export const loader = async () => {
  const events = await fetch('http://localhost:3000/events',);
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {


  const { events } = useLoaderData();

  return (
    <Flex gap={[6, 12]}
      flexDir={["column", "row"]}
      justifyContent="center"
      alignItems="center"
      flexWrap={'wrap'}>
      {events.map((event) => (
        <Link key={event.id} to={`/events/${event.id}`}>
          <EventCard event={event}></EventCard>
        </Link>
      ))}

    </Flex>
  );
};
