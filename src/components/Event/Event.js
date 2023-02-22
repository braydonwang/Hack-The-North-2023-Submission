// Third-party libraries
import { Link as ReachLink } from "react-router-dom";
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

// Components/Classes
import CustomTag from "../CustomTag/CustomTag";
import { convertTime } from "../../ConvertTime";
import classes from "./Event.module.css";

export default function Event({ event, user }) {
  return (
    <Card
      minW="250px"
      maxW="sm"
      variant="outline"
      height="100%"
      margin="10px 10px"
      _hover={{ borderColor: "#0070f3" }}
    >
      {event.permission === "private" && (
        <LockIcon position="absolute" top="15px" right="15px" />
      )}
      <CardBody>
        <LinkOverlay
          as={ReachLink}
          to={
            !user && event.permission === "private"
              ? "/login"
              : `/event/${event.id}`
          }
        >
          <Stack mt="6" spacing="3">
            <Heading size="md">{event.name}</Heading>
            <CustomTag event={event} size="md" width={90} />
            <Text noOfLines={4}>{event.description}</Text>
            <span className={classes.time}>
              <TimeIcon marginRight="10px" />
              <Text fontWeight={600} fontSize="14px">
                {convertTime(event)}
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
