import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Heading,
    Box,
    Button,
    Spacer,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'

export default function SignUp() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box borderRadius={25} shadow='lg' borderWidth='1px' p={8} pb={14} w="30%" minWidth="320px" maxH={470}>
            <Heading textAlign="center" mb={10}>Sign Up Today</Heading>
            <FormControl>
                < FormLabel > Email address</FormLabel >
                <Input mb={3} type='email' placeholder='Enter email address' />
                <FormLabel>Password</FormLabel>
                <InputGroup mb={3} size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
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
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button mt={15} ml="25%" w="50%">Submit</Button>

            </FormControl >
        </Box >
    )
}
