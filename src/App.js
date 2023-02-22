// Third-party libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// Components/Classes
import Home from "./components/Home/Home";
import EventDetails from "./components/EventDetails/EventDetails";
import Login from "./components/Login/Login";

export default function App() {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        minH="100vh"
        bgGradient="linear(to-r, rgba(239, 183, 186, 0.2), rgba(229, 192, 200, 0.2), rgba(250, 250, 251, 0.2), rgba(203, 213, 240, 0.2), rgba(25, 79, 146, 0.2), rgba(149, 244, 217, 0.2))"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/event/:id" element={<EventDetails />}></Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}
