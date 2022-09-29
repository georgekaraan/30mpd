import React from 'react'
import { Spinner, Center } from '@chakra-ui/react'

export default function BigSpinner() {
    return (
        <Center>
            <Spinner
                thickness='8px'
                speed='0.65s'
                emptyColor='gray.200'
                color='pink.500'
                size="xl" />
        </Center>
    )
}
