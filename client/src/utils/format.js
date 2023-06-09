export const formatDate = async (timestamp) => {
  const date = new Date(timestamp * 1000)
  const formattedDate = date.toLocaleString()
  return formattedDate
}

export const dateToUnixTime = async () => {
  const date = new Date()
  const unixTime = Math.floor(date.getTime() / 1000)
  console.log(unixTime)
  return unixTime
}