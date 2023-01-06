import { Box, Button, Select, Text, Textarea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Header from "../components/Header";
import { commentFormat, userInformation } from "../global/Model";
import { useFetch } from "../hooks/Fetch";

export default function ForumModel() {
  const navigate = useNavigate();
  const [comment, setComment] = useState(commentInformation);
  const [username, setUsername] = useState("");
  const [userComment, setUserComment] = useState();
  let { category_id } = useParams();
  console.log(category_id);

  const fetch = useFetch();
  function commentInformation() {
    return {
      comment: "",
      review: 5,
    };
  }

  async function submitComment() {
    let res = await fetch.post("/user/submitcomment", comment);
    return res;
  }
  let commentInformations: commentFormat[] = [
    {
      id: 1,
      username: "tecky",
      comment: "This is so good",
      review: 5,
    },
    {
      id: 2,
      username: "test1234",
      comment: "This is so good",
      review: 5,
    },
    {
      id: 3,
      username: "jerching",
      comment: "This is so good",
      review: 5,
    },
    {
      id: 4,
      username: "miss",
      comment: "This is so good",
      review: 5,
    },
    {
      id: 5,
      username: "jching",
      comment: "This is so good",
      review: 5,
    },
  ];

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  useEffect(() => {
    getUsername();
    if (!localStorage.getItem("token")) {
      return navigate("/");
    }
    query.get("token");
  }, [comment]);
  function logoutAccount() {
    localStorage.removeItem("token");
    return navigate("/");
  }

  async function getUsername() {
    let res: userInformation = await fetch.get("/user/getuserinformation");
    console.log(res.username);

    return setUsername(res.username);
  }

  return (
    <div>
      <Header />
      <Box m={7}>
        <Text fz="xl" m={2}>
          Comment Board
        </Text>
        {commentInformations.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        <Text fz="xl">{username}</Text>

        <Textarea
          placeholder="you can comment in here"
          id="commentBoard"
          onChange={(e) => setComment({ ...comment, comment: e.target.value })}
        />

        <Text fz="2xl">review: </Text>
        <Select
          onChange={(e: any) =>
            setComment({ ...comment, review: +e.target.value })
          }
          data={[
            { value: "5", label: "5" },
            { value: "4", label: "4" },
            { value: "3", label: "3" },
            { value: "2", label: "2" },
            { value: "1", label: "1" },
          ]}
        ></Select>
        <Button onClick={submitComment}>submit</Button>
        <Button onClick={logoutAccount}>Logout</Button>
      </Box>
    </div>
  );
}
