import { BrowserRouter as Router, Route, Routes, Link as RouteLink, Navigate, useNavigate } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import LogIn from './components/LogIn';
import Footer from './components/Footer';
import Browse from './pages/Browse';
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedIn, usersMode, userData, userEmail, courseData } from './assets/utils/state'
import DashboardL from "./pages/DashboardL";
import DashboardT from "./pages/DashboardT";
import Profile from "./pages/Profile";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from './assets//utils/config'
// import { useColorMode, Button } from '@chakra-ui/react'
import BigSpinner from "./assets/utils/BigSpinner";
import CourseView from "./components/Learner/CourseView";
import Helmet from "react-helmet";


function App() {

  // const { colorMode, toggleColorMode } = useColorMode();


  const [userLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedIn);
  const userMode = useRecoilValue(usersMode)
  const [user, setUserData] = useRecoilState(userData)
  const [email, setUserEmail] = useRecoilState(userEmail)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  // to verify token on app initialization
  useEffect(
    () => {
      const verify_token = async () => {
        try {
          if (!token) {
            setIsLoggedIn(false)
          } else {
            axios.defaults.headers.common['Authorization'] = token;
            const response = await axios.post(`${URL}/user/verify_token`);
            setUserEmail(response.data.succ.email)
            return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      verify_token();
    },
    [token]
  );

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("")
  };

  // list of categories
  const [cats, setCats] = useState([])
  const [filtCats, setFiltCats] = useState([])

  useEffect(() => {
    getListOfCats()
  }, [])

  const getListOfCats = async () => {
    let url = "http://localhost:4080/course/listofcats"
    try {
      const res = await axios.get(url);
      setCats(res.data)

    } catch (error) {
      console.log(error);
    }
  }

  const getUserData = async ({ email }) => {
    const { data } = await axios.post(`${URL}/user/getdata`, { email })
    setUserData(data)
  }
  useEffect(() => {
    userLoggedIn && getUserData({ email })
  }, [userLoggedIn])

  const [course, setCourseData] = useRecoilState(courseData)



  const getCurrentCourse = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/course/findbyid`, { id })
      console.log(data);
      setCourseData(data)
    }
    catch (e) {
      console.log('There is an error finding course by ID');
    }
  }

  useEffect(() => {
    user.active_subscription
      && user.current_course_ID
      // && !course.name
      && getCurrentCourse(user.current_course_ID)
  }, [user])


  return (
    <div>
      <Helmet>
        <title>30mpd: Thirty Minutes Per Day</title>
        <meta name="description" content="A learning platform designed to get you over the finish line. Whether it is learning a new programming language or sharpening an old skill, 30mpd will help you commit and succeed." />


        <meta itemprop="name" content="30mpd: Thirty Minutes Per Day" />
        <meta itemprop="description" content="A learning platform designed to get you over the finish line. Whether it is learning a new programming language or sharpening an old skill, 30mpd will help you commit and succeed." />
        <meta itemprop="image" content='./assets/30mpd-1.png' />


        <meta property="og:url" content="https://www.30mpd.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="30mpd: Thirty Minutes Per Day" />
        <meta property="og:description" content="A learning platform designed to get you over the finish line. Whether it is learning a new programming language or sharpening an old skill, 30mpd will help you commit and succeed." />
        <meta property="og:image" content='./assets/30mpd-1.png' />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="30mpd: Thirty Minutes Per Day" />
        <meta name="twitter:description" content="A learning platform designed to get you over the finish line. Whether it is learning a new programming language or sharpening an old skill, 30mpd will help you commit and succeed." />
        <meta name="twitter:image" content='./assets/30mpd-1.png' />
      </Helmet>
      <Router>
        {/* <Button onClick={toggleColorMode}></Button> */}
        <NavBar cats={cats} filtCats={filtCats} setFiltCats={setFiltCats} logout={logout} />
        <Routes>
          <Route path="/" element={userLoggedIn === null ? <BigSpinner /> : !userLoggedIn ? <Home /> : userMode === 'learner' ? <DashboardL /> : <DashboardT />} />
          <Route path="/login" element={!userLoggedIn ? <LogIn login={login} token={token} /> : user?.name ? <Navigate to="/" /> : <Navigate to="/profile" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={userLoggedIn === null ? <BigSpinner /> : userLoggedIn ? <Profile /> : <Home />} />
          <Route path="/browse/:cat" element={<Browse cats={cats} filtCats={filtCats} setFiltCats={setFiltCats} />} />
          <Route path="/course/:name/:id/:day" element={<CourseView />} />
        </Routes>
      </Router>
      <Footer />
    </div >
  )
}

export default App;
