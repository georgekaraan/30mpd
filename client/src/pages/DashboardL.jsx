
import { VStack, Heading, Text, Spacer } from '@chakra-ui/react'
import { userData, courseData } from '../assets/utils/state'
import { useRecoilValue, useRecoilState } from 'recoil'

import TopRated from '../components/Learner/TopRated'
import NewCourses from '../components/Learner/NewCourses'
import CoursePreview from '../components/Learner/CoursePreview'
import SubscribePage from '../components/Learner/SubscribePage'




function DashboardL() {

    const user = useRecoilValue(userData)
    const [course, setCourseData] = useRecoilState(courseData)

    return (
        <>
            {user.active_subscription
                ? user.current_course_ID
                    ? <VStack minH="60vh">
                        <CoursePreview course={course} user={user} />
                    </VStack>
                    : user.completed_courses.length === 0
                        ? <>
                            <VStack>
                                <Heading my={10}>Time to Commit to your first course!</Heading>
                                <TopRated />
                                <Spacer />
                                <NewCourses />
                            </VStack>
                        </>
                        : <>
                            <VStack>
                                <Heading>Time for a New Course</Heading>
                                <Text>Good job on finishing course on 423er23r2. Time to learn a new skill ! Choose a course from below.</Text>
                                <TopRated />
                                <Spacer />
                                <NewCourses />
                            </VStack>
                        </>
                : <SubscribePage />}

        </>
    )
}

export default DashboardL
