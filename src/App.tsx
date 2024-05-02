import './App.css'
import Home from "./components/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logout from "./components/Logout.tsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import { ToastContainer } from "react-toastify";
import { Protector } from "./services/Helper.jsx";


function App() {
  return (
    <>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Protector Component={Home} />} />
                <Route path={"/Login"} element={<Login />} />
                <Route path={"/logout"} element={<Logout/>} />
                <Route path={"/Registration"} element = {<Registration />} />

            </Routes>
            <ToastContainer />

        </BrowserRouter>

    </>
  )
}

export default App
