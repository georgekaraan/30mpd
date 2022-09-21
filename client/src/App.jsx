import CourseView from './components/CourseView';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import LogIn from './components/LogIn';


function App() {

  return (
    <div>
      <Router>

        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          {/* <Route path="/shop" element={<Shop products={productDB} />} />
          <Route path="/corp" element={<Corporate />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartDB={cartDB} setCartDB={setCartDB} total={total.price} />} />
          <Route path="/shop/:id/:title" element={<ProductPage products={productDB} setCartDB={setCartDB} cartDB={cartDB} />} /> */}
        </Routes>
      </Router>
      {/* <CourseView /> */}
    </div >
  )
}

export default App;
