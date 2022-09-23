import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Box,
    HStack,
    Text,
    Progress
} from '@chakra-ui/react'

import React from 'react'

export default function CoursePainPoint() {
    return (
        <HStack mt="100px" spacing={5} h='60vh'>
            <Box w='60%' m="auto">
                <Heading textAlign='center' mb="10px">Aren't you sick of this? 🙈</Heading>
                <TableContainer borderWidth="2px" borderRadius="md"  >
                    <Table variant='simple'>
                        <TableCaption>An endless list of incomplete courses...</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Course Title</Th>
                                <Th>Progress</Th>
                                <Th isNumeric>% Completed</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Web Dev Bootcamp 2.0</Td>
                                {/* <Td>May 19 2020</Td> */}
                                <Td><Progress value={25.4} colorScheme='pink' /></Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>Intro to Data Analytics with R</Td>
                                <Td><Progress value={12.4} colorScheme='pink' /></Td>
                                <Td isNumeric>12.4</Td>
                            </Tr>
                            <Tr>
                                <Td>Learn How to Draw with Jeff Greeves</Td>
                                <Td><Progress value={3} colorScheme='pink' /></Td>
                                <Td isNumeric>3</Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>...</Th>
                                <Th>...</Th>
                                <Th isNumeric>...</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

            <Box w="20%">
                <Text fontSize="100px">👀</Text>
            </Box>
        </HStack>
    )
}
