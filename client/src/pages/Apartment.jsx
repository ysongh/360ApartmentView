import React from 'react'
import ReactPannellum, { getConfig } from "react-pannellum"

function Apartment() {
  const config = {
    type: 'equirectangular',
    autoLoad: true,
    hotSpots: [
      {
        type: 'info',
        pitch: 10,
        yaw: 20,
        text: 'A small note'
      },
      {
        type: 'info',
        pitch: -10,
        yaw: 30,
        text: 'This is another note!'
      }
    ]
  }

  const click = () => {
    console.log(getConfig());
  }

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="https://pannellum.org/images/alma.jpg"
        config={config}
      />
      <div onClick={click}>Click me</div>
    </div>
  )
}

export default Apartment