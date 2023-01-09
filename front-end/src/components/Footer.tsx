
import { Box,Container,Group,Button ,Input} from "@mantine/core"
// import {  IconHome, IconCalendarDue, IconCirclePlus, IconMapPin, IconPlus, IconUser } from '@tabler/icons';
import './Footer.css'




export  function Footer () {
  return (
      <Container>
        <Group position="center" grow className="footer">
          <Button variant="outline" >HOME</Button>   
          <Button variant="outline">Calender</Button>
          <Button variant="outline" mb={50} >ADD</Button>
          <Button variant="outline">Nearby</Button>
          <Button variant="outline">Profile</Button>
        </Group>

        {/* <Input icon={<IconHome />}
        ></Input>        
        <Input icon={<IconCalendarDue />}
        ></Input> 
        <Input icon={<IconCirclePlus />}
        ></Input>
        <Input icon={<IconMapPin />}
        ></Input>
        <Input icon={<IconUser />}
        ></Input> */}
    </Container>

  );
};
