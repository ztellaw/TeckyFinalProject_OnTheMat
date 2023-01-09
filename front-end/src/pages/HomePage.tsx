import { Carousel } from '@mantine/carousel';
import { Input,Button,Grid } from '@mantine/core';
import {  IconSearch } from '@tabler/icons';
import { Footer } from '../components/Footer'



export default function HomePage() {
    return  <div>
    
    Current Location

    <Grid mt={20}>
        <Grid.Col span={9}>        
            <Input 
            icon={<IconSearch />}
            placeholder="Seach"/>
        </Grid.Col>
        <Grid.Col span={3}>        
            <Button>
                Filter
            </Button>
        </Grid.Col>
    </Grid>


    <br />
    <br />
    <br />

    <Carousel slideSize="70%" height={200} align="start" slideGap="md" controlsOffset="xs" loop dragFree>
        <Carousel.Slide>Upcoming Events1</Carousel.Slide>
        <Carousel.Slide>Upcoming Events2</Carousel.Slide>
        <Carousel.Slide>Upcoming Events3</Carousel.Slide>
        <Carousel.Slide>Upcoming Events4</Carousel.Slide>
        <Carousel.Slide>Upcoming Events5</Carousel.Slide>
        <Carousel.Slide>Upcoming Events6</Carousel.Slide>
    </Carousel>

    <Carousel slideSize="70%" height={200} align="start" slideGap="md" controlsOffset="xs" loop dragFree>
        <Carousel.Slide>Nearby You1</Carousel.Slide>
        <Carousel.Slide>Nearby You2</Carousel.Slide>
        <Carousel.Slide>Nearby You3</Carousel.Slide>
        <Carousel.Slide>Nearby You4</Carousel.Slide>
        <Carousel.Slide>Nearby You5</Carousel.Slide>
        <Carousel.Slide>Nearby You6</Carousel.Slide>
    </Carousel>


    <Footer/>




    </div>
    ;
  }
  