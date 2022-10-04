import { Heading, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SubscribeSuccess() {

    let navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])

    return (
        <Box p={50}>
            <Heading>Congratulations! 😇</Heading>
            <Text>You have successfully joined the 30mpd gang. We are committed to making sure you commit to our learning strategy. 30 minutes a day is all it takes and you'll be able to master any skill!</Text>
        </Box>
    )
}
