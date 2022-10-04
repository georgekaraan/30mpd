import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Box,
    Button,
    InputGroup,
    InputRightElement,
    Select,
    Text
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { isLoggedIn, userData, userEmail } from '../assets/utils/state'
import { URL } from '../assets/utils/config'
import { useToast } from '@chakra-ui/react'
import validator from 'validator'
import * as jose from 'jose'

export default function SignUpWidget() {

    const [show, setShow] = useState(false)
    const [emailMsg, setEmailMsg] = useState(null)
    const [passMsg, setPassMsg] = useState(null)
    const [pass2Msg, setPass2Msg] = useState(null)
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const setIsLoggedIn = useSetRecoilState(isLoggedIn)
    const setUserData = useSetRecoilState(userData)
    const setUserEmail = useSetRecoilState(userEmail)
    const loggedInnn = useRecoilValue(isLoggedIn)


    const navigate = useNavigate()
    const toast = useToast()

    const [form, setValues] = useState({
        email: "",
        password: "",
        password2: "",
    });


    const handleClick = (e) => setShow(!show)



    const handleChange = (e) => {
        if (e.target.name === 'email') {
            validator.isEmail(e.target.value) ? setEmailMsg(true) : setEmailMsg(false)
        } else if (e.target.name === 'password') {
            validator.isStrongPassword(e.target.value, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) ? setPassMsg(true) : setPassMsg(false)
        } else if (e.target.name === 'password2') {
            validator.isStrongPassword(e.target.value, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) ? setPass2Msg(true) : setPass2Msg(false)
        }
        setValues({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // user register in back end
            const response = await axios.post(`${URL}/user/register`, {
                email: form.email.toLowerCase(),
                password: form.password,
                password2: form.password2
            });
            setMessage(response.data.message);
            if (response.data.ok) {
                toast({
                    title: 'Congratulations, your account was registered successfully!',
                    status: 'success',
                    isClosable: true,
                })
                // log in user and generate token
                const response2 = await axios.post(`${URL}/user/login`, {
                    email: form.email.toLowerCase(),
                    password: form.password,
                });
                console.log(response2);
                setMessage2(response2.data.message);
                if (response2.data.ok) {
                    let decodedToken = jose.decodeJwt(response2.data.token)
                    console.log('I am the:', decodedToken);
                    console.log("Email extracted from the JWT token after login: ", decodedToken.email)
                    localStorage.setItem("token", JSON.stringify(response2.data.token));
                    setIsLoggedIn(true);

                    setTimeout(async () => {
                        const user = await getUserData({ email: form.email.toLowerCase() })
                        setUserEmail(form.email.toLowerCase())
                        !user.name && navigate('/profile')
                    }, 3000);


                }
            }
        }
        catch (e) {
            toast({
                title: 'Invalid! Something went wrong. Please try again.',
                status: 'error',
                isClosable: true
            })
            console.log(e);
        }




    };

    const getUserData = async ({ email }) => {
        const user = await axios.post(`${URL}/user/getdata`, { email })
        setUserData(user.data)
        return user.data
    }

    return (
        <Box borderRadius={25} shadow='lg' borderWidth='1px' p={8} pb={14} w="30%" minWidth="320px" maxH={520}>
            <Heading textAlign="center" mb={10}>Sign Up Today</Heading>
            <FormControl isRequired>
                < FormLabel > Email address</FormLabel >
                <Input onChange={handleChange} id='signup_email' type='email' placeholder='Enter email address' name='email' />
                {emailMsg === null || form.email === "" ? null : emailMsg === true ? <Text mt="4px" ml="7px" color="green">Vaild email !</Text> : <Text mt="4px" ml="7px" color="red">Please enter a valid email!</Text>}
                <FormLabel mt="10px">Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        onChange={handleChange}
                        name='password'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        id='signup_pass1'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {passMsg === null || form.password === "" ? null : passMsg === true ? <Text mt="4px" ml="7px" color="green">Now.. that is a strong password 💪🏻!</Text> : <Text mt="4px" ml="7px" color="red">Please enter a stronger password!</Text>}
                <FormLabel mt="10px">Re-type Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        onChange={handleChange}
                        name='password2'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        id='signup_pass2'
                        disabled={!passMsg}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {passMsg ? form.password2 === "" ? null : form.password2 !== form.password ? <Text mt="4px" ml="7px" color="red">PaSswOrdS dO nOt maTCh..</Text> : <Text mt="4px" ml="7px" color="green">Matching passwords 🤓</Text> : null}

                <Button disabled={!emailMsg || !passMsg || !pass2Msg || form.password2 !== form.password} onClick={handleSubmit} mt={15} ml="25%" w="50%">Submit</Button>
            </FormControl >
            {/* <Select mt={8} placeholder='How did you hear of us?'>
                <option value='option1'>Twitter</option>
                <option value='option2'>Telegram</option>
                <option value='option3'>Your Friend</option>
            </Select> */}
        </Box >
    )
}
