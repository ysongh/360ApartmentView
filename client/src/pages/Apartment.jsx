import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import ReactPannellum, { getConfig, addHotSpot } from "react-pannellum"

const imageURL = [
  "https://www.shutterstock.com/shutterstock/photos/1175752585/display_1500/stock-photo--d-illustration-spherical-vr-degrees-a-seamless-panorama-of-the-room-and-room-of-light-1175752585.jpg",
  "https://www.shutterstock.com/shutterstock/photos/525626881/display_1500/stock-photo-hdri-panorama-view-in-modern-white-empty-loft-apartment-interior-of-living-room-hall-full-525626881.jpg"
]

function Apartment() {
  const { id } = useParams()

  const [message, setMessage] = useState("")
  const [url, setURL] = useState("")

  const config = {
    type: 'equirectangular',
    autoLoad: true,
    hotSpotDebug: true,
    hotSpots: [
      {
        id: "1",
        type: 'scene',
        pitch: 10,
        yaw: 20,
        text: 'Go to apartment 1',
        URL: `${window.location.origin}/#/apartment/${0}`,
      },
      {
        id: "2",
        type: 'scene',
        pitch: -10,
        yaw: 30,
        text: 'Go to apartment 2',
        URL: `${window.location.origin}/#/apartment/${1}`,
      }
    ]
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
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource={imageURL[id]}
        config={config}
      />
      <Button onClick={debug} mt={3}>Check Config</Button>
      <br />
      <FormControl mb='3'>
        <FormLabel htmlFor='message'>Add Note</FormLabel>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      </FormControl>
      <FormControl mb='3'>
        <FormLabel htmlFor='url'>Add Scene</FormLabel>
        <Input value={url} onChange={(e) => setURL(e.target.value)} />
      </FormControl>
      <Button onClick={addNote} mt={3}>Add Note</Button>
      <Button onClick={addScene} mt={3}>Add Scene</Button>
    </div>
  )
}

export default Apartment