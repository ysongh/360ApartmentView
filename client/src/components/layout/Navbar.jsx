import { Link as ReactLink } from 'react-router-dom'
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react'
import { ethers } from 'ethers'

import ApartmentFinder from '../../artifacts/contracts/Lock.sol/Lock.json'

const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

function Navbar({ ethAddress, setETHAddress, setContract360AF }) {
  const connectMetamask = async () => {
    try{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setETHAddress(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ApartmentFinder.abi, signer);
      console.log(contract);
      setContract360AF(contract);

    } catch(error) {
      console.error(error);
    }
  }

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
          <Link as={ReactLink} to="/apartment/0">Apartment</Link>
          <Link as={ReactLink} to="/addapartment">Add Apartment</Link>
          <Spacer />
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar