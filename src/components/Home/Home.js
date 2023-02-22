// Third-party libraries
import { useState, useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Button,
  Link,
  Text,
  Input,
  Flex,
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

// Components/Classes
import Event from "../Event/Event";
import classes from "./Home.module.css";

// All valid event types
const allEvents = ["workshop", "tech_talk", "activity"];

export default function Home() {
  // Current user data from local device
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // Current filter type fetched from local device
  const [filter, setFilter] = useState(
    localStorage.getItem("filter") ?? "Filter"
  );
  // All events data
  const [events, setEvents] = useState(undefined);
  // All events re-ordered based on filter type
  const [filteredEvents, setFilteredEvents] = useState(undefined);
  // Search bar input
  const [search, setSearch] = useState("");

  // Fetch all events from API endpoint
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.hackthenorth.com/v3/events");
      setEvents(res.data);
    };

    fetchData();
  }, []);

  // Change filtered events when filter type or events are modified
  useEffect(() => {
    if (events) {
      var newEvents = JSON.parse(JSON.stringify(events));
      if (
        allEvents.some((event) => {
          return event === filter;
        })
      ) {
        newEvents = events.filter((event) => {
          return event.event_type === filter;
        });
      } else {
        if (filter === "time (oldest)") {
          newEvents.sort((a, b) => {
            return a.start_time - b.start_time;
          });
        } else if (filter === "time (newest)") {
          newEvents.sort((a, b) => {
            return b.end_time - a.end_time;
          });
        } else {
          newEvents.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        }
      }
      setFilteredEvents(newEvents);
    }
  }, [filter, events]);

  // Logout user
  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  // Choose filter type
  const handleChooseFilter = (newFilter) => {
    setFilter(newFilter);
    localStorage.setItem("filter", newFilter);
  };

  // Controlled search bar input
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Return filtered events from search input through Regex matching
  const handleSearch = () => {
    if (search.length > 0) {
      const newEvents = events.filter((event) => {
        return event.name.toLocaleLowerCase().match(search.toLocaleLowerCase());
      });
      setSearch("");
      setFilteredEvents(newEvents);
    }
  };

  return (
    <div className={classes.container}>
      {!user ? (
        <Link as={ReachLink} to="/login">
          <Button
            colorScheme="purple"
            size={["sm", null, "md"]}
            position="absolute"
            top="20px"
            right="20px"
          >
            Login
          </Button>
        </Link>
      ) : (
        <Button
          colorScheme="purple"
          size={["sm", null, "md"]}
          position="absolute"
          top="20px"
          right="20px"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
      <Text
        fontSize={["4xl", "5xl", "6xl", "7xl"]}
        fontWeight={700}
        textAlign="center"
      >
        <span className={classes.gradientTitle}>Hack The North</span> 2023
      </Text>
      <Text
        fontSize={["20px", "2xl", "3xl"]}
        fontWeight={500}
        textAlign="center"
        className={classes.description}
      >
        Browse all our <span className={classes.eventsWord}>events</span> and
        build the next big thing at{" "}
        <span className={classes.canadaWord}>Canada's</span> largest hackathon!
      </Text>
      <Flex direction={{ base: "column", md: "row" }} className={classes.input}>
        <Flex minWidth={["300px", "400px"]} className={classes.searchBar}>
          <Input
            value={search}
            onChange={handleChange}
            variant="outline"
            bg="white"
            placeholder="Search..."
          />
          <Button
            className={classes.searchButton}
            colorScheme="blue"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <Text fontWeight={500} textColor="grey">
          or
        </Text>
        <Menu>
          <MenuButton
            minWidth={["150px", "200px"]}
            bg="#c1c9d1"
            as={Button}
            rightIcon={<ChevronDownIcon />}
            textTransform="capitalize"
          >
            {filter.replace(/[^a-zA-Z0-9()]/g, " ")}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Sort By">
              <MenuItem onClick={() => handleChooseFilter("time (oldest)")}>
                Time (Oldest)
              </MenuItem>
              <MenuItem onClick={() => handleChooseFilter("time (newest)")}>
                Time (Newest)
              </MenuItem>
              <MenuItem onClick={() => handleChooseFilter("alphabetical")}>
                Alphabetical
              </MenuItem>
            </MenuGroup>
            <MenuDivider />

            <MenuGroup title="Event Type">
              {allEvents.map((eventName, ind) => (
                <MenuItem
                  onClick={() => handleChooseFilter(eventName)}
                  textTransform="capitalize"
                  key={ind}
                >
                  {eventName.replace(/[^a-zA-Z0-9]/g, " ")}
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      <SimpleGrid columns={[1, null, 2, null, 3]} spacing="10px">
        {filteredEvents
          ? filteredEvents.map((event, key) => (
              <Event key={key} event={event} user={user} />
            ))
          : events?.map((event, key) => (
              <Event key={key} event={event} user={user} />
            ))}
      </SimpleGrid>
    </div>
  );
}
