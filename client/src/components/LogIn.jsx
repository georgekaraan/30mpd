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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../assets/utils/config';
import axios from 'axios'
import * as jose from 'jose'
import { useToast } from '@chakra-ui/react';
import { usersMode, userData, userEmail } from '../assets/utils/state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import validator from 'validator';


export default function LogIn({ login }) {


    const [userMode, setUsersMode] = useRecoilState(usersMode)
    const setUserData = useSetRecoilState(userData)
    const setUserEmail = useSetRecoilState(userEmail)
    const [emailMsg, setEmailMsg] = useState(null)
    const [passMsg, setPassMsg] = useState(null)

    const [form, setValues] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate()
    const toast = useToast();



    const handleChange = (e) => {

        if (e.target.name === 'email') {
            validator.isEmail(e.target.value) ? setEmailMsg(true) : setEmailMsg(false)
        } else if (e.target.name === 'password') {
            validator.isStrongPassword(e.target.value, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) ? setPassMsg(true) : setPassMsg(false)
        }
        setValues({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form.email);
        console.log(form.password);
        try {
            const response = await axios.post(`${URL}/user/login`, {
                email: form.email.toLowerCase(),
                password: form.password,
            });
            setMessage(response.data.message);
            if (response.data.ok) {
                let decodedToken = jose.decodeJwt(response.data.token)
                console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)

                toast({
                    title: 'Welcome back! You have successfully logged in.',
                    status: 'success',
                    isClosable: true
                })

                setTimeout(async () => {
                    await login(response.data.token);
                    const user = await getUserData({ email: form.email.toLowerCase() })
                    setUserEmail(form.email.toLowerCase())
                    !user.name && navigate('/profile')

                }, 3000);
            } else {
                toast({
                    title: 'Invalid !',
                    status: 'error',
                    isClosable: true
                })
            }
        } catch (error) {
            toast({
                title: 'Invalid !',
                status: 'error',
                isClosable: true
            })
            console.log(error);
        }
    };

    const getUserData = async ({ email }) => {
        const user = await axios.post(`${URL}/user/getdata`, { email })
        setUserData(user.data)
        return user.data
    }

    return (
        <>
            <Box >
                <Center>
                    <GridItem>
                        <Tabs colorScheme="pink" borderRadius="30px" isFitted variant='enclosed'>
                            <TabList >
                                <Tab
                                    fontSize="24px"
                                    _selected={{ color: 'white', bg: 'pink.500' }}
                                    _focus={{ color: 'white', bg: 'pink.500' }}
                                    _hover={userMode === "learner" && { cursor: 'default', bg: 'pink.500' }}
                                    // _active={{ color: 'white', bg: 'pink.300' }}
                                    onClick={() => setUsersMode('learner')}
                                    borderColor="gray.200"
                                    bgColor="gray.100"
                                >Student
                                </Tab>
                                <Tab
                                    fontSize="24px"
                                    _selected={{ color: 'white', bg: 'blue.500' }}
                                    _focus={{ color: 'white', bg: 'blue.500' }}
                                    _hover={userMode === "teacher" && { cursor: 'default', bg: 'blue.500' }}
                                    _active={{ color: 'white', bg: 'blue.500' }}
                                    onClick={() => setUsersMode('teacher')}
                                    borderColor="gray.200"
                                    bgColor="gray.100"
                                >Teacher</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0}>
                                    <Box boxShadow='dark-lg' p='6' rounded='lg' borderRadius={0} borderBottomRadius="lg" shadow='lg' borderWidth='1px' px={100} pb={14} w="500px" maxW="500px" minWidth="340px" maxH={500}>
                                        <Heading mt={10} textAlign="center" mb={10}>Student Login</Heading>
                                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                        <FormControl onSubmit={handleSubmit} isRequired>
                                            <FormLabel>Email address</FormLabel >
                                            <Input onChange={(e) => handleChange(e)} id='login_email_student' mb={4} type='email' name='email' />

                                            <FormLabel>Password</FormLabel>
                                            <Input onChange={(e) => handleChange(e)} id='login_pass_student' type='password' name='password' />

                                            <Button onClick={handleSubmit} mt={8} ml="25%" w="50%">Submit</Button>
                                        </FormControl >
                                        <Text mt={8} textAlign='center'>Don't have an account? <Link onClick={() => navigate('/signup')} color='pink.500' fontWeight='extrabold'>Sign Up!</Link>
                                        </Text>
                                        {/* </form> */}
                                    </Box >
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Box boxShadow='dark-lg' p='6' rounded='lg' borderRadius={0} borderBottomRadius="lg" shadow='lg' borderWidth='1px' px={100} pb={14} w="500px" minWidth="340px" maxH={500}>
                                        <Heading mt={10} textAlign="center" mb={10}>Teacher Login</Heading>
                                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                        <FormControl onSubmit={handleSubmit} isRequired>

                                            <FormLabel>Email address</FormLabel >

                                            <Input onChange={(e) => handleChange(e)} id='login_email_learner' type='email' name='email' />

                                            {emailMsg === null || form.email === "" ? null : emailMsg === true ? <Text mt="4px" ml="7px" color="green">Vaild email !</Text> : <Text mt="4px" ml="7px" color="red">Please enter a valid email!</Text>}

                                            <FormLabel mt="10px">Password</FormLabel>

                                            <Input onChange={(e) => handleChange(e)} id='login_pass_learner' type='password' name='password' />

                                            {/* {passMsg === null || form.password === "" ? null : passMsg === true ? <Text mt="4px" ml="7px" color="green">Vaild email !</Text> : <Text mt="4px" ml="7px" color="red">Please enter a stronger password!</Text>} */}

                                            <Button onClick={handleSubmit} mt={8} ml="25%" w="50%">Submit</Button>
                                        </FormControl >
                                        <Text mt={8} textAlign='center'>Don't have an account? <Link onClick={() => navigate('/signup')} color='pink.500' fontWeight='extrabold'>Sign Up!</Link>
                                        </Text>
                                        {/* </form> */}
                                    </Box >
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </GridItem>
                </Center>
            </Box>

        </>
    )
}
