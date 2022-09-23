import React from 'react'
import { Box, Image, Badge } from '@chakra-ui/react'
import { FaRegStar } from 'react-icons/fa'

export default function CourseCard({ course, idx }) {
    return (
        <Box cursor='pointer' maxW='sm' key={idx} h="400px" borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={course.thumbnail} alt="DS image" />
            <Box p='6'>
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
                <Box>
                    {course.sub_title}

                </Box>
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
