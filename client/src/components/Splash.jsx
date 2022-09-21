import React from 'react'
import { Stack } from '@chakra-ui/react'
import Mission from './Mission'
import SignUp from './SignUp'


export default function Splash() {
    return (
        <Stack spacing={8} direction="row" m={10}>
            <Mission></Mission>
            <SignUp></SignUp>
        </Stack>
    )
}
