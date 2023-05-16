import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import ReactPannellum, { getConfig, addHotSpot } from "react-pannellum"

const imageURL1 = "https://www.shutterstock.com/shutterstock/photos/1175752585/display_1500/stock-photo--d-illustration-spherical-vr-degrees-a-seamless-panorama-of-the-room-and-room-of-light-1175752585.jpg"
const imageURL2 = "https://www.shutterstock.com/shutterstock/photos/525626881/display_1500/stock-photo-hdri-panorama-view-in-modern-white-empty-loft-apartment-interior-of-living-room-hall-full-525626881.jpg"

function Apartment() {
  const [image, setImage] = useState(imageURL1);

  const config = {
    type: 'equirectangular',
    autoLoad: true,
    hotSpots: [
      {
        id: "1",
        type: 'info',
        pitch: 10,
        yaw: 20,
        text: 'A small note',
        URL: imageURL1,
      },
      {
        id: "2",
        type: 'info',
        pitch: -10,
        yaw: 30,
        text: 'This is another note!',
        URL: imageURL2
      }
    ]
  }

  const debug = () => {
    console.log(getConfig())
    addHotSpot({
      "pitch": 14.1,
      "yaw": 1.5,
      "type": "info",
      "text": "Apartment 1",
      "URL": imageURL1
    }, "firstScene");
  }

  const addHotSpots = () => {
    addHotSpot({
      "pitch": 14.1,
      "yaw": 1.5,
      "type": "info",
      "text": "Apartment 1",
      "URL": imageURL1
    }, "firstScene");
  }

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource={image}
        config={config}
      />
      <Button onClick={debug} mt={3}>Check Config</Button>
      <Button onClick={addHotSpots} mt={3}>Add HotSpot</Button>
    </div>
  )
}

export default Apartment