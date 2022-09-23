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

export default function SignUpWidget() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box borderRadius={25} shadow='lg' borderWidth='1px' p={8} pb={14} w="30%" minWidth="320px" maxH={520}>
            <Heading textAlign="center" mb={10}>Sign Up Today</Heading>
            <FormControl isRequired>
                < FormLabel > Email address</FormLabel >
                <Input id='signup_email' mb={3} type='email' placeholder='Enter email address' />
                <FormLabel>Password</FormLabel>
                <InputGroup mb={3} size='md'>
                    <Input
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

                <Button mt={15} ml="25%" w="50%">Submit</Button>
            </FormControl >
            <Select mt={8} placeholder='How did you hear of us?'>
                <option value='option1'>Twitter</option>
                <option value='option2'>Telegram</option>
                <option value='option3'>Your Friend</option>
            </Select>
        </Box >
    )
}
