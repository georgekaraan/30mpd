import { useEffect, useState } from 'react'
import { Heading, Center, Flex, VStack, Text, Tag, Button, Container, HStack, Box } from '@chakra-ui/react'
import ChakraCarousel from '../ChakraCarousel'
import CourseCard from '../../assets/utils/CourseCard';
import axios from 'axios'
import { URL } from '../../assets/utils/config';


export default function TopRated() {

    const [courses, setCourses] = useState([])
    const [coursesDouble, setCoursesDouble] = useState([])

    const getCourses = async () => {
        try {
            const res = await axios.get(`${URL}/course/read`)
            console.log(res.data);
            setCourses(res.data)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCourses()
        setCoursesDouble([...courses, ...courses])
    }, [])



    return (
        <Box borderRadius="lg" boxShadow="md" borderWidth="1px" m="10" p="4" w="70%">
            <Heading textAlign="center">Top Rated Courses</Heading>
            <Center>

                <Container
                    py={8}
                    px={0}
                    maxW={{
                        base: "100%",
                        sm: "35rem",
                        md: "43.75rem",
                        lg: "57.5rem",
                        xl: "75rem",
                        xxl: "87.5rem"
                    }}
                >
                    <ChakraCarousel gap={16}>
                        {[...courses, ...courses].map((course, index) => (
                            <>
                                <Box py={1}>
                                    <CourseCard height="300px" key={index} course={course} idx={index} />
                                </Box>
                            </>
                        ))}
                    </ChakraCarousel>
                </Container >
            </Center >
        </Box >
    )
}
