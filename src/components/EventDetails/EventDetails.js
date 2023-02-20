import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Text } from "@chakra-ui/react";
import axios from "axios";

import CustomTag from "../CustomTag/CustomTag";
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

  console.log(event);

  return (
    <div className={classes.container}>
      <Text fontSize="6xl" fontWeight={600}>
        {event?.name}
      </Text>
      <CustomTag event={event} size="lg" />
    </div>
  );
}
