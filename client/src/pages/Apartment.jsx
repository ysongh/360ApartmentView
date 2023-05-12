import React from 'react'
import ReactPannellum, { getConfig } from "react-pannellum"

function Apartment() {
  const config = {
    autoRotate: -2,
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