import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import HowItWorks from "../pages/HowItWorks"
import PropertyList from "../pages/PropertyList"
import PropertyDetails from "../pages/PropertyDetails"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Profile from "../pages/user/Profile"
import EditProfile from "../pages/user/EditProfile"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute"
import SellerDashboard from "../pages/SellerDashboard"
import DashboardHome from "../pages/dashboard/DashboardHome"
import MyProperties from "../pages/dashboard/MyProperties"
import DashboardAddProperty from "../pages/dashboard/DashboardAddProperty"
import UserDashboard from "../pages/UserDashboard"
import UserDashboardHome from "../pages/user-dashboard/UserDashboardHome"
import UserDashboardPropertyDetails from "../pages/user-dashboard/UserDashboardPropertyDetails"
import UserDashboardGroups from "../pages/user-dashboard/UserDashboardGroups"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route
                path="/dashboard"
                element={
                    <RoleProtectedRoute allowedRoles={['Seller']}>
                        <SellerDashboard />
                    </RoleProtectedRoute>
                }
            >
                <Route index element={<DashboardHome />} />
                <Route path="properties" element={<MyProperties />} />
                <Route path="add-property" element={<DashboardAddProperty />} />
            </Route>
            <Route
                path="/user-dashboard"
                element={
                    <RoleProtectedRoute allowedRoles={['User']}>
                        <UserDashboard />
                    </RoleProtectedRoute>
                }
            >
                <Route index element={<UserDashboardHome />} />
                <Route path="property/:id" element={<UserDashboardPropertyDetails />} />
                <Route path="groups" element={<UserDashboardGroups />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
