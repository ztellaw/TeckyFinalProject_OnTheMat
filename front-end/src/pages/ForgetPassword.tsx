import {
  Box,
  Button,
  Container,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import React, { FormEvent, useState } from "react";
import { redirect } from "react-router-dom";
import Header from "../components/Header";
import { useFetch } from "../hooks/Fetch";

export default function ForgetPassword() {
  const [changeUserInformation, setChangeUserInformation] =
    useState(userInformation);
  const fetch = useFetch();
  const [show, setShow] = useState(false);
  function changePasswordStatus() {
    return setShow(!show);
  }

  async function changePassword() {
    let res = await fetch.post("/user/changepassword", changeUserInformation);
    redirect("/");
    console.log(res);

    return res;
  }

  function userInformation() {
    return {
      email: "",
      username: "",
      newPassword: "",
    };
  }

  return (
    <div>
      <Header />
      <Container>
        <Text>Forget Password</Text>

        <TextInput
          label="Email"
          type="email"
          onKeyUp={(e) => e.key == "Enter" && changePassword()}
          onChange={(e) =>
            setChangeUserInformation({
              ...changeUserInformation,
              email: e.target.value,
            })
          }
        />

        <TextInput
          label="Username"
          type="text"
          onKeyUp={(e) => e.key == "Enter" && changePassword()}
          onChange={(e) =>
            setChangeUserInformation({
              ...changeUserInformation,
              username: e.target.value,
            })
          }
        />

        <PasswordInput
          label="Password"
          type={show ? "text" : "password"}
          onKeyUp={(e) => e.key == "Enter" && changePassword()}
          onChange={(e) =>
            setChangeUserInformation({
              ...changeUserInformation,
              newPassword: e.target.value,
            })
          }
        />
        <Button onClick={changePassword}>Submit</Button>
      </Container>
    </div>
  );
}
