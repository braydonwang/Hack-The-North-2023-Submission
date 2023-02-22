import { useContext, useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Text, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";

import Event from "../Event/Event";
import classes from "./HorizontalScrollbar.module.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Text onClick={() => scrollPrev()} className={classes.arrow}>
      <ChevronLeftIcon fontSize="large" style={{ margin: "0 5px" }} />
    </Text>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Text onClick={() => scrollNext()} className={classes.arrow}>
      <ChevronRightIcon fontSize="large" style={{ margin: "0 5px" }} />
    </Text>
  );
};

export default function HorizontalScrollbar({ data }) {
  const [events, setEvents] = useState(undefined);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.hackthenorth.com/v3/events");
      setEvents(res.data);
    };

    fetchData();
  }, []);

  return (
    events && (
      <Box width={["90vw", null, "70vw", "60vw"]}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          className={classes.scrollmenu}
        >
          {data.map((item, ind) => (
            <Event event={events[item - 1]} key={ind} user={user} />
          ))}
        </ScrollMenu>
      </Box>
    )
  );
}
