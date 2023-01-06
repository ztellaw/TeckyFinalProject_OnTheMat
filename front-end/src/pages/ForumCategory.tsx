import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { userInformation } from "../global/Model";
import { useFetch } from "../hooks/Fetch";

export default function ForumCategory() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const fetch = useFetch();

  const getUserId = async () => {
    let res: userInformation = await fetch.get("/user/getuserinformation");
    return setUserId(res.id);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/");
    }
    getUserId();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/forum/category/1">瑜珈討論區</Link>
      <br />
      <Link to="/forum/category/2">導師討論區</Link>
      <br />
      <Link to="/forum/category/3">健康食品討論區</Link>
      <br />
      <Link to={`/change`}>Change Information?</Link>
    </div>
  );
}
