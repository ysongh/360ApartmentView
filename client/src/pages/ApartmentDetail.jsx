import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, Tab, TabPanels, TabPanel, TabList, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { getConfig, addHotSpot } from "react-pannellum"

import { getApartmentByID } from "../Tableland"
import Image360 from '../components/Image360'

function ApartmentDetail() {
  const { id } = useParams()

  const [message, setMessage] = useState("")
  const [url, setURL] = useState("")
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    getApartment()
  }, [])

  const getApartment = async () => {
    try {
      const newApartment = await getApartmentByID(id)
      console.log(newApartment)
      setImageURL(newApartment[0].apt_url)

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

  const debug = () => {
    console.log(getConfig())
  }

  const addNote = () => {
    const config = getConfig()

    addHotSpot({
      "pitch": config.pitch,
      "yaw": config.yaw,
      "type": "info",
      "text": message
    }, "firstScene")

    setMessage("")
  }

  const addScene = () => {
    const config = getConfig()

    addHotSpot({
      "pitch": config.pitch,
      "yaw": config.yaw,
      "type": "scene",
      "text": message,
      "URL": url
    }, "firstScene")

    setMessage("")
    setURL("")
  }

  return (
    <div>
      {imageURL && <Image360 currentImage={imageURL} /> }
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
    </div>
  )
}

export default ApartmentDetail