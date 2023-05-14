import { Link as ReactLink } from 'react-router-dom'
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react'

function Navbar() {
  return (
    <Box p={2}>
      <Container maxW='1200px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">360 ApartmentView</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/apartment">Apartment</Link>
          <Link as={ReactLink} to="/addapartment">Add Apartment</Link>
          <Spacer />
          <Button>Connect Wallet</Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar