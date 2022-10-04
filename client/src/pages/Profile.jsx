import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { URL } from '../assets/utils/config'
import {
    Box, Button,
    Image, FormControl, FormLabel, Select,
    ButtonGroup, Input, Heading, Avatar, Text, IconButton
} from '@chakra-ui/react'

import { userData } from '../assets/utils/state'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import BigSpinner from '../assets/utils/BigSpinner'
import { FaRegEdit } from 'react-icons/fa'



// import { FaEdit, FaWindowClose, FaCheck } from 'react-icons/fa'
// import AvatarEditor from 'react-avatar-editor'



export default function Profile() {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [user, setUserData] = useRecoilState(userData)
    const [editMode, setEditMode] = useState()

    useEffect(() => {
        !user.name ? setEditMode(true) : setEditMode(false)
    }, [])

    const navigate = useNavigate();
    const toast = useToast();

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        uploadImage()
    }, [image])

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
        setEditMode(false)
        setTimeout(() => {
            navigate("/")
        }, 3000)
    }

    const clickInput = (e) => {
        hiddenFileInput.current.click();

    };

    return (
        <>
            {!user.user_timezone
                ? <BigSpinner />
                : <Box>
                    <Heading ml="50px">
                        Profile{!editMode && <IconButton
                            // size="lg"
                            bgColor="transparent"
                            _hover="transparent"
                            _active="transparent"
                            icon={<FaRegEdit />}
                            onClick={() => setEditMode(true)} />}
                    </Heading>

                    <Box ml="400">
                        <Avatar position="relative" size="2xl" mb="5" src={user?.image} >
                            <IconButton
                                // size="lg"
                                zIndex="100"
                                position="absolute"
                                right="-5"
                                top="-5"
                                bgColor="transparent"
                                _hover="transparent"
                                _active="transparent"
                                icon={<FaRegEdit />}
                                onClick={clickInput} /></Avatar>


                        {/* <Image m="20px" borderRadius="50%" w="250px" h="auto" src={user.image} /> */}


                        <Input display="none" ref={hiddenFileInput} border={0} type="file" onChange={(e) => setImage(e.target.files[0])} ></Input>
                        {/* <Center>
                                <Button onClick={clickInput}>Choose File</Button>
                                <Button ml="10" onClick={uploadImage}>Update</Button>
                            </Center> */}
                    </Box>


                    <Box ml="100px" mb="50px" w="30%">
                        <FormControl m="5" isRequired>
                            <FormLabel>Full Name:</FormLabel>
                            {editMode
                                ? <Input value={user.name} name="name" onChange={(e) => handleChange(e)} />
                                : <Text>{user.name}</Text>
                            }
                        </FormControl>
                        <FormControl m="5">
                            <FormLabel>Nickname:</FormLabel>
                            {editMode
                                ? <Input placeholder='How do you like to be called?' value={user.nickname} onChange={handleChange} name="nickname" />
                                : <Text>{user.nickname}</Text>
                            }
                        </FormControl>
                        <FormControl m="5" isRequired>
                            <FormLabel>Timezone:</FormLabel>
                            {editMode
                                ? <Select isDisabled placeholder={user.user_timezone} onChange={handleChange} name="user_timezone" />
                                : <Select isDisabled placeholder={user.user_timezone} onChange={handleChange} name="user_timezone" />
                            }
                        </FormControl>
                        {editMode && <ButtonGroup ml="100px">
                            <Button onClick={() => setEditMode(false)}>Cancel</Button>
                            <Button onClick={saveAndExit}>Submit</Button>
                        </ButtonGroup>}

                    </Box>

                </Box>}
        </>
    )
}
