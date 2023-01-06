import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { userInformation } from "../global/Model";
import { useFetch } from "../hooks/Fetch";
import { successNotifications } from "../hooks/Notification";

export default function ChangeUserInformation() {
  const [userProfile, setUserProfile] = useState(userInformation);
  const fetch = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let userInformation = await getUserInformation();
      setUserProfile({
        ...userProfile,
        email: userInformation.email,
        username: userInformation.username,
        gender: userInformation.gender,
      });
    })();
  }, []);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  function userInformation() {
    return {
      email: "",
      username: "",
      gender: "",
    };
  }
  async function submitChangedUserInformation() {
    let res = await fetch.post("/user/changeuserinformation", userProfile);
  }
  async function getUserInformation() {
    let res: userInformation = await fetch.get("/user/getuserinformation");
    return res;
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/");
    }
    getUserInformation();
  }, []);

  return (
    <div>
      <Header />
      <Box m={7}>
        <Flex align="center" justify="center" direction="column">
          <Text fz="xl">Change Information</Text>

          <TextInput
            label="Email"
            type="text"
            value={userProfile.email}
            onChange={(e) =>
              setUserProfile({ ...userProfile, email: e.target.value })
            }
          />

          <TextInput
            label="Username"
            type="text"
            value={userProfile.username}
            onChange={(e) =>
              setUserProfile({ ...userProfile, username: e.target.value })
            }
          />

          <Text fz="xl">Gender: </Text>
          <Select
            value={userProfile.gender}
            onChange={(e: any) =>
              setUserProfile({ ...userProfile, gender: e.target.value })
            }
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          ></Select>

          <Button value="submit" onClick={submitChangedUserInformation}>
            Submit
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
