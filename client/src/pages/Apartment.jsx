import React from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import ReactPannellum, { getConfig, addHotSpot } from "react-pannellum"

const imageURL = [
  "https://www.shutterstock.com/shutterstock/photos/1175752585/display_1500/stock-photo--d-illustration-spherical-vr-degrees-a-seamless-panorama-of-the-room-and-room-of-light-1175752585.jpg",
  "https://www.shutterstock.com/shutterstock/photos/525626881/display_1500/stock-photo-hdri-panorama-view-in-modern-white-empty-loft-apartment-interior-of-living-room-hall-full-525626881.jpg"
]

function Apartment() {
  const { id } = useParams();

  const config = {
    type: 'equirectangular',
    autoLoad: true,
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

  const addHotSpots = () => {
    addHotSpot({
      "pitch": 14.1,
      "yaw": 1.5,
      "type": "info",
      "text": "Apartment 1",
      "URL": imageURL[1]
    }, "firstScene");
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
      <Button onClick={addHotSpots} mt={3}>Add HotSpot</Button>
    </div>
  )
}

export default Apartment