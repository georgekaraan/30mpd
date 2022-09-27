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
    Select
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isLoggedIn } from '../assets/utils/state'
import { URL } from '../assets/utils/config'
import { useToast } from '@chakra-ui/react'


export default function SignUpWidget() {

    const [show, setShow] = useState(false)
    const handleClick = (e) => setShow(!show)

    const logIn = useSetRecoilState(isLoggedIn)

    const navigate = useNavigate()
    const toast = useToast()

    const [form, setValues] = useState({
        email: "",
        password: "",
        password2: "",
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setValues({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
                setTimeout(() => {
                    logIn(true)

                    navigate("/");
                }, 3500);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Box borderRadius={25} shadow='lg' borderWidth='1px' p={8} pb={14} w="30%" minWidth="320px" maxH={520}>
            <Heading textAlign="center" mb={10}>Sign Up Today</Heading>
            <FormControl isRequired>
                < FormLabel > Email address</FormLabel >
                <Input onChange={handleChange} id='signup_email' mb={3} type='email' placeholder='Enter email address' name='email' />
                <FormLabel>Password</FormLabel>
                <InputGroup mb={3} size='md'>
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
                <FormLabel>Re-type Password</FormLabel>
                <InputGroup mb={3} size='md'>
                    <Input
                        onChange={handleChange}
                        name='password2'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        id='signup_pass2'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Button onClick={handleSubmit} mt={15} ml="25%" w="50%">Submit</Button>
            </FormControl >
            <Select mt={8} placeholder='How did you hear of us?'>
                <option value='option1'>Twitter</option>
                <option value='option2'>Telegram</option>
                <option value='option3'>Your Friend</option>
            </Select>
        </Box >
    )
}
