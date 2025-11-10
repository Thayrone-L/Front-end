import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import EventIcon from '@mui/icons-material/Event'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
export default function SideMenu() {
    const navigate = useNavigate()

    const menuItems = [
        { text: 'Início', icon: <HomeIcon />, path: '/dashboard' },
        { text: 'Reservas', icon: <EventIcon />, path: '/reservations' },
        { text: 'Salas', icon: <MeetingRoomIcon />, path: '/rooms' },
        { text: 'Localizações', icon: <LocationOnIcon />, path: '/locations' },
        { text: 'Usuários', icon: <PersonIcon />, path: '/users' },
    ]

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1E1E1E',
                    color: '#fff'
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
