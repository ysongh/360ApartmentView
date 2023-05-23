import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import {  addHotSpot } from "react-pannellum"

import { getApartmentByID } from "../Tableland"
import Image360 from '../components/Image360'

function ApartmentDetail() {
  const { id } = useParams()

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

  return (
    <div>
      {imageURL && <Image360 currentImage={imageURL} /> }
    </div>
  )
}

export default ApartmentDetail