import { Button, Group, Image, Space, Text } from "@mantine/core";
import { useFetch } from "../hooks/Fetch";
import { signInWithPopup } from "firebase/auth";
import { auth, provide } from "../configs/Firebase";
import { successNotifications } from "../hooks/Notification";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const fetch = useFetch();
  const navigate = useNavigate();

  const googleLogin = async () => {
    const result: any = await signInWithPopup(auth, provide);
    const accessToken = result.user.accessToken;

    let res = await fetch.post("/user/googlelogin", { accessToken });

    localStorage.setItem("token", res.token);

    successNotifications(res.username);
    return navigate(`/forum`);
  };
  return (
    <>
      <Group position="center">
        <Button onClick={googleLogin} variant="subtle">
          <Group position="center">
            <Image width={30} src="./Google_Login.png" />
            <Text fs="italic"> Login with Google</Text>
          </Group>
        </Button>
      </Group>
      <Space h="md" />
    </>
  );
}
