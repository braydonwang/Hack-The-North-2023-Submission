import { useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  Divider,
  Button,
  Link,
  LinkOverlay,
} from "@chakra-ui/react";
import { TimeIcon, InfoOutlineIcon, LockIcon } from "@chakra-ui/icons";
import CustomTag from "../CustomTag/CustomTag";

import classes from "./Event.module.css";

export default function Event({ event }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const convertTime = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const startDate = new Date(event.start_time);
    const endDate = new Date(event.end_time);

    const startMonth = months[startDate.getMonth()];
    const endMonth = months[endDate.getMonth()];
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    return `${startMonth} ${startDay}, ${startYear} to ${endMonth} ${endDay}, ${endYear}`;
  };

  console.log(event);

  return (
    <Card maxW="sm" variant="outline">
      {event.permission === "private" && (
        <LockIcon position="absolute" top="15px" right="15px" />
      )}
      <CardBody>
        <LinkOverlay
          href={
            !user && event.permission === "private"
              ? "/login"
              : `/event/${event.id}`
          }
        >
          <Stack mt="6" spacing="3">
            <Heading size="md">{event.name}</Heading>
            <CustomTag event={event} />
            <Text noOfLines={4}>{event.description}</Text>
            <span className={classes.time}>
              <TimeIcon marginRight="10px" />
              <Text fontWeight={600} fontSize="14px">
                {convertTime()}
              </Text>
            </span>
          </Stack>
        </LinkOverlay>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          href={event.public_url ? event.public_url : event.private_url}
          isExternal
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="solid"
            colorScheme="blue"
            isDisabled={event.permission === "private" && !user}
          >
            Learn More
            <InfoOutlineIcon marginLeft="10px" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
