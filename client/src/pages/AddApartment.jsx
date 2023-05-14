import React, { useState } from 'react'
import { Container, Center, FormControl, FormLabel, Box, Heading, Image, Button } from '@chakra-ui/react';

function AddApartment() {
  const [imageFile, setImageFile] = useState(null)

  const handleUpload = async (event) => {
    const image = event.target.files[0]
    setImageFile(image)
  }

  const submitUpload = async () => {
    console.log(imageFile)
  }

  return (
    <Container maxW='1200px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Add Apartment</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Choose a 360 Image of the Apartment</FormLabel>
            <input type='file' id='apartmentPhoto' onChange={handleUpload}/>
          </FormControl>

          {imageFile && <Image src={URL.createObjectURL(imageFile)} alt="Upload Image" /> }

          <Button mt="4" onClick={submitUpload}>Add</Button>
        </Box>
      </Center>
    </Container>
  )
}

export default AddApartment