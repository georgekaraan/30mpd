import React from 'react'
import { Box, Stack, Grid, Flex, Text, Divider, Center, GridItem, Heading, Link } from '@chakra-ui/react'

export default function Footer() {
    return (
        <Box mt={20} w="100%" bgColor="gray.100">

            <Stack dir='vertical' gap='1em'>
                <Grid pt="15px" gridTemplateColumns="1fr 1fr" pr="30%" pl="30%">
                    <GridItem>
                        <Stack dir='vertical' textAlign="match-parent">
                            <Heading fontSize="lg">
                                Company
                            </Heading>
                            <Link>About</Link>
                            <Link>Careers</Link>
                            <Link>Press</Link>
                            <Link>Blog</Link>
                            <Link>Affiliates</Link>
                            <Link>Partnerships</Link>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack dir='vertical' textAlign="match-parent">
                            <Heading fontSize="lg">
                                Community
                            </Heading>
                            <Link>Bring your Friend</Link>
                            <Link>Free Classes</Link>
                            <Link>Discord Server</Link>
                            <Link>Meet Ups</Link>
                        </Stack>
                    </GridItem>
                    {/* <GridItem>
                        <Stack dir='vertical' textAlign="match-parent">
                            <Heading fontSize="lg">
                                Company
                            </Heading>
                            <Link>About</Link>
                            <Link>Careers</Link>
                            <Link>Press</Link>
                            <Link>Blog</Link>
                            <Link>Affiliates</Link>
                            <Link>Partnerships</Link>
                        </Stack>
                    </GridItem> */}

                </Grid>
                <Divider></Divider>
                <Center>
                    <Flex dir='row' gap="3em" mb="10px">
                        <Text>@30mpd 2022</Text>
                        <Link>Help</Link>
                        <Link>Privacy</Link>
                        <Link>Terms</Link>
                    </Flex>
                </Center>
            </Stack>
        </Box>

    )
}
