import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Landing from "../pages/Landing"
import Home from "../pages/Home"
import Profile from "../pages/user/Profile"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    )
}

export default AppRoutes