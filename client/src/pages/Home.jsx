import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getApartments, } from "../Tableland";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const apartments = await getApartments();
      setData(apartments)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      <h1>Home</h1>
      {data.map(d => (
        <p key={d.id} onClick={() => navigate(`/apartmentdetail/${d.id}`)}>
          {d.id} - {d.apt_url}, {d.data_url}, {d.number_of_rooms}
        </p>
      ))}
    </div>
  )
}

export default Home