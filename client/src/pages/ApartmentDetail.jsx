import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Center, Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { addHotSpot } from "react-pannellum"

import { getApartmentByID } from "../Tableland"
import Image360 from '../components/Image360'
import { formatDate } from '../utils/format';

function ApartmentDetail({ contract360AF }) {
  const { id } = useParams()

  const [imageURL, setImageURL] = useState(null)
  const [apartment, setApartment] = useState({})

  useEffect(() => {
    getApartment()
  }, [])

  const getApartment = async () => {
    try {
      let newApartment = await getApartmentByID(id)
      const newDate = await formatDate(newApartment[0].expire_date)
      newApartment[0].expire_date = newDate
      console.log(newApartment)
      setImageURL(newApartment[0].apt_url)
      setApartment(newApartment[0])

      const response = await fetch(newApartment[0].data_url)
      let data = await response.json()
      data = JSON.parse(data.hotSpotData)
      data.notes.forEach(note => {
        console.log(note)
        addHotSpot(note, "firstScene");
      })
      data.scenes.forEach(scene => {
        console.log(scene)
        addScene(scene, "firstScene");
      })
    } catch (error) {
      console.error(error)
    }
  }


  const renewListing = async () => {
    try {
      const transaction = await contract360AF.renewListing(id)
      const tx = await transaction.wait()
      console.log(tx)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxW='1200px'>
      <Center>
        <Box minWidth='650px'>
          <Flex justifyContent="space-between" alignItems="center" mt="3" mb="4">
            <Heading fontSize="3xl">{apartment.location}</Heading>
            <Text textAlign="left" fontSize="xl">${apartment.price} / month</Text>
          </Flex>

          {imageURL && <Image360 currentImage={imageURL} /> }

          <Text textAlign="left" fontSize="xl" mt="4">
            {apartment.number_of_rooms} rooms
          </Text>

          <Flex justifyContent="space-between" alignItems="center" mt="3" mb="4">
            <Text>Expire in {apartment.expire_date}</Text>
            <Button onClick={renewListing} bg="#0b8457" color="white">
              Renew
            </Button>
          </Flex>
        </Box>
      </Center>
    </Container>
  )
}

export default ApartmentDetail