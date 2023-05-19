import { useEffect, useState } from "react"

import { getApartments } from "../Tableland";

function Home() {
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
        <p key={d.id}>{d.urls} {d.number_of_rooms}</p>
      ))}
    </div>
  )
}

export default Home