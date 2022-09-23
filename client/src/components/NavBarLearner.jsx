import { useState } from 'react'
import { Box, Spacer, Button, Heading, Text, Input, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { HStack, DrawerFooter } from '@chakra-ui/react'
import { Stack, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Center
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";

import axios from 'axios'
import { useEffect } from 'react'






export default function NavBar() {


    const [cats, setCats] = useState([])

    useEffect(() => {
        getListOfCats()
    }, [])

    const getListOfCats = async () => {
        let url = "http://localhost:4080/course/listofcats"
        try {
            const res = await axios.get(url);
            console.log(res.data)
            setCats(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <header>
                <nav>
                    <Box backgroundColor="gray.50" mb={20} p={5} borderBottomWidth="3px" borderBottomColor="pink.500">
                        <HStack alignItems="center" as="nav">
                            <Box h='10' cursor='pointer' >
                                <RouteLink to="/"><Heading>30mpd</Heading>
                                </RouteLink>
                            </Box >

                            <Button w='180px' h='10' ml={5} onClick={onOpen}><Text color="#001166" >Browse</Text></Button>
                            <Drawer size="lg" placement='left' onClose={onClose} isOpen={isOpen}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader borderBottomWidth='1px'>Category</DrawerHeader>
                                    <DrawerBody>
                                        <Stack direction="column">
                                            {cats.map((cat, idx) => {
                                                return <RouteLink to={`/browse/${cat}`}>
                                                    <Link key={idx} onClick={onClose}>{cat}</Link>
                                                </RouteLink>
                                            })}
                                        </Stack>
                                    </DrawerBody>
                                    <Center mb="20">
                                        <DrawerFooter>
                                            <RouteLink to={`/browse/all`}>
                                                <Button onClick={onClose} size='lg'>Browse All</Button>
                                            </RouteLink>
                                        </DrawerFooter>
                                    </Center>
                                </DrawerContent>
                            </Drawer>
                            <Spacer />
                            <InputGroup w='20%' h='10' bg='gray.100' >
                                <InputLeftElement pointerEvents='none' children={<BsSearch color='gray.300' />} />
                                <Input placeholder='Search' />
                            </InputGroup>
                            <Spacer />
                            <Button w='180px' h='10' mr={5}><Text color="#001166">Want to Teach?</Text></Button>
                            <Menu >
                                <MenuButton as={Button} colorScheme='pink'>
                                    {/* <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> */}
                                    Profile
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title='Profile'>
                                        <MenuItem>My Account</MenuItem>
                                        <MenuItem>Payments </MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup title='Help'>
                                        <MenuItem>FAQ</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </Box>
                </nav>
            </header >
        </>
    )
}