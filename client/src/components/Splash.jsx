import React from 'react'
import { Stack } from '@chakra-ui/react'
import Mission from './Mission'
import SignUpWidget from './SignUpWidget'


export default function Splash() {
    return (
        <Stack spacing={8} direction="row" m={10}>
            <Mission />
            <SignUpWidget />
        </Stack>
    )
}
