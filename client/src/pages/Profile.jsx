import { useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../assets/utils/config'
import {
    Box, Button,
    Image, FormControl, FormLabel, Grid, Select,
    ButtonGroup, Input, Spinner, Heading, Center, Container
} from '@chakra-ui/react'

import { userData } from '../assets/utils/state'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import BigSpinner from '../assets/utils/BigSpinner'


// import { FaEdit, FaWindowClose, FaCheck } from 'react-icons/fa'
// import AvatarEditor from 'react-avatar-editor'



export default function Profile() {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [user, setUserData] = useRecoilState(userData)

    const navigate = useNavigate();
    const toast = useToast();

    const uploadImage = async () => {

        const instance = axios.create()
        delete instance.defaults.headers.common['Authorization'];

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "cjoabhus")
        formData.append("cloud_name", "dg8xjejgr")

        try {
            const { data } = await instance.post("https://api.cloudinary.com/v1_1/dg8xjejgr/image/upload", formData)
            setUserData({ ...user, image: data.url })
            setUrl(data.url)
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        setUserData({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        handleSubmit()
    }, [url])

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post(`${URL}/user/update`, user)
        }
        catch (e) {
            console.log(e);
        }
    }

    const saveAndExit = async () => {
        await handleSubmit()
        toast({
            title: "Profile has been successfully updated! Let's go to your Dashboard.",
            status: 'success',
            isClosable: true
        })
        setTimeout(() => {
            navigate("/")
        }, 3000)
    }

    return (
        <>
            {!user.user_timezone
                ? <BigSpinner />
                : <Box>
                    <Heading ml="50px">Profile</Heading>
                    <Grid p="50px" gridTemplateColumns="1fr 2fr">
                        <Box>
                            <Image m="20px" borderRadius="50%" w="250px" h="auto" src={user.image} />
                            <Input border={0} type="file" onChange={(e) => setImage(e.target.files[0])} ></Input>
                            <Button onClick={uploadImage}>Upload</Button>
                        </Box>


                        <Box mb="100px" w="30%">
                            <FormControl m="5" isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input value={user.name} name="name" onChange={(e) => handleChange(e)} />
                            </FormControl>
                            <FormControl m="5">
                                <FormLabel>Nickname</FormLabel>
                                <Input placeholder='How do you like to be called?' value={user.nickname} onChange={handleChange} name="nickname" />
                            </FormControl>
                            <FormControl m="5" isRequired>
                                <FormLabel>Timezone</FormLabel>
                                <Select isDisabled placeholder={user.user_timezone} onChange={handleChange} name="user_timezone" />
                            </FormControl>
                            <ButtonGroup m="5" mt="20px">
                                <Button>Cancel</Button>
                                <Button onClick={saveAndExit}>Submit</Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                    {/* <Text>{JSON.stringify(user)}</Text> */}
                </Box>}
        </>
    )
}
