import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/Fetch";
import backgroundImage from "./img/YOGA_BackgroundImage.png";

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
  Space,
  BackgroundImage,
} from "@mantine/core";
import {
  errorNotifications,
  successNotifications,
} from "../hooks/Notification";
import { IconLock, IconMail } from "@tabler/icons";
import SignInOrSignUp from "../components/SignInOrSignUp";
import GoogleLogin from "../components/GoogleLogin";
import SubmitButton from "../components/SubmitButton";
import { useForm } from "@mantine/form";
import { loginFormat, Rule } from "../global/Model";
import { genValidator } from "../hooks/getValidator";

export default function Login() {
  const navigate = useNavigate();

  const fetch = useFetch();

  const form = useForm({
    initialValues: { email: "", password: "" },
    // validateInputOnChange: true,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: genValidator([
        {
          reason: "the password must be at least 8 characters",
          match: (value) => value.length < 8,
        },
        {
          reason: "the password must consist of a lowercase letter",
          match: (value) => !value.match(/[a-z]/),
        },
        {
          reason: "the password must consist of a upper letter",
          match: (value) => !value.match(/[A-Z]/),
        },
        {
          reason: "the password must consist of a symbol",
          match: (value) =>
            !`\`~!@#$%^&*()_+-=[]{};':",./<>?\\|`
              .split("")
              .some((c) => value.includes(c)),
        },
      ]),
    },
  });

  async function confirmLogin(value: loginFormat) {
    console.log(value);

    let result = await fetch.post("/user/login", value);

    if (result.messages) {
      return errorNotifications(result.messages);
    }
    localStorage.setItem("token", result.token);
    successNotifications("Login Successful!!");

    return navigate(`/forum`);
  }

  return (
    <div>
      <BackgroundImage src={backgroundImage} />
      <form onSubmit={form.onSubmit((value) => confirmLogin(value))}>
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
            {...form.getInputProps("email")}
          />
          <Space h="md" />

          <PasswordInput
            icon={<IconLock />}
            placeholder="Your password"
            {...form.getInputProps("password")}
            className="custom-validate-input-field"
          />
        </Container>
      </form>
      <Space h="md" />
      <Group position="right">
        <Link to="/forgetpassword">
          <Text fs="italic">Forget password?</Text>
        </Link>
      </Group>
      <Space h="md" />
      <SubmitButton
        onClick={form.onSubmit((value) => confirmLogin(value))}
        color="violet"
        type="next"
      >
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
      <Space h="md" />
    </div>
  );
}
