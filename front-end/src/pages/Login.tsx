import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provide } from "../configs/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useFetch } from "../hooks/Fetch";
import Header from "../components/Header";

import {
  Box,
  Button,
  Container,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  errorNotifications,
  successNotifications,
} from "../hooks/Notification";
import { IconBrandGoogle, IconMail } from "@tabler/icons";

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
      <Container>
        <Text fz="xl">Sign In</Text>

        <TextInput
          label="Email"
          type="text"
          icon={<IconMail />}
          onKeyUp={(e) => e.key == "Enter" && confirmLogin()}
          onChange={(e) =>
            setSendLoginInformation({
              ...sendLoginInformation,
              email: e.target.value,
            })
          }
        />

        <PasswordInput
          label="Password"
          onKeyUp={(e) => e.key == "Enter" && confirmLogin()}
          onChange={(e) => {
            setSendLoginInformation({
              ...sendLoginInformation,
              password: e.target.value,
            });
          }}
        />

        <Button type="submit" onClick={confirmLogin}>
          Login
        </Button>
        <br />
        <Button onClick={googleLogin} variant="subtle">
          <IconBrandGoogle />
        </Button>
        <br />
        <Link to="/register">No account?</Link>
        <br />
        <Link to="/forgetpassword">Forget Password?</Link>
        <br />
        <Link to="/payment">Payment</Link>
      </Container>
    </div>
  );
}
