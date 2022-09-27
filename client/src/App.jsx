import { BrowserRouter as Router, Route, Routes, Link as RouteLink, Navigate } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import LogIn from './components/LogIn';
import Footer from './components/Footer';
import Browse from './pages/Browse';
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedIn, usersMode, userData, userEmail } from './assets/utils/state'
import DashboardL from "./pages/DashboardL";
import DashboardT from "./pages/DashboardT";
import Profile from "./pages/Profile";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from './assets//utils/config'
// import { useColorMode, Button } from '@chakra-ui/react'



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
    const user = await axios.post(`${URL}/user/getdata`, { email })
    setUserData(user.data)
  }
  useEffect(() => {
    userLoggedIn && getUserData({ email })
  }, [userLoggedIn])



  return (
    <div>
      <Router>

        {/* <Button onClick={toggleColorMode}></Button> */}
        <NavBar cats={cats} filtCats={filtCats} setFiltCats={setFiltCats} logout={logout} />
        <Routes>
          <Route path="/" element={!userLoggedIn ? <Home /> : userMode === 'learner' ? <DashboardL /> : <DashboardT />} />
          <Route path="/login" element={!userLoggedIn ? <LogIn login={login} token={token} /> : user.name ? <Navigate to="/" /> : <Navigate to="/profile" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse/:cat" element={<Browse cats={cats} filtCats={filtCats} setFiltCats={setFiltCats} />} />
        </Routes>
      </Router>
      <Footer />
    </div >
  )
}

export default App;
