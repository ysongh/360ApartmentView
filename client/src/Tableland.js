import { Database } from "@tableland/sdk"

import { dateToUnixTime } from "./utils/format"

const db = new Database()
const tableName = "my_hardhat_table_80001_6764"

export const getApartments = async () => {
  try {
    const currentUnixTime = await dateToUnixTime()
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE expire_date > '${currentUnixTime}';`).all()
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

export const getApartmentByAddress = async (address) => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE owner = '${address}';`).all()
    console.log(results)
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}