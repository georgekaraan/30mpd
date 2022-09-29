import { useState, useEffect } from 'react'
import axios from 'axios'
import { SimpleGrid, Center, Grid, GridItem, Heading, Checkbox, VStack } from '@chakra-ui/react'
// import { FaRegStar } from 'react-icons/fa'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CourseCard from '../assets/utils/CourseCard';
import BigSpinner from '../assets/utils/BigSpinner';

export default function Browse({ cats, filtCats, setFiltCats }) {

    const [courses, setCourses] = useState([])

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
        setFiltCats(params.cat.replace('courses', ''))

    }, [])


    const changeFilter = (e) => {
        // setInitialFilt("")
        console.log('before: ', filtCats);
        let cat = e.target.value
        if (e.target.checked && !filtCats.includes(cat)) {
            setFiltCats([...filtCats, cat])
            navigate(location + `${cat}`)
        }
        else {
            let index = filtCats.indexOf(cat)
            index === 0
                ? setFiltCats([])
                : setFiltCats([...filtCats.slice(0, index), ...filtCats.slice(index + 1, filtCats.length)])
            let newLoc = location.replace(cat, '');
            navigate(newLoc)
        }
        console.log('after: ', filtCats);
    }


    function renderCheckboxes(cat, idx) {

        console.log('hi');
        console.log(filtCats);

        let checkBoxChecked = <Checkbox key={idx} onChange={(e) => changeFilter(e)} value={cat} defaultChecked> {cat}</Checkbox>
        let checkBoxUnChecked = <Checkbox key={idx} onChange={(e) => changeFilter(e)} value={cat}> {cat}</Checkbox>

        if (filtCats.includes(cat)) {
            console.log('but why?');
            return checkBoxChecked
        } else {
            return checkBoxUnChecked
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
                        {cats.map((cat, idx) => renderCheckboxes(cat, idx))}
                    </VStack>
                    <Heading mt="10" size='md'>
                        Ratings
                    </Heading>
                </GridItem>


                <SimpleGrid pr={10} pt="10" minChildWidth='330px' spacing='20px'>
                    {courses.length === 0 ?
                        <BigSpinner /> :
                        !filtCats.length ?
                            courses.map((course, idx) => <CourseCard key={idx} course={course} idx={idx} subtitle={true} cursor="pointer" />)
                            : courses.filter((item) => filtCats.includes(item.category)).map((course, idx) => <CourseCard key={idx} course={course} idx={idx} cursor="pointer" subtitle={true} />)
                    }
                </SimpleGrid>
            </Grid>
        </>
    )
}
