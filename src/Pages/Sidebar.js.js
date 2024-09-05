import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { Dashboard, LocationOn, Book, People } from '@mui/icons-material';
import Logo from "../Assets/parksync logo.png";


const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, link: '/dashboard' },
        { text: 'Location', icon: <LocationOn />, link: '/location' },
        { text: 'Reservation', icon: <Book />, link: '/reservation' },
        { text: 'Users', icon: <People />, link: '/users' }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1b2728',
                    color: '#fff',
                },
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: "center", marginBottom: "30px" }}>
                <img src={Logo} alt="Logo" style={{ width: '100px', height: '45px' }} />
                <div style={{ marginLeft: '-40px' }}>
                    <Typography variant="h6" noWrap sx={{ color: '#fff' }}>
                        ParkSyn
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                        Admin Page
                    </Typography>
                </div>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.link}
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'transparent',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            color: '#fff',
                            paddingLeft: '0px',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: selectedIndex === index ? '#2d4a4d' : 'transparent',
                            borderLeft: selectedIndex === index ? '4px solid #2d4a4d' : '4px solid transparent',
                        }}>
                            <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </div>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
