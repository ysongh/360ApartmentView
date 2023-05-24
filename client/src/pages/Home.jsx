import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, SimpleGrid, Heading, Card, CardBody, CardFooter, Image, Button, Text } from '@chakra-ui/react'

import { getApartments, } from "../Tableland";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const apartments = await getApartments();
      setData(apartments)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <Container maxW='1100px' mt='3'>
      <Heading mb='2'>Apartments</Heading>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {data.map(d => (
            <Card key={d.id} >
            <CardBody>
              <Image src={d.apt_url} alt="Product" w='full' />
              <Heading fontSize='lg' mt='3'>{d.location}, {d.number_of_rooms} Rooms</Heading>
            </CardBody>
            <CardFooter>
              <Button mr='2'  onClick={() => navigate(`/apartmentdetail/${d.id}`)}>
                View 
              </Button>
              <Text fontSize='lg' mt='1'>${d.price} per month</Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home