import React from 'react'
import { Box, Image, Center, Heading, Button } from '@chakra-ui/react'

export default function Subscribe() {
    return (

        <Center>
            <Box m="10" maxW='lg' p="10" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Heading textAlign="center">Monthly Plan</Heading>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'></Box>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Pay As You Go!
                    </Box>
                    <Box>
                        We will charge you monthly. You cancel at anytime.
                    </Box>
                    <Center>
                        <Box display='flex' mt='2' alignItems='center' textAlign="center" fontSize="64px">
                            $3 / month
                        </Box>
                    </Center>
                    <Center mt="25">
                        <Button>Join Today</Button>
                    </Center>
                </Box>

            </Box>
            <Box m="10" maxW='lg' p="10" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Heading textAlign="center">Annual Plan</Heading>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'></Box>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Pay once a year - for a reduced rate
                    </Box>
                    <Box>
                        We will charge you monthly. You cancel at anytime.
                    </Box>
                    <Center>
                        <Box display='flex' mt='2' alignItems='center' textAlign="center" fontSize="64px">
                            $30 / year
                        </Box>
                    </Center>
                    <Center mt="25">
                        <Button>Join Today</Button>
                    </Center>
                </Box>

            </Box>
        </Center>
    )
}
