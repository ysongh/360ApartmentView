import React, { useState } from 'react'
import { Container, Center, FormControl, FormLabel, Box, Heading, Image, Input, Button } from '@chakra-ui/react';

function AddApartment({ contract360AF }) {
  const [imageFile, setImageFile] = useState(null)
  const [link, setLink] = useState("")
  const [numberOfRooms, setNumberOfRooms] = useState("")

  const handleUpload = async (event) => {
    const image = event.target.files[0]
    setImageFile(image)
  }

  const submitUpload = async () => {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch('http://localhost:4000/api/apartment/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json()
    console.log(data)
    setLink(data?.protocolLink)
    const transaction = await contract360AF.insert(data?.protocolLink, numberOfRooms);
    const tx = await transaction.wait();
    console.log(tx);
  }

  return (
    <Container maxW='1200px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Add Apartment</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='numberOfRooms'>Number Of Rooms</FormLabel>
            <Input value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
          </FormControl>

          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Choose a 360 Image of the Apartment</FormLabel>
            <input type='file' id='apartmentPhoto' onChange={handleUpload}/>
          </FormControl>

          {imageFile && <Image src={URL.createObjectURL(imageFile)} alt="Upload Image" /> }

          <Button mt="4" onClick={submitUpload}>Add</Button>

          {link && <p>{link}</p>}
        </Box>
      </Center>
    </Container>
  )
}

export default AddApartment