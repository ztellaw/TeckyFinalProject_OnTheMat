import { Box, Button, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/Fetch";

export default function Header() {
  const [member, setMember] = useState(false);
  const [username, setUsername] = useState("");
  const fetch = useFetch();

  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Text fz="xl" m={2}>
          YOGA Class Pass & Calendy
        </Text>
        {member ? (
          <Box>
            <Text>Welcome back {member}</Text>
          </Box>
        ) : (
          <Box>
            <Button m={2}>
              <Link to="/">Login</Link>
            </Button>
            <Button m={2}>
              <Link to="/register">Register</Link>
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
