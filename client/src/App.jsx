import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import NavBarLearner from './components/NavBarLearner';
import SignUp from './pages/SignUp';
import LogIn from './components/LogIn';
import Footer from './components/Footer';
import Browse from './pages/Browse';
import { useRecoilValue } from 'recoil'
import { isLoggedIn } from './assets/utils/state'
import DashboardL from "./components/DashboardL";
// import { useColorMode, Button } from '@chakra-ui/react'



function App() {

  // const { colorMode, toggleColorMode } = useColorMode();

  const logInState = useRecoilValue(isLoggedIn)

  return (
    <div>
      <Router>

        {/* <Button onClick={toggleColorMode}></Button> */}
        {!logInState ? <NavBar /> : <NavBarLearner />}

        <Routes>
          <Route path="/" element={!logInState ? <Home /> : <DashboardL />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/browse/:cat" element={<Browse />} />
        </Routes>
      </Router>
      <Footer />
    </div >
  )
}

export default App;
