import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowBigRight, IconMail } from "@tabler/icons";
import React, { FormEvent, useState } from "react";
import { redirect } from "react-router-dom";
import BackToLogin from "../components/Backtologin";
import Header from "../components/Header";
import { useFetch } from "../hooks/Fetch";

export default function ForgetPassword() {
  const [changeUserInformation, setChangeUserInformation] =
    useState(userInformation);
  const fetch = useFetch();
  const [show, setShow] = useState(false);

  async function changePassword() {
    let res = await fetch.post("/user/changepassword", changeUserInformation);
    redirect("/");
    console.log(res);
    return res;
  }

  function userInformation() {
    return {
      email: "",
    };
  }

  return (
    <div>
      <Container>
        <BackToLogin />
        <Text fz="xl" fw={700}>
          Reset Password
        </Text>
        <Space h="md" />
        <Text fs="italic">
          Please enter your email address to request a password reset
        </Text>
        <Space h="md" />
        <TextInput
          type="email"
          icon={<IconMail />}
          onKeyUp={(e) => e.key == "Enter" && changePassword()}
          onChange={(e) =>
            setChangeUserInformation({
              ...changeUserInformation,
              email: e.target.value,
            })
          }
        />
        <Space h="md" />
        <Group position="center">
          <Button onClick={changePassword} color="violet">
            <Group position="center">
              <Text>SUBMIT</Text>
              <IconArrowBigRight />
            </Group>
          </Button>
        </Group>
      </Container>
    </div>
  );
}
