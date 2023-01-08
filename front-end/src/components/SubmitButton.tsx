import { Button, Group, Text } from "@mantine/core";
import { IconArrowBigRight } from "@tabler/icons";

export const icons = {
  next: <IconArrowBigRight />,
  submit: <IconArrowBigRight />,
};

type Icons = typeof icons;

export default function IconButton(props: {
  children: string;
  onClick: () => void;
  color?: string;
  type: keyof Icons;
}) {
  return (
    <Group position="center">
      <Button
        type="submit"
        onClick={props.onClick}
        color={props.color || "violet"}
        radius="md"
      >
        <Group>
          <Text>{props.children}</Text>
          {icons[props.type]}
        </Group>
      </Button>
    </Group>
  );
}
