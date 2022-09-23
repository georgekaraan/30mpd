import { useState, useEffect } from 'react'
import axios from 'axios'
import { SimpleGrid, Box, Image, Badge, Spinner, Center, Grid, GridItem, Heading, Checkbox, HStack, VStack } from '@chakra-ui/react'
import { FaRegStar } from 'react-icons/fa'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CourseCard from '../assets/utils/CourseCard';

export default function Browse() {

    const [courses, setCourses] = useState([])
    const [filtCats, setFiltCats] = useState([])
    const [initialFilt, setInitialFilt] = useState('')

    const getCourses = async () => {
        let url = "http://localhost:4080/course/read"
        try {
            const res = await axios.get(url)
            console.log(res.data);
            setCourses(res.data)
        }
        catch (e) {
            console.log(e);
        }
    }


    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation().pathname;



    useEffect(() => {
        getCourses();
        setInitialFilt(params.cat)
    }, [])




    const changeFilter = (e) => {
        setInitialFilt("")
        let cat = e.target.value
        if (e.target.checked) {
            setFiltCats([...filtCats, cat])
            navigate(location + `${cat}`)
        }
        else {
            let index = filtCats.indexOf(cat)
            setFiltCats([...filtCats.slice(0, index), ...filtCats.slice(index + 1, filtCats.length)])
            let newLoc = location.replace(cat, '');
            navigate(newLoc)
        }
        console.log(filtCats);
    }

    function renderCheckboxes(course, idx) {

        let checkBoxChecked = <Checkbox key={idx} onChange={(e) => changeFilter(e)} value={course.category} isChecked> {course.category}</Checkbox>
        let checkBoxUnChecked = <Checkbox key={idx} onChange={(e) => changeFilter(e)} value={course.category}> {course.category}</Checkbox>

        if (initialFilt === `courses${course.category}`) {
            setFiltCats([...filtCats, course.category])
            return setInitialFilt('')
        } else {
            if (filtCats.includes(course.category)) {
                return checkBoxChecked
            } else {
                return checkBoxUnChecked
            }

        }
    }





    return (

        <>

            <Grid gridTemplateColumns="1fr 3fr">

                <GridItem pl={10} className='filter'>
                    <Heading size='lg'>
                        Filters
                    </Heading>
                    <Heading mt="10" size='md'>
                        Categories
                    </Heading>
                    <VStack mt="3" alignItems='flex-start' justifyContent="center">
                        {courses.map((course, idx) => renderCheckboxes(course, idx))}
                    </VStack>
                    <Heading mt="10" size='md'>
                        Ratings
                    </Heading>
                </GridItem>


                <SimpleGrid pt="10" minChildWidth='330px' spacing='10px'>
                    {courses.length === 0 ?
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl' />
                        </Center> :
                        !filtCats.length ?
                            courses.map((course, idx) => <CourseCard key={idx} course={course} idx={idx} />)
                            : courses.filter((item) => filtCats.includes(item.category)).map((course, idx) => <CourseCard key={idx} course={course} idx={idx} />)
                    }
                </SimpleGrid>
            </Grid>
        </>
    )
}
