import { Space } from "@mantine/core";
import { IconArrowBigLeft } from "@tabler/icons";
import { Link } from "react-router-dom";

export default function BackToLogin() {
  return (
    <div>
      <Space h="md" />
      <Link to="/">
        <IconArrowBigLeft />
      </Link>
      <Space h="md" />
    </div>
  );
}
