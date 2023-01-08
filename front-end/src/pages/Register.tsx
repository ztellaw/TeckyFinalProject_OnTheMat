import React, { useState } from "react";

import { useFetch } from "../hooks/Fetch";

import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  PasswordInput,
  Select,
  Space,
  Text,
  TextInput,
  Image,
} from "@mantine/core";
import {
  errorNotifications,
  successNotifications,
} from "../hooks/Notification";
import {
  IconArrowBigLeft,
  IconArrowBigRight,
  IconAt,
  IconCake,
  IconEye,
  IconEyeCheck,
  IconEyeOff,
  IconLock,
  IconMail,
  IconPassword,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import { DatePicker } from "@mantine/dates";
import { signInWithPopup } from "firebase/auth";
import { auth, provide } from "../configs/Firebase";
import BackToLogin from "../components/Backtologin";
import SignInOrSignUp from "../components/SignInOrSignUp";
import GoogleLogin from "../components/GoogleLogin";

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
  const googleLogin = async () => {
    const result: any = await signInWithPopup(auth, provide);
    const accessToken = result.user.accessToken;

    let res = await fetch.post("/user/googlelogin", { accessToken });

    localStorage.setItem("token", res.token);

    successNotifications(res.username);
    return navigate(`/forum`);
  };

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
      <Container>
        <BackToLogin />
        <Text fz="xl" fw={700}>
          Sign up
        </Text>
        <Space h="md" />
        <TextInput
          placeholder="First name"
          icon={<IconUser />}
          radius="md"
          withAsterisk
          onKeyUp={(e) => e.key == "Enter" && registerUser()}
          onChange={(e) =>
            setSendUserInformation({
              ...sendUserInformation,
              first_name: e.target.value,
            })
          }
        />
        <Space h="md" />
        <TextInput
          placeholder="Last name"
          icon={<IconUser />}
          radius="md"
          withAsterisk
          onKeyUp={(e) => e.key == "Enter" && registerUser()}
          onChange={(e) =>
            setSendUserInformation({
              ...sendUserInformation,
              last_name: e.target.value,
            })
          }
        />
        <Space h="md" />

        <TextInput
          placeholder="abc@email.com"
          withAsterisk
          radius="md"
          icon={<IconMail />}
          onKeyUp={(e) => e.key == "Enter" && registerUser()}
          onChange={(e) =>
            setSendUserInformation({
              ...sendUserInformation,
              email: e.target.value,
            })
          }
        ></TextInput>
        <Space h="md" />

        <PasswordInput
          withAsterisk
          radius="md"
          placeholder="Your password"
          icon={<IconLock />}
          onKeyUp={(e) => e.key == "Enter" && registerUser()}
          onChange={(e) =>
            setSendUserInformation({
              ...sendUserInformation,
              password: e.target.value,
            })
          }
        />
        <Space h="md" />

        <Select
          placeholder="Your gender"
          radius="md"
          withAsterisk
          icon={<IconUsers />}
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
        <Space h="md" />

        <DatePicker
          icon={<IconCake />}
          radius="md"
          placeholder="Your Birthday"
          withAsterisk
          onChange={(e: any) => {
            setSendUserInformation({
              ...sendUserInformation,
              birth_date: e,
            });
          }}
        />
        <Space h="md" />
        <Container>
          <Group position="center">
            <Button
              value="submit"
              onClick={registerUser}
              color="violet"
              radius="md"
            >
              <Text>SIGN UP</Text>
              <IconArrowBigRight />
            </Button>
          </Group>
        </Container>
        <Space h="md" />
        <Group position="center">
          <Text>OR</Text>
        </Group>
        <Space h="md" />
        <Group position="center">
          <Link to="/busincesslogin">
            <Text fs="italic">Sign up as business</Text>
          </Link>
        </Group>
        <Space h="md" />
        <GoogleLogin />
        <SignInOrSignUp
          router={"/"}
          text={"Already"}
          signInOrSignOut={"Sign in"}
        />
      </Container>
    </div>
  );
}
