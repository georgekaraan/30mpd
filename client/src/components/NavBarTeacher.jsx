import React from 'react'
import { Box, Spacer, Button, Flex, Heading, Text, Input, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { Stack, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, useDisclosure } from '@chakra-ui/react'
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

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState } from 'react'



export default function Banner() {


    return (
        <>
            <header>
                <nav>
                    <Box mb={100} p={5}>
                        <Flex alignItems="center">
                            <Box h='10'><Heading>30mpd</Heading></Box >
                            <Button w='180px' h='10' ml={5} ><Text color="#001166" >Dashboard</Text></Button>
                            <Spacer />
                            <Input w='350px' h='10' bg='gray.100' placeholder='Search' />
                            <Spacer />
                            <Button w='180px' h='10' mr={5}><Text color="#001166">Want to Learn?</Text></Button>
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