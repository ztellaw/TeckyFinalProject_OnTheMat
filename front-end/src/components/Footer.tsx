
import { Box,Container,Group,Button ,Input} from "@mantine/core"
import {  IconHome, IconCalendarDue, IconCirclePlus, IconMapPin, IconPlus, IconUser } from '@tabler/icons';
import './Footer.css'




export  function Footer () {
  return (
      <Container>
        <Group position="center" grow className="footer">
          <Button variant="outline" ><IconHome /></Button>   
          <Button variant="outline"><IconCalendarDue /></Button>
          <Button variant="outline" mb={50} ><IconCirclePlus /></Button>
          <Button variant="outline"><IconMapPin /></Button>
          <Button variant="outline"><IconUser /></Button>
        </Group>

    </Container>

  );
};
