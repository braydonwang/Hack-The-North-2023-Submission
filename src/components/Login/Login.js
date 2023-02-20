import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { BsPersonFill } from "react-icons/bs";

import classes from "./Login.module.css";

const validUsers = [
  {
    username: "Hacker",
    password: "1234",
  },
  {
    username: "Braydon",
    password: "abc",
  },
  {
    username: "HTN23",
    password: "2023",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (
      validUsers.some((user) => {
        return user.username === username && user.password === password;
      })
    ) {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      navigate("/");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className={classes.container}>
      <Stack
        bg="white"
        padding="60px 70px"
        spacing={6}
        borderRadius="20px"
        border="2px"
        borderColor="grey"
      >
        <Text fontSize="5xl" fontWeight={600}>
          Login
        </Text>
        {showAlert && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Invalid Credentials!</AlertTitle>
          </Alert>
        )}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BsPersonFill} color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
          />
        </InputGroup>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="gray.300" />}
          />
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </Stack>
    </div>
  );
}
