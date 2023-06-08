export const formatDate = async (timestamp) => {
  const date = new Date(timestamp * 1000)
  const formattedDate = date.toLocaleString()
  return formattedDate
}