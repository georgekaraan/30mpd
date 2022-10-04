import React from 'react'
import { Grid, Box, Text, Image, Button, Center, GridItem, Heading } from '@chakra-ui/react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userData, courseData } from '../../assets/utils/state'
import { useEffect, useState, useRef } from 'react';
import VideoJS from '../../assets/utils/VideoJS'
import 'videojs-youtube'
import BigSpinner from '../../assets/utils/BigSpinner';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export default function CourseView() {

    const [course, setCourseData] = useRecoilState(courseData)
    const [user, setUserData] = useRecoilState(userData)
    const [day, setDay] = useState()
    const [player, setPlayer] = useState(false)
    const [videoJsOptions, setVideoJsOptions] = useState({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        videoWidth: '1280',
        videoHeight: '720',
        poster: "",
        // playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: "",
            type: 'video/youtube'
        }]
    })

    const params = useParams();
    const playerRef = useRef(null);
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        setDay(Number(params.day.slice(3)))
    }, [])

    // useEffect(() => {
    //     if (day > user.current_course_day) {
    //         navigate(`/course/${course.name}/${course._id}/day${day}`)
    //     }
    // }, [day])

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            VideoJS.log('player is waiting');
        });

        player.on('dispose', () => {
            VideoJS.log('player will dispose');
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setPlayer(true)
        }, 200)
    }, [])


    return (
        <>
            {!course.name ? <BigSpinner /> :
                <Grid gridTemplateColumns="3fr 1fr">
                    <GridItem p="20px">
                        {day &&
                            <Tabs defaultIndex={day >= user.current_course_day ? user.current_course_day - 1 : day - 1} isFitted variant='soft-rounded' colorScheme='pink'>
                                <TabList>
                                    {course?.media.map((media_day, index) => {
                                        if (index + 1 > user.current_course_day) {
                                            return <Tab key={index} isDisabled><p>Day {index + 1}</p></Tab>
                                        } else {
                                            return <Tab onClick={() => navigate(`/course/${course.name}/${course._id}/day${index + 1}`)} key={index}><p>Day {index + 1}</p></Tab>
                                        }
                                    })}
                                </TabList>
                                <TabPanels>
                                    {!player
                                        ? <Center><BigSpinner /></Center>
                                        : course.media.map((media_day, index) => {
                                            return < TabPanel key={index} >
                                                <Box ><VideoJS options={{
                                                    ...videoJsOptions, poster: course?.media[index + 1]?.thumbail, sources: [{
                                                        src: `${course?.media[index + 1]?.media_file}#t=10,20`,
                                                        type: 'video/youtube'
                                                    }]
                                                }} onReady={handlePlayerReady} /></Box>
                                                {console.log(videoJsOptions)}
                                            </TabPanel>
                                        })}
                                </TabPanels>
                            </Tabs>}
                    </GridItem>
                    <GridItem p="20px">
                        <Heading textAlign="center">Notes</Heading>
                    </GridItem>
                </Grid>
            }

            {/* } */}
        </>

    )
}
