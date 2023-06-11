import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, SimpleGrid, Heading, Card, CardBody, CardFooter, Image, Button, Text } from '@chakra-ui/react'

import { getApartmentByAddress } from "../Tableland";

function MyList({ ethAddress }) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const apartments = await getApartmentByAddress(ethAddress);
      setData(apartments)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <Container maxW='1100px' mt='3'>
      <Heading mb='2'>My Listing</Heading>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {data.map(d => (
            <Card key={d.id} >
            <CardBody>
              <Image src={d.apt_url} alt="Product" w='full' />
              <Heading fontSize='lg' mt='3'>{d.location}, {d.number_of_rooms} Rooms</Heading>
            </CardBody>
            <CardFooter>
              <Button mr='5' bg="#0b8457" color="white" onClick={() => navigate(`/apartmentdetail/${d.id}`)}>
                View 
              </Button>
              <Text fontSize='lg' mt='1'>{!d.is_show && "Expired"}</Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default MyList