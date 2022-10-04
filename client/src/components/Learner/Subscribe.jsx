import React from 'react'
import { Box, Center, Heading, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, ModalCloseButton, ModalHeader } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../assets/utils/state'
import { useRecoilState } from 'recoil'

export default function Subscribe() {

    const [user, setUser] = useRecoilState(userData)


    const {
        isOpen: isModalOpen,
        onOpen: onOpenModal,
        onClose: onCloseModal
    } = useDisclosure()

    let navigate = useNavigate();

    const paymentConfirm = () => {
        setUser({ ...user, active_subscription: true })
        navigate('/subscribe/success')
    }

    return (

        <Center>
            <Box m="10" maxW='lg' p="10" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Heading textAlign="center">Monthly Plan</Heading>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'></Box>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Pay As You Go!
                    </Box>
                    <Box>
                        We will charge you monthly. You can cancel at anytime.
                    </Box>
                    <Center>
                        <Box display='flex' mt='2' alignItems='center' textAlign="center" fontSize="64px">
                            $3 / month
                        </Box>
                    </Center>
                    <Center mt="25">
                        <Button onClick={onOpenModal}>Join Today</Button>
                        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Monthly Plan</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    Time to commit to a lifelong learning experience that will last a lifetime... Join the 30mpd crew today!
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant='ghost' mr={3} onClick={onCloseModal}>
                                        Close
                                    </Button>
                                    <Button onClick={paymentConfirm} colorScheme='pink' >Pay Now</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Center>
                </Box>

            </Box>
            <Box m="10" maxW='lg' p="10" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Heading textAlign="center">Annual Plan</Heading>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'></Box>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Pay once a year - for a reduced rate
                    </Box>
                    <Box>
                        We will charge you annually. You can cancel at anytime.
                    </Box>
                    <Center>
                        <Box display='flex' mt='2' alignItems='center' textAlign="center" fontSize="64px">
                            $30 / year
                        </Box>
                    </Center>
                    <Center mt="25">
                        <Button>Join Today</Button>
                    </Center>
                </Box>

            </Box>
        </Center>
    )
}
