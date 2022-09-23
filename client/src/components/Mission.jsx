import React from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'

export default function Mission() {
    return (
        <>
            <Stack p={8} w="60%" mt={50}>
                <Box mb={50}>
                    <Heading fontSize={80} fontStyle="italic" textAlign="center">Wen learn?</Heading>
                    <Heading fontSize={100} fontStyle="italic" textAlign="center">30min/day?</Heading>
                </Box>
                {/* <Box >
                    <Heading >Who We Are?</Heading>
                    <Text mt={4} pr={20} color="#001166" fontSize={18}>Have you ever caught yourself browsing for a new course on a new learning marketplace even though you have over a dozen unfinished courses that you’ve decided are not worth your time and effort anymore?</Text>
                    <Text mt={4} pr={20} color="#001166" fontSize={18}>This is a common pain point - 90% of people don’t end up finishing a course online (whether it is free or they paid for it).
                        15 hour courses seem intimidating to most at first glance, but when observed at a more granular level it is simply thirty-minutes a day for a period of 30 days.</Text>
                </Box> */}
            </Stack>
        </>
    )
}

// highlight words using Chakra