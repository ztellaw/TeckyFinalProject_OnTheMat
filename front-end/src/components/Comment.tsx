import { Box, Card, Text } from "@mantine/core";
import { commentFormat } from "../global/Model";

export default function Comment(props: { comment: commentFormat }) {
  const { comment } = props;
  return (
    <Box>
      <Card>
        <Text>{comment.username}</Text>
        <Text>{comment.comment}</Text>
        <Text>{comment.review} Star</Text>
      </Card>
    </Box>
  );
}
