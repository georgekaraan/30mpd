import React from 'react'
import { Grid, Box, Text, Image, Button, Center, GridItem, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userData, courseData } from '../../assets/utils/state'
import { useEffect, useState, useRef } from 'react';
import VideoJS from '../../assets/utils/VideoJS'
import 'videojs-youtube'
import BigSpinner from '../../assets/utils/BigSpinner';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export default function CourseView() {

    const [course, setCourseData] = useRecoilState(courseData)
    const [day, setDay] = useState()
    const [player, setPlayer] = useState(false)
    const [videoJsOptions, setVideoJsOptions] = useState({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        videoWidth: '1280',
        videoHeight: '720',
        sources: [{
            src: "",
            type: 'video/youtube'
        }]
    })

    const params = useParams();
    const playerRef = useRef(null);

    useEffect(() => {
        setDay(Number(params.day.slice(3)))
    }, [])

    useEffect(() => {

        // if (typeof (course) != "undefined") {
        //     setVideoJsOptions({
        //         ...videoJsOptions, sources: [{
        //             src: course.media[Number(params.day.slice(3))].media_file,
        //             type: 'video/youtube'
        //         }]
        //     })
        // }

        if (course.name) {
            console.log(course);
            console.log('Finally');
        }

    }, [course])



    // const videoJsOptions = {
    //     autoplay: false,
    //     controls: true,
    //     responsive: true,
    //     fluid: true,
    //     videoWidth: '1280',
    //     videoHeight: '720',
    //     sources: [{
    //         src: course?.media[day]?.media_file,
    //         type: 'video/youtube'
    //     }]
    // };

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
            {/* <Text>{params.id}</Text>
            <Text>{params.name}</Text>
            <Text>{params.day}</Text> */}

            {/* {!videoJsOptions.sources.media[day].media_file === "" ? null : */}

            {!course.name ? <BigSpinner /> :
                <Grid gridTemplateColumns="3fr 1fr">
                    <GridItem p="20px">
                        {day &&
                            <Tabs defaultIndex={day - 1} isFitted variant='soft-rounded' colorScheme='pink'>
                                <TabList>
                                    {course?.media.map((media_day, index) => {

                                        if (day === (index + 1)) {
                                            return <Tab key={index}>Day {index + 1}</Tab>
                                        } else if (index + 1 > day) {
                                            return <Tab key={index} isDisabled><p>Day {index + 1}</p></Tab>
                                        } else {
                                            return <Tab key={index}><p>Day {index + 1}</p></Tab>
                                        }
                                    })}
                                </TabList>
                                <TabPanels>
                                    {!player
                                        ? <Center><BigSpinner /></Center>
                                        : course.media.map((media_day, index) => {
                                            return < TabPanel key={index} >
                                                <Box ><VideoJS options={{
                                                    ...videoJsOptions, sources: [{
                                                        src: course?.media[index + 1]?.media_file,
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
