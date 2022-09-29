import React from 'react'
import { Box, Image, Badge, Text } from '@chakra-ui/react'
import { FaRegStar } from 'react-icons/fa'

export default function CourseCard({ course, idx, height = "400px", subtitle = false, cursor }) {
    return (
        <Box bgColor="gray.50" onClick={() => console.log('hi')} cursor={cursor} maxW='sm' key={idx} h={height} borderWidth='1px' borderRadius='lg' overflow='hidden' position="relative">
            <Image pointerEvents="none" src={course.thumbnail} alt="DS image"

                overflow="hidden" objectFit="contain" />
            <Box p='6' bgColor="gray.50" w="100%" position="absolute" bottom={2}>
                <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                        New
                    </Badge>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        {course.media.length} Days
                    </Box>
                </Box>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {course.name}
                </Box>
                {
                    subtitle &&
                    <Box>
                        {course.sub_title}
                    </Box>
                }

                <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <FaRegStar
                                key={i}
                                color={i < course.rating ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                    {course.num_ratings === 1
                        ? <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                            {course.num_ratings} review
                        </Box>
                        : <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                            {course.num_ratings} reviews
                        </Box>}

                </Box>
            </Box>

        </Box>
    )
}
