import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import SideMenu from './SideMenu'

export default function Layout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <SideMenu />

            <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    )
}
