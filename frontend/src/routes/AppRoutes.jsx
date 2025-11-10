import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage.jsx'
import ReservationsPage from '../pages/ReservationsPage.jsx'
import RoomsPage from '../pages/RoomsPage.jsx'
import LocationsPage from '../pages/LocationsPage.jsx'
import UsersPage from '../pages/UsersPage.jsx'
import DashBoard from '../pages/DashBoard.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Layout from '../components/Layout.jsx' 

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Route>
        </Routes>
    )
}
