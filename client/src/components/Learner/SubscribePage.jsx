import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Subscribe from './Subscribe'

export default function SubscribePage() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <VStack>
                <Heading p="10">In order to continue, please subscribe!</Heading>

            </VStack>
            <Subscribe />
        </Box>
    )
}
