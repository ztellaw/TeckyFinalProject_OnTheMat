import React, { useState } from "react";

import { useFetch } from "../hooks/Fetch";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  PasswordInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import {
  errorNotifications,
  successNotifications,
} from "../hooks/Notification";
import {
  IconAt,
  IconEye,
  IconEyeCheck,
  IconEyeOff,
  IconPassword,
} from "@tabler/icons";
import { DatePicker } from "@mantine/dates";

export default function Register() {
  const [show, setShow] = useState(false);
  const [sendUserInformation, setSendUserInformation] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    gender: "male",
    birth_date: "",
  });
  const navigate = useNavigate();

  const fetch = useFetch();

  function userInformation() {
    console.log(sendUserInformation);

    return {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      gender: "male",
      birth_date: "",
    };
  }

  async function registerUser() {
    let result = await fetch.post("/user/register", sendUserInformation);

    if (result.messages) {
      return errorNotifications(result.messages);
    }

    successNotifications(result.success);

    return navigate("/");
  }
  return (
    <div>
      <Header />
      <Box m={7}>
        <Container>
          <Text fz="xl">Register</Text>

          <TextInput
            label="Email"
            withAsterisk
            icon={<IconAt size={14} />}
            onKeyUp={(e) => e.key == "Enter" && registerUser()}
            onChange={(e) =>
              setSendUserInformation({
                ...sendUserInformation,
                email: e.target.value,
              })
            }
          ></TextInput>

          <TextInput
            label="First name"
            withAsterisk
            onKeyUp={(e) => e.key == "Enter" && registerUser()}
            onChange={(e) =>
              setSendUserInformation({
                ...sendUserInformation,
                first_name: e.target.value,
              })
            }
          />

          <TextInput
            label="Last name"
            withAsterisk
            onKeyUp={(e) => e.key == "Enter" && registerUser()}
            onChange={(e) =>
              setSendUserInformation({
                ...sendUserInformation,
                last_name: e.target.value,
              })
            }
          />

          <PasswordInput
            label="Password"
            withAsterisk
            icon={<IconPassword />}
            onKeyUp={(e) => e.key == "Enter" && registerUser()}
            onChange={(e) =>
              setSendUserInformation({
                ...sendUserInformation,
                password: e.target.value,
              })
            }
          />

          <Select
            label="Gender"
            withAsterisk
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            onChange={(e: any) =>
              setSendUserInformation({
                ...sendUserInformation,
                gender: e.target.value,
              })
            }
          ></Select>

          <DatePicker
            placeholder="Pick date"
            label="Birthday"
            withAsterisk
            onChange={(e: any) => {
              console.log(e);

              setSendUserInformation({
                ...sendUserInformation,
                birth_date: e,
              });
            }}
          />

          <Button value="submit" onClick={registerUser}>
            Register
          </Button>
        </Container>
      </Box>
    </div>
  );
}
