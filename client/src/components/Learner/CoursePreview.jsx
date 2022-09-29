import { useState } from 'react'
import { Box, VStack, Text, Heading, Image, Grid, GridItem, Center, Button } from '@chakra-ui/react'
import { GrSubtractCircle } from 'react-icons/gr'
import BigSpinner from '../../assets/utils/BigSpinner'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import CourseUploader from '../../assets/utils/CourseUploader';


export default function CoursePreview({ course, user }) {

    const [timeDiff, setTimeDiff] = useState();
    const [countDown, setCountDown] = useState();

    const startDate = new Date(user.current_course_start)
    const todayDate = new Date()

    const navigate = useNavigate();

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    function dateDiffInDays(a, b) {
        let diff = ((a.getTime() + a.getTimezoneOffset() * 60 * 1000) - (b.getTime() + b.getTimezoneOffset() * 60 * 1000)) / _MS_PER_DAY

        if (a.getYear() === b.getYear() && a.getMonth() === b.getMonth()) {
            if (a.getDate() === b.getDate()) {
                return 0
            } else if (a.getDate() - b.getDate() === 1) {
                return 1
            } else {
                return diff
            }
        } else {
            return diff
        }

    }

    const timeDown = () => {
        var toDate = new Date();
        var tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        var diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
        var diffHr = Math.floor(diffMS / 3600);
        diffMS = diffMS - diffHr * 3600;
        var diffMi = Math.floor(diffMS / 60);
        diffMS = diffMS - diffMi * 60;
        var diffS = Math.floor(diffMS);
        var result = ((diffHr < 10) ? "0" + diffHr : diffHr);
        result += ":" + ((diffMi < 10) ? "0" + diffMi : diffMi);
        result += ":" + ((diffS < 10) ? "0" + diffS : diffS);
        return result
    }

    useEffect(() => {
        setInterval(() => {
            setCountDown(timeDown());
        }, 1000)
    }, [countDown])

    useEffect(() => {
        setTimeDiff(dateDiffInDays(todayDate, startDate))
    }, [])

    return (
        !course.name
            ? <BigSpinner />
            : !user.current_course_day_completed
                ?
                <>
                    {/* <CourseUploader /> */}
                    <Heading>Today's Lesson</Heading>
                    <Grid borderRadius="md" w="60%" p={50} bgColor="gray.50" borderWidth="1px" boxShadow="lg" gridTemplateColumns="2fr 1fr">
                        <GridItem>
                            <Heading fontStyle="italic" >{course.name}</Heading>
                            <Heading my={4} fontSize="24px">Day #{user.current_course_day} / {course.media?.length}</Heading>

                            <Box>
                                <Image w="90%" src={course.media[user.current_course_day - 1].thumbnail} />
                            </Box>
                        </GridItem>

                        <GridItem py="50px" display="flex" flexDirection="column" justifyContent="space-between">

                            <Text>You started this course{
                                timeDiff > 2
                                    ? ` on ${new Date(user.current_course_start).toDateString()}.`
                                    : timeDiff === 1
                                        ? ' yesterday.'
                                        : ' today.'}
                            </Text>
                            <Button color="white" bgColor="pink.500"
                                onClick={() => navigate(`/course/${course.name}/${course._id}/day${user.current_course_day}`)}>
                                Enter Class Space</Button>

                            {/*
                            <RouterLink
                                to={`/course/${course.name}/${course._id}/day${user.current_course_day}`} course={course}>
                                Enter Class Space</RouterLink> */}
                            {/*
                                // () => navigate(`/course/${course.id}/day${user.current_course_day}`)}> */}



                            <Box>
                                <Text>Current Streak: {user.streak_count}</Text>
                                <Text>Do not lose your streak...</Text>
                            </Box>

                            <Heading textAlign="center" size="lg">
                                {countDown}
                            </Heading>


                        </GridItem>
                    </Grid>

                    {/* <VStack>
                        <Text>Currently on Day #{user.current_course_day}. {course.media?.length - user.current_course_day == 0 ? `You are on your last day of this course! Hooray! Give yourself a pat on the back` : `You have ${course.media?.length - user.current_course_day} lessons more!`} </Text>
                        <Text>{user.current_course_day_completed}</Text>
                    </VStack > */}
                </>

                : <Text>Done for the day</Text>
    )
}
