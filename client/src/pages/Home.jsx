import { useEffect, useState } from "react"
import { Database } from "@tableland/sdk"

const db = new Database();
const tableName = "my_hardhat_table_3141_41"

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all()
      console.log(results)
      setData(results)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      <h1>Home</h1>
      {data.map(d => (
        <p key={d.id}>{d.val}</p>
      ))}
    </div>
  )
}

export default Home