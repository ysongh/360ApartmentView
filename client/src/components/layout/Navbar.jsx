import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom'
import { Container, Box, Flex, Heading, Spacer, Badge, Button, Link } from '@chakra-ui/react'
import { ethers } from 'ethers'

import ApartmentFinder from '../../artifacts/contracts/Apartment360.sol/Apartment360.json'

const CONTRACT_ADDRESS = "0xf7789cb99946C4E53f506F4415bB441BD03A69bD"

function Navbar({ ethAddress, setETHAddress, setContract360AF }) {
  const [chainName, setChainName] = useState('');

  const connectMetamask = async () => {
    try{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setETHAddress(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ApartmentFinder.abi, signer);
      console.log(contract);
      setContract360AF(contract);
      setChainName("Polygon Testnet");

    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Box p={2} bg="yellow.400">
      <Container maxW='1200px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="#0b8457" mt="3" mb="5">360 APT</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/mylisting">My Listing</Link>
          <Link as={ReactLink} to="/addapartment">Add Apartment</Link>
          <Spacer />
          {chainName && <p><Badge bgColor="green.300" fontSize='.9rem'>{chainName}</Badge></p>}
          <Button onClick={connectMetamask} bg="#0b8457" color="white">
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar