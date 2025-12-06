import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import Homepage from "./Homepage/Homepage";
import AboutUs from "./Homepage/About-us";
import Rooms from "./Homepage/Rooms";
import Services from "./Homepage/Services";
import News from "./Homepage/News";
import Contact from "./Homepage/contact";
import Header from "./Homepage/Header";
import Footer from "./Homepage/Footer";
import Signin from "./Homepage/Signin";
import Registration from "./Homepage/Registration";
import AdminLogin from "./Homepage/Admin";
import HotelRooms from "./Homepage/HotelRooms"
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import AdminSidebar from "./admin/AdminSidebar"; 

import BookingList from "./admin/booking/BookingList";
import RoomCheckout from "./admin/booking/RoomCheckout";
import RoomStatus from "./admin/booking/RoomStatus";

import AdminTransactions from './admin/transactions/Transactions';

import AssignRoom from "./admin/HouseKeeping/AssignRoom"; 
import RoomCleaningList from "./admin/HouseKeeping/RoomCleaningList";
import Checklist from "./admin/HouseKeeping/Checklist"; 
import CleaningReport from "./admin/HouseKeeping/CleaningReport"; 


import StaffLogin from "./admin/staff/StaffLogin";
import StaffDashboard from "./admin/staff/StaffDashboard";
import SetPassword from "./admin/staff/SetPassword";


import StaffList from './admin/staff/StaffList';
// import AddStaff from './admin/staff/AddStaff';
// import ManageStaff from './admin/staff/ManageStaff';

//import StaffDashboard from "./Homepage/StaffDashboard";
import RoomDetailPage from "./Homepage/RoomDetailPage";
import BookingForm from "./Homepage/BookingForm";
import RoomListingPage from "./Homepage/RoomListingPage";
import SearchResultsPage from "./Homepage/SearchResultsPage";
import Invoice from "./Homepage/Invoice";
import BookingSuccess from "./Homepage/BookingSuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OtpLogin from "./Homepage/OtpLogin";
import Wallet from "./Homepage/Wallet";
import BookingPage from "./Homepage/BookingPage";
import Order from "./Homepage/Orders";
import UserDashboard from "./pages/UserDashboard";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import ForgotPassword from './Homepage/ForgotPassword';
import ResetPassword from './Homepage/ResetPassword';

// Superadmin Components
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
import ClientManagement from "./superadmin/ClientManagement";
import PlatformSettings from "./superadmin/PlatformSettings";
import Analytics from "./superadmin/Analytics";
import ClientProfile from "./superadmin/ClientProfile";
import AddClient from "./superadmin/AddClient";
import Transactions from "./superadmin/Transactions";

// Settings sub-pages
import GeneralSettings from "./superadmin/settings/GeneralSettings";
import PaymentSettings from "./superadmin/settings/PaymentSettings";
import InvoiceSettings from "./superadmin/settings/InvoiceSettings";
import MembersSettings from "./superadmin/settings/MembersSettings";
import SecuritySettings from "./superadmin/settings/SecuritySettings";

//Room Management
import AdminRoomManagement from "./admin/rooms/AdminRoomManagement";
import RoomTypesManagement from "./admin/rooms/RoomTypesManagement";
import FeaturesManagement from "./admin/rooms/FeaturesManagement";

//REPORTS
import BookingReports from "./admin/reports/BookingReports";
import PurchaseReports from "./admin/reports/PurchaseReports";
import StockReports from "./admin/reports/StockReports";



// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BaseURL}/user/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data.user || {};
          setUsername(userData.uname || "User");
          setProfileImage("/assets/img/profile.jpeg");
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("User verification error:", error.message, error.response?.data);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        });
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line
  }, []);

  // Pages where you want to HIDE header and footer
 const hideHeaderFooter = [
  "/admin",
  "/staff/dashboard",
  "/user-dashboard",
  "/superadmin"
].some((path) => location.pathname.startsWith(path));


  return (
    <>
      {!hideHeaderFooter && (
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          profileImage={profileImage}
        />
      )}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Rooms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:roomId" element={<BookingForm />} />
        <Route path="/hotels" element={<HotelRooms />} />


        {/* Auth routes (both /signin and /login) */}
        <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
       <Route path="/otp-login" element={<OtpLogin />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin/Staff routes */}
        <Route path="/admin" element={<AdminLayout />}></Route>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/staff/dashboard/*" element={<StaffDashboard />} />

        


        <Route path="/staff/login" element={<StaffLogin />} />
        //<Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/set-password" element={<SetPassword />} />
        {/* Staff Management Routes
        <Route path="/admin/staff/list" element={<StaffList />} />
        <Route path="/admin/staff/add" element={<AddStaff />} />
        <Route path="/admin/staff/manage/:id" element={<ManageStaff />} /> */}

          {/* Admin routes with persistent sidebar/layout */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rooms-management" element={<AdminRoomManagement />} />
            <Route path="room-types" element={<RoomTypesManagement />} />
            <Route path="features" element={<FeaturesManagement />} />
            <Route path="booking/list" element={<BookingList />} />
            <Route path="booking/checkout" element={<RoomCheckout />} />
            <Route path="booking/status" element={<RoomStatus />} />
            <Route path="staff/list" element={<StaffList />} />
            <Route path="assign" element={<AssignRoom />} />
            <Route path="cleaning" element={<RoomCleaningList />} />
            <Route path="checklist" element={<Checklist />} />
            <Route path="report" element={<CleaningReport />} />
            <Route path="booking-reports" element={<BookingReports />} />
            <Route path="purchase-reports" element={<PurchaseReports />} />
            <Route path="stock-reports" element={<StockReports />} />
            <Route path="transactions" element={<AdminTransactions />} />

            
      
            {/* Add more admin child routes here as needed */}
          </Route>

        {/* Protected User Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        {/* Superadmin Routes */}
        <Route path="/superadmin" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
        <Route path="/superadmin/clients" element={<ProtectedRoute><ClientManagement /></ProtectedRoute>} />
        <Route path="/superadmin/add-client" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
        <Route path="/superadmin/edit-client/:organisation_id" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
        <Route path="/superadmin/client/:organisation_id" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
        <Route path="/superadmin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/superadmin/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />

        {/* Settings with tabs */}
        <Route path="/superadmin/settings" element={<ProtectedRoute><PlatformSettings /></ProtectedRoute>} />
        <Route path="/superadmin/settings/general" element={<ProtectedRoute><GeneralSettings /></ProtectedRoute>} />
        <Route path="/superadmin/settings/payment" element={<ProtectedRoute><PaymentSettings /></ProtectedRoute>} />
        <Route path="/superadmin/settings/invoice" element={<ProtectedRoute><InvoiceSettings /></ProtectedRoute>} />
        <Route path="/superadmin/settings/members" element={<ProtectedRoute><MembersSettings /></ProtectedRoute>} />
        <Route path="/superadmin/settings/security" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />

        

        {/* Catch-all route for 404s */}
        <Route path="*" element={<div style={{padding: "2rem", textAlign: "center"}}>404 - Page Not Found</div>} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
