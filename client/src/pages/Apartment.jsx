import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, Tab, TabPanels, TabPanel, TabList, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { getConfig, addHotSpot } from "react-pannellum"

import Image360 from '../components/Image360'

const imageURL = [
  "https://bafybeielq2n7yrh5f2lq3cx6hl6zbngkqywa5gcqeeaqemvkes3brdpw6q.ipfs.sphn.link/62d946685ac9e15c53f0fbe7f225bfa4",
  "https://bafybeihyxahae5j33kcoz7p5vbqjjnupvi6iwqutzeivkwwc6zbhjizeeu.ipfs.sphn.link/a9cba9b27d1984f84f404496eeef0511"
]

function Apartment() {
  const { id } = useParams()

  const [message, setMessage] = useState("")
  const [url, setURL] = useState("")

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
      <Image360 currentImage={imageURL[id]} />
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

export default Apartment