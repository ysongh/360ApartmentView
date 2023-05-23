import { Database } from "@tableland/sdk"

const db = new Database()
const tableName = "my_hardhat_table_3141_185"

export const getApartments = async () => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all()
    console.log(results)
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getApartmentByID = async (id) => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE id = '${id}';`).all()
    console.log(results)
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}