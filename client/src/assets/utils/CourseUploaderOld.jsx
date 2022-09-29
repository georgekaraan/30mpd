import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import VideoJS from './VideoJS'

function CourseUploaderOld() {

    const [course, setCourse] = useState([])
    const [file, setFile] = useState({ name: '' })
    const [CID, setCID] = useState('')


    async function fetchData() {
        let url = `http://localhost:4060/course/read`;
        try {
            const res = await axios.get(url);
            let data = res.data;
            console.log(data)
            setCourse(data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        videoWidth: '1280',
        videoHeight: '720',
        sources: [{
            src: `https://api.ipfsbrowser.com/ipfs/get.php?hash=${CID}`,
            // src: 'https://link.storjshare.io/s/jxqu7yq3z2mosdb4ilrxsdefncyq/30mpd/Day1.mp4',
            type: 'video/mp4'
        }]
    };

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



    const onSubmitUpload = async (e) => {
        e.preventDefault()

        const fileData = new FormData();
        fileData.append('file', file);

        // Details of the uploaded file
        console.log('I am the file: ', file);
        console.log('Iam the filedata: ', fileData);

        let url = `http://localhost:4060/course/uploadtwo`;
        try {
            let res = await axios.post(url, fileData);
            let data = res.data;
            setCID(data)
            console.log(data)

        } catch (error) {
            console.log(error);
        }
    };





    return (
        <div>
            <h1>{course[1]?.name}</h1>
            <h3>{course[1]?.sub_title}</h3>
            <div>
                <input type="file" name="video" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={(e) => onSubmitUpload(e)}>Upload Course</button>
                <h4>{console.log(file)}</h4>
            </div>
            {CID && <div className='video-container'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>}
            <p>{CID}</p>
            <div><p>{course[1]?.description}</p></div>
        </div >
    )
}

export default CourseUploaderOld;
