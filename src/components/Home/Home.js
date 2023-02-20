import { useState, useEffect } from "react";
import {
  Button,
  Link,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

import Event from "../Event/Event";
import classes from "./Home.module.css";

export default function Home() {
  const [events, setEvents] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.hackthenorth.com/v3/events");
      setEvents(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Link href="/login">
        <Button
          colorScheme="purple"
          padding="5px 25px"
          position="absolute"
          top="20px"
          right="20px"
        >
          Login
        </Button>
      </Link>
      <Text fontSize="7xl" fontWeight={700} textAlign="center">
        <span className={classes.gradientTitle}>Hack The North</span> 2023
      </Text>
      <Text
        fontSize="3xl"
        fontWeight={500}
        textAlign="center"
        className={classes.description}
      >
        Browse all our <span className={classes.eventsWord}>events</span> and
        build the next big thing at hackathons{" "}
        <span className={classes.worldwideWord}>worldwide!</span>
      </Text>
      <span className={classes.input}>
        <span className={classes.searchBar}>
          <Input variant="outline" bg="white" placeholder="Search..." />
          <Button className={classes.searchButton} colorScheme="blue">
            Search
          </Button>
        </span>
        <Text fontWeight={500} textColor="grey">
          or
        </Text>
        <Menu>
          <MenuButton
            width="20%"
            bg="#c1c9d1"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Filter
          </MenuButton>
          <MenuList>
            <MenuGroup title="Sort By">
              <MenuItem>Start Time</MenuItem>
              <MenuItem>Alphabetical</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Event Type">
              <MenuItem>Workshop</MenuItem>
              <MenuItem>Virtual</MenuItem>
              <MenuItem>In-Person</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </span>
      <SimpleGrid columns={[1, null, 2, null, 3]} spacing="30px">
        {events?.map((event, key) => (
          <Event key={key} event={event} />
        ))}
      </SimpleGrid>
    </div>
  );
}
