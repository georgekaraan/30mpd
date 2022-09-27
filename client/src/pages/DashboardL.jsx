import React from 'react'
import { Box, Heading, Center } from '@chakra-ui/react'
import { userData } from '../assets/utils/state'
import { useRecoilValue } from 'recoil'
import Subscribe from '../components/Learner/Subscribe'


function DashboardL() {

    const user = useRecoilValue(userData)

    user.active_subscription
        ? user.current_course_ID
            ? console.log('show the course')
            : user.completed_courses.length === 0
                ? console.log('Time to commit to your first course')
                : console.log('Time to commit yourself toa NEW course')
        : console.log('Fear of commitment??');


    return (
        <>
            <Center>
                <Heading>
                    Time to Subscribe
                </Heading>
            </Center>
            <Subscribe></Subscribe>
        </>
    )
}

export default DashboardL
