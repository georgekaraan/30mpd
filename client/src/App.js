import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import VideoJS from './assets/utils/VideoJS'


function App() {

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


  const onFileUpload = async () => {

    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      file,
      file.name
    );

    // Details of the uploaded file
    console.log(file);

    let url = `http://localhost:4060/course/upload`;
    try {
      let res = await axios.post(url, file);
      let data = res.data;
      console.log(data)

    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpload = async (e) => {
    e.preventDefault()

    const fileData = new FormData();
    fileData.append('file', file);

    // Details of the uploaded file
    console.log('Iam the filedata', fileData);

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
      <h1>{course[0]?.name}</h1>
      <h3>{course[0]?.sub_title}</h3>
      <div>
        <input type="file" name="video" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={(e) => onSubmitUpload(e)}>Upload Course</button>
        <h4>{console.log(file)}</h4>
      </div>
      {CID && <div className='video-container'>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>}
      {/* <form onSubmit={(e) => onSubmitUpload(e)}>
        {/* id='uploadForm'
        action='http://localhost:4050/course/upload'
        method='post'
        encType="multipart/form-data"> */}
      {/* <input type="file" name="sampleFile" onChange={(e) => setFile(e.target.files[0])} />
      <input type='submit' value='Upload!' />
    </form> * /} */}
      {/* <div>
        <FileUpload setUrl={setFileUrl} />
        FileUrl : <a
          href={fileUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
        </a>
      </div> */}
      <p>{CID}</p>
      <div><p>{course[0]?.category}</p></div>
    </div >
  )
}

export default App;
