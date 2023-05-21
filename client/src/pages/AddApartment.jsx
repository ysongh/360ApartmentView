import React, { useState } from 'react'
import { Container, Center, FormControl, FormLabel, Box, Heading, Tabs, Tab, TabPanels, TabPanel, TabList, Link, Input, Button } from '@chakra-ui/react';
import { getConfig, addHotSpot } from "react-pannellum"

import Image360 from '../components/Image360'

function AddApartment({ contract360AF }) {
  const [imageFile, setImageFile] = useState(null)
  const [link, setLink] = useState("")
  const [link2, setLink2] = useState("")
  const [numberOfRooms, setNumberOfRooms] = useState("")
  const [notes, setNotes] = useState([])
  const [scenes, setScenes] = useState([])
  const [loading, setLoading] = useState("")

  const [message, setMessage] = useState("")
  const [url, setURL] = useState("")

  const handleUpload = async (event) => {
    const image = event.target.files[0]
    setImageFile(image)
  }

  const submitUpload = async () => {
    try {
      setLoading(true)

      const apartmentURL = await uploadToSpheronStorage(imageFile)
      setLink(apartmentURL)

      const hotSpotData = JSON.stringify({ 
        notes,
        scenes
      });

      const prepareToUpload = new File(
        [JSON.stringify(
          {
            hotSpotData
          },
          null,
          1
        )], 'metadata.json');

      const hotspotURL = await uploadToSpheronStorage(prepareToUpload)
      setLink2(hotspotURL)

      const transaction = await contract360AF.addApt(apartmentURL, hotspotURL, numberOfRooms)
      const tx = await transaction.wait()
      console.log(tx)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    
  }


  const uploadToSpheronStorage = async (newFile) => {
    const formData = new FormData()
    formData.append('file', newFile)

    const response = await fetch('http://localhost:4000/api/apartment/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json()
    return `${data?.protocolLink}/${data?.fileName}`
  }

  const debug = () => {
    console.log(getConfig())
  }

  const addNote = () => {
    const config = getConfig()

    const newNote = {
      "pitch": config.pitch,
      "yaw": config.yaw,
      "type": "info",
      "text": message
    }

    addHotSpot(newNote, "firstScene")
    setNotes([...notes, newNote])

    setMessage("")
  }

  const addScene = () => {
    const config = getConfig()

    const newScene = {
      "pitch": config.pitch,
      "yaw": config.yaw,
      "type": "scene",
      "text": message,
      "URL": url
    }
    addHotSpot(newScene, "firstScene")
    setScenes([...scenes, newScene])

    setMessage("")
    setURL("")
  }

  return (
    <Container maxW='1200px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' minWidth='650px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Add Apartment</Heading>

          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Choose a 360 Image of the Apartment</FormLabel>
            <input type='file' id='apartmentPhoto' onChange={handleUpload}/>
          </FormControl>

          {imageFile && <Image360 currentImage={URL.createObjectURL(imageFile)} /> }


          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>Add Note</Tab>
              <Tab>Add Scene</Tab>
              <Tab>Debug</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl mb='3'>
                  <FormLabel htmlFor='message'>Add Note</FormLabel>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                </FormControl>

                <Button onClick={addNote} mt={3}>Add Note</Button>
              </TabPanel>

              <TabPanel>
                <FormControl mb='3'>
                  <FormLabel htmlFor='message'>Add Note</FormLabel>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                </FormControl>
                <FormControl mb='3'>
                  <FormLabel htmlFor='url'>Add Scene</FormLabel>
                  <Input value={url} onChange={(e) => setURL(e.target.value)} />
                </FormControl>
                
                <Button onClick={addScene} mt={3}>Add Scene</Button>
              </TabPanel>

              <TabPanel>
                <Button onClick={debug} mt={3}>Check Config</Button>
              </TabPanel>
              
            </TabPanels>
          </Tabs>

          <FormControl mb='3'>
            <FormLabel htmlFor='numberOfRooms'>Number Of Rooms</FormLabel>
            <Input value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
          </FormControl>

          <Button mt="4" mb="3" onClick={submitUpload} isLoading={loading} loadingText='Submitting'>
            Add
          </Button>
          <br />
          {link && <Link href={link} target="_blank" rel="noopener noreferrer">
            Apt URL
          </Link>}
          <br />
          {link2 &&  <Link href={link2} target="_blank" rel="noopener noreferrer">
            Data URL
          </Link>}
         
        </Box>
      </Center>
    </Container>
  )
}

export default AddApartment