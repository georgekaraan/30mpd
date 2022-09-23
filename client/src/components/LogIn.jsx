import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Box,
    Button,
    Grid,
    GridItem,
    Text,
    Center, Divider, Link
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoggedIn } from '../assets/utils/state';



export default function LogIn() {

    const [user, setUser] = useState('')

    // const handleSubmit = () => {}

    useEffect(() => setUser(''), [])
    const setLoggedIn = useSetRecoilState(isLoggedIn)

    let navigate = useNavigate()

    const logIn = () => {

        setLoggedIn(true);
        navigate('/')
    }

    return (
        <>
            <Grid templateColumns='1fr 1fr 1fr' gap={6} alignItems='center' justifyContent='center'>
                <Center>
                    <GridItem>
                        <Button
                            cursor={user === 'learner' ? 'default' : null}
                            _hover={{ colorScheme: { md: user === 'learner' ? 'pink' : null } }}
                            _active={{ colorScheme: { md: user === 'learner' ? 'pink' : null } }}
                            colorScheme={user === 'learner' ? 'pink' : null}
                            w='12em'
                            h='12em'
                            border='2px'
                            borderColor="pink.500"
                            onClick={() => setUser('learner')}
                        >
                            <Text>Learner</Text>
                        </Button>
                    </GridItem>
                    <Divider orientation='vertical' />
                </Center>

                <Center>
                    <GridItem>
                        <Box borderRadius={25} shadow='lg' borderWidth='1px' p={8} pb={14} w="30%" minWidth="340px" maxH={470}>
                            <Heading textAlign="center" mb={10}>Welcome Back!</Heading>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel >
                                <Input id='login_email' mb={4} type='email' />
                                <FormLabel>Password</FormLabel>
                                <Input id='login_pass' type='password' />
                                <Button mt={8} ml="25%" w="50%">Submit</Button>
                            </FormControl >
                            <Text mt={8} textAlign='center'>Don't have an account? <Link onClick={() => navigate('/signup')} color='pink.500' fontWeight='extrabold'>Sign Up!</Link>
                            </Text>
                        </Box >
                    </GridItem>
                </Center>

                <Center>
                    <GridItem  >
                        <Button
                            cursor={user === 'teacher' ? 'default' : null}
                            _hover={{ colorScheme: { md: user === 'learner' ? 'pink' : null } }}
                            _active={{ colorScheme: { md: user === 'learner' ? 'pink' : null } }}
                            colorScheme={user === 'teacher' ? 'pink' : null}
                            w='12em'
                            h='12em'
                            border='2px'
                            borderColor="pink.500"
                            onClick={() => setUser('teacher')}
                        >
                            <Text >Teacher</Text>
                        </Button>
                    </GridItem>
                </Center>

            </Grid>
        </>
    )
}
