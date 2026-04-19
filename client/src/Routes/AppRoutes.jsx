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
import CreateDeal from "../pages/deals/CreateDeal"
import DealsList from "../pages/deals/DealsList"
import DealDetail from "../pages/deals/DealDetail"
import MyDeals from "../pages/deals/MyDeals"
import BuyerLayout from "../pages/buyer/BuyerLayout"
import BuyerHome from "../pages/buyer/BuyerHome"
import SellerLayout from "../pages/seller/SellerLayout"
import SellerHome from "../pages/seller/SellerHome"
import MyProperties from "../pages/seller/MyProperties"
import AddProperty from "../pages/AddProperty"
import EditProperty from "../pages/seller/EditProperty"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/properties/edit/:id" element={<RoleProtectedRoute allowedRoles={['Seller', 'Admin']}><EditProperty /></RoleProtectedRoute>} />
            <Route path="/deals" element={<DealsList />} />
            <Route path="/deals/:id" element={<DealDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/my-deals" element={<ProtectedRoute><MyDeals /></ProtectedRoute>} />
            <Route path="/deals/create" element={<RoleProtectedRoute allowedRoles={['Seller', 'Admin']}><CreateDeal /></RoleProtectedRoute>} />
            
            <Route path="/buyer" element={<RoleProtectedRoute allowedRoles={['User', 'Buyer']}><BuyerLayout /></RoleProtectedRoute>}>
                <Route index element={<BuyerHome />} />
                <Route path="properties" element={<PropertyList />} />
                <Route path="activity" element={<MyDeals />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/seller" element={<RoleProtectedRoute allowedRoles={['Seller', 'Admin']}><SellerLayout /></RoleProtectedRoute>}>
                <Route index element={<SellerHome />} />
                <Route path="properties" element={<SellerHome />} />
                <Route path="add-property" element={<SellerHome />} />
                <Route path="profile" element={<SellerHome />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
