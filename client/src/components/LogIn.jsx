import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Heading,
    Box,
    Button,
    Spacer,
    ButtonGroup,
    Grid,
    GridItem,
    Text,
    Center, Divider, Stack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';



export default function LogIn() {

    const [user, setUser] = useState('')

    // const handleSubmit = () => {}

    useEffect(() => setUser(''), [])

    return (
        <>
            <Grid templateColumns='1fr 1fr 1fr' gap={6} alignItems='center' justifyContent='center'>

                <Center>
                    <GridItem>
                        <Button
                            cursor={user == 'learner' ? 'default' : null}
                            _hover={user == 'learner' ? 'pink' : { colorScheme: 'pink' }}
                            _active={user == 'learner' ? 'pink' : null}
                            colorScheme={user == 'learner' ? 'pink' : null}
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
                            <FormControl>
                                <FormLabel>Email address</FormLabel >
                                <Input mb={4} type='email' />
                                <FormLabel>Password</FormLabel>
                                <Input type='password' />
                                <Button mt={8} ml="25%" w="50%">Submit</Button>
                            </FormControl >
                        </Box >
                    </GridItem>
                </Center>

                <Center>
                    <GridItem  >
                        <Button
                            cursor={user == 'teacher' ? 'default' : null}
                            _hover={user == 'teacher' ? 'pink' : { colorScheme: 'pink' }}
                            _active={user == 'teacher' ? 'pink' : null}
                            colorScheme={user == 'teacher' ? 'pink' : null}
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
