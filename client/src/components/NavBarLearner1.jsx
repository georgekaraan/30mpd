import React from 'react'
import { Box, Spacer, Button, Flex, Heading, Text, Input, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { Stack, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, useDisclosure } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent
} from '@chakra-ui/react'

import { Link } from '@chakra-ui/react'

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState } from 'react'



export default function Banner() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
        <>
            <header>
                <nav>
                    <Box backgroundColor="gray.50" mb={20} p={5} borderBottomWidth="3px" borderBottomColor="pink.500">
                        <Flex alignItems="center">
                            <Box h='10'><Heading>30mpd</Heading></Box >
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
                            <Input w='350px' h='10' bg='gray.100' placeholder='Search' />
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
                        </Flex>
                    </Box>
                </nav>
            </header >
        </>
    )
}