import {
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Center, Stack, InputGroup,
    InputLeftElement, useDisclosure, Box, Spacer, Button, Text, Input, HStack, DrawerFooter,
    Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Avatar, useToast, Image,
} from '@chakra-ui/react'
import { Link as RouteLink, useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import { useRecoilValue, useRecoilState, } from 'recoil';
import { isLoggedIn, usersMode, userData } from '../assets/utils/state';
import logo from '../assets/logo/30mpd_navbar.png';



export default function NavBar({ cats, filtCats, setFiltCats, logout }) {


    const userLoggedIn = useRecoilValue(isLoggedIn)
    const [userMode, setUsersMode] = useRecoilState(usersMode)
    const { active_subscription } = useRecoilValue(userData)
    const user = useRecoilValue(userData)

    const navigate = useNavigate();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isModalOpen,
        onOpen: onOpenModal,
        onClose: onCloseModal
    } = useDisclosure()

    const handleRoute = (cat) => {
        if (cat === 'courses') {
            setFiltCats([])
        } else {
            setFiltCats([cat])
        }
        onClose()
    }

    const changeMode = (mode) => {
        setUsersMode(mode)
        onCloseModal()
    }

    const closeSession = async () => {
        await logout()
        toast({
            title: "You've been logged out",
            status: 'info',
            isClosable: true
        })
        setTimeout(() => {
            navigate("/")
        }, 2000)


    }

    return (
        <>

            <header>
                <nav>
                    <Box backgroundColor="gray.50" mb={10} p={5} borderBottomWidth="3px" borderBottomColor={userMode === "learner" ? "pink.500" : "blue.500"}>
                        <HStack alignItems="center" as="nav">
                            <Box h='10' cursor='pointer' >
                                <RouteLink to="/">
                                    <Image src={logo} h='10' />
                                    {/* <Heading>30mpd</Heading> */}
                                </RouteLink>
                            </Box >

                            <Button w='180px' h='10' ml={5} onClick={onOpen}><Text color="#001166" >Browse</Text></Button>
                            <Drawer size="lg" placement='top' onClose={onClose} isOpen={isOpen}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader borderBottomWidth='1px'>Category</DrawerHeader>
                                    <DrawerBody>
                                        <Stack direction="column">
                                            {cats.map((cat, idx) => {
                                                return <RouteLink key={idx} to={`/browse/courses${cat}`}>
                                                    <Text key={idx} onClick={() => handleRoute(cat)}>{cat}</Text>
                                                </RouteLink>
                                            })}
                                        </Stack>
                                    </DrawerBody>
                                    <Center mb="20">
                                        <DrawerFooter>
                                            <RouteLink to={`/browse/courses`}>
                                                <Button onClick={() => handleRoute('courses')} size='lg'>Browse All</Button>
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
                            {userMode === 'learner'
                                ? <>
                                    <Button onClick={onOpenModal} w='180px' h='10' mr={5}><Text color="#001166">Want to Teach?</Text></Button>
                                    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Switching Modes</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                Every teacher is a student and every student is a teacher. Are you sure you want to switch to teacher mode?
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button variant='ghost' mr={3} onClick={onCloseModal}>
                                                    Close
                                                </Button>
                                                <Button onClick={() => changeMode('teacher')} colorScheme='pink' >Confirm</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </>
                                : <>
                                    <Button onClick={onOpenModal} w='180px' h='10' ><Text color="#001166">Want to Learn?</Text></Button>
                                    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Switching Modes</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                Every teacher is a student and every student is a teacher. Are you sure you want to switch to learner mode?
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button variant='ghost' mr={3} onClick={onCloseModal}>
                                                    Close
                                                </Button>
                                                <Button onClick={() => changeMode('learner')} colorScheme='pink' >Confirm</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </>}
                            {!userLoggedIn ?
                                <RouteLink to="/login">
                                    <Button colorScheme={userMode === "learner" ? "pink" : "blue"} h='10'>
                                        <Text> Log In</Text>
                                    </Button>
                                </RouteLink>
                                : <Menu>
                                    <MenuButton w="1px" borderRadius="100%" as={Button} colorScheme={userMode === "learner" ? "pink" : "blue"}>
                                        <Center>
                                            <Avatar size="sm" src={user?.image} />
                                        </Center>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup title='General'>
                                            <RouteLink to="/"><MenuItem>Dashboard</MenuItem></RouteLink>
                                            <RouteLink to="/profile"><MenuItem>Profile</MenuItem></RouteLink>
                                            {active_subscription
                                                ? <RouteLink to="/subscription"><MenuItem>Subscription</MenuItem></RouteLink>
                                                : <RouteLink to="/subscribe"><MenuItem>Subscribe Today</MenuItem></RouteLink>}
                                            <MenuItem>Stats </MenuItem>
                                        </MenuGroup>
                                        <MenuDivider />
                                        <MenuGroup title='Help'>
                                            <MenuItem>Settings</MenuItem>
                                            <MenuItem onClick={closeSession}>Log Out</MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
                            }
                        </HStack>
                    </Box>
                </nav>
            </header >
        </>
    )
}