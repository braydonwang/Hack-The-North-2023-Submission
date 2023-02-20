import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Text, Link, Button, ButtonGroup } from "@chakra-ui/react";
import { TimeIcon, InfoOutlineIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

import CustomTag from "../CustomTag/CustomTag";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";
import classes from "./EventDetails.module.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.hackthenorth.com/v3/events/${id}`
      );
      setEvent(res.data);
    };

    fetchData();
  }, [id]);

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

  return (
    event && (
      <div className={classes.container}>
        <Text
          fontSize="6xl"
          fontWeight={600}
          marginBottom="15px"
          marginRight="10vw"
        >
          {event.name}
        </Text>
        <CustomTag event={event} size="lg" width={110} />
        <Text
          fontSize="3xl"
          fontWeight={400}
          maxWidth="60vw"
          marginTop="30px"
          marginBottom="15px"
        >
          {event.description}
        </Text>
        <Text fontSize="2xl" marginBottom="10px">
          <span style={{ fontWeight: 600 }}>Speakers: </span>
          {event.speakers.map((speaker) => speaker.name)}
        </Text>
        <span className={classes.time}>
          <TimeIcon marginRight="10px" boxSize={6} />
          <Text fontWeight={600} fontSize="2xl">
            {convertTime()}
          </Text>
        </span>
        <ButtonGroup marginBottom="40px">
          {event.public_url && (
            <Link
              href={event.public_url}
              isExternal
              style={{ textDecoration: "none" }}
            >
              <Button variant="solid" colorScheme="blue" size="lg">
                Learn More
                <InfoOutlineIcon marginLeft="10px" />
              </Button>
            </Link>
          )}
          <Link
            href={event.private_url}
            isExternal
            style={{ textDecoration: "none" }}
          >
            <Button variant="solid" colorScheme="yellow" size="lg">
              View Event
              <ViewIcon marginLeft="10px" />
            </Button>
          </Link>
        </ButtonGroup>
        <HorizontalScrollbar data={event.related_events} />
      </div>
    )
  );
}
