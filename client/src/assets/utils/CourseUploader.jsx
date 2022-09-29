import { useEffect, useState } from 'react'
import axios from 'axios'
// import { URL } from '../assets/utils/config'
import {
    Box, Button,
    Image, FormControl, FormLabel, Grid, Select,
    ButtonGroup, Input, Spinner, Heading, Center, Container
} from '@chakra-ui/react'

// import { userData } from '../assets/utils/state'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
// import BigSpinner from '../assets/utils/BigSpinner'
import { courseData } from './state';

export default function CourseUploader() {

    const [video, setVideo] = useState("");
    const [url, setUrl] = useState("");
    const [course, setCourseData] = useRecoilState(courseData)

    const toast = useToast();

    const uploadVideo = async () => {

        const instance = axios.create()
        delete instance.defaults.headers.common['Authorization'];

        const formData = new FormData()
        formData.append("file", video)
        formData.append("upload_preset", "cjoabhus")
        formData.append("cloud_name", "dg8xjejgr")

        try {
            const { data } = await instance.post("https://api.cloudinary.com/v1_1/dg8xjejgr/video/upload", formData)

            console.log(data.url);
            setUrl(data.url)

        }
        catch (e) {
            console.log(e);
        }
    }

    // setCourseData({ ...course, media: [...media.slice(0,day-1), {...media[day-1], media_file: data.url }, ...media.slice(day, media.length) ] })

    // const handleChange = (e) => {
    //     setUserData({ ...user, [e.target.name]: e.target.value })
    // }

    // useEffect(() => {
    //     handleSubmit()
    // }, [url])

    // const handleSubmit = async () => {
    //     try {
    //         const { data } = await axios.post(`${URL}/user/update`, user)
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    // const saveAndExit = async () => {
    //     await handleSubmit()
    //     toast({
    //         title: "Profile has been successfully updated! Let's go to your Dashboard.",
    //         status: 'success',
    //         isClosable: true
    //     })
    //     setTimeout(() => {
    //         navigate("/")
    //     }, 3000)
    // }


    return (

        <Box>
            <Input border={0} type="file" onChange={(e) => setVideo(e.target.files[0])} ></Input>
            <Button onClick={uploadVideo}>Upload</Button>
        </Box>

    )
}