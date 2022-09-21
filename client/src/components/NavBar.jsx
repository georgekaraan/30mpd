import React from 'react'
import { Box, Spacer, Button, Flex, Heading, Text, Input, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { Stack, FormLabel, InputGroup, InputLeftElement, InputRightAddon, Select, Textarea, useDisclosure } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

import { Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { BsSearch } from "react-icons/bs";





export default function Banner() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    let navigate = useNavigate()
    return (
        <>
            <header>
                <nav>
                    <Box mb={100} p={5}>
                        <Flex alignItems="center">
                            <Box h='10' cursor='pointer' onClick={() => navigate('/')}><Heading>30mpd</Heading></Box >
                            <Button w='180px' h='10' ml={5} onClick={onOpen}><Text color="#001166" >Browse</Text></Button>
                            <Drawer size="lg" placement='left' onClose={onClose} isOpen={isOpen}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader borderBottomWidth='1px'>Category</DrawerHeader>
                                    <DrawerBody>
                                        <Stack direction="column">
                                            <Link>Web Developmnet</Link>
                                            <Link>Data Science</Link>
                                        </Stack>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                            <Spacer />
                            <InputGroup w='20%' h='10' bg='gray.100' >
                                <InputLeftElement pointerEvents='none' children={<BsSearch color='gray.300' />} />
                                <Input placeholder='Search' />
                            </InputGroup>
                            <Spacer />
                            <Button w='180px' h='10' mr={5}><Text color="#001166">Want to Teach?</Text></Button>
                            <Button colorScheme='pink' h='10'><Text onClick={() => navigate('/login')} > Log In</Text></Button>
                        </Flex>
                    </Box>
                </nav>
            </header >
        </>
    )
}