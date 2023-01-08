import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provide } from "../configs/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useFetch } from "../hooks/Fetch";

import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Image,
  Switch,
  Space,
  BackgroundImage,
} from "@mantine/core";
import {
  errorNotifications,
  successNotifications,
} from "../hooks/Notification";
import {
  IconArrowBigRight,
  IconBrandGoogle,
  IconLock,
  IconMail,
} from "@tabler/icons";
import SignInOrSignUp from "../components/SignInOrSignUp";
import GoogleLogin from "../components/GoogleLogin";
import ButtonSubmit from "../components/SubmitButton";
import SubmitButton from "../components/SubmitButton";

export default function Login() {
  const [sendLoginInformation, setSendLoginInformation] =
    useState(loginInformation);

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

  async function confirmLogin() {
    console.log(sendLoginInformation);

    let result = await fetch.post("/user/login", sendLoginInformation);

    if (result.messages) {
      return errorNotifications(result.messages);
    }
    localStorage.setItem("token", result.token);
    successNotifications("Login Successful!!");

    return navigate(`/forum`);
  }

  function loginInformation() {
    return {
      email: "",
      password: "",
    };
  }
  return (
    <div>
      <BackgroundImage src="./YOGA_BackgroundImage.png" />
      <Container>
        <Container>
          <Image
            radius="sm"
            src="./YOGA_Image.png"
            alt="Random unsplash image"
          />
          <Text fz="xl" fw={700}>
            Sign In
          </Text>
          <Space h="md" />

          <TextInput
            type="text"
            placeholder="abc@email.com"
            icon={<IconMail />}
            onKeyUp={(e) => e.key == "Enter" && confirmLogin()}
            onChange={(e) =>
              setSendLoginInformation({
                ...sendLoginInformation,
                email: e.target.value,
              })
            }
          />
          <Space h="md" />

          <PasswordInput
            icon={<IconLock />}
            placeholder="Your password"
            onKeyUp={(e) => e.key == "Enter" && confirmLogin()}
            onChange={(e) => {
              setSendLoginInformation({
                ...sendLoginInformation,
                password: e.target.value,
              });
            }}
          />
        </Container>
        <Space h="md" />
        <Group position="right">
          <Link to="/forgetpassword">
            <Text fs="italic">Forget password?</Text>
          </Link>
        </Group>
        <Space h="md" />
        <SubmitButton onClick={confirmLogin} color="violet" type="next">
          Login
        </SubmitButton>
        <Space h="md" />
        <Group position="center">
          <Text>OR</Text>
        </Group>
        <Space h="md" />
        <GoogleLogin />
        <SignInOrSignUp
          router={"/register"}
          text={"Don't"}
          signInOrSignOut={"Sign up"}
        />
      </Container>
    </div>
  );
}
