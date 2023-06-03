import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Center, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { addHotSpot } from "react-pannellum"

import { getApartmentByID } from "../Tableland"
import Image360 from '../components/Image360'

function ApartmentDetail() {
  const { id } = useParams()

  const [imageURL, setImageURL] = useState(null)
  const [apartment, setApartment] = useState({})

  useEffect(() => {
    getApartment()
  }, [])

  const getApartment = async () => {
    try {
      const newApartment = await getApartmentByID(id)
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
        </Box>
      </Center>
    </Container>
  )
}

export default ApartmentDetail