import React from 'react'
import ReactPannellum from "react-pannellum"

function Image360({ currentImage }) {
  const config = {
    type: 'equirectangular',
    autoLoad: true,
    hotSpotDebug: true,
  }

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource={currentImage}
        config={config}
      />
    </div>
  )
}

export default Image360