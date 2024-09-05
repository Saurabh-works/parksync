import React from 'react';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header1 = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const userName = "Saurabh"; 
    const shortName = userName.length > 5 ? `${userName.substring(0, 5)}...` : userName;

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px', backgroundColor: '#fff' }}>
                {/* Left Side */}
                <Box>
                    <Typography variant="h6">Reservation</Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        {props.data}
                    </Typography>
                </Box>

                {/* Right Side */}
                <Box sx={{ display: 'flex', alignItems: 'center', width: '150px', height: '50px', backgroundColor: '#fff', borderRadius: '8px', padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <Avatar sx={{ width: '40px', height: '40px', marginRight: '10px' }} src="https://media.istockphoto.com/id/839214266/photo/intense-portrait-of-a-man-with-beard.jpg?s=612x612&w=0&k=20&c=L3qwp0pKyKB7NeNtnvwfg2vzwZzLz8ByVHRqxOnAAJA=" /> {/* User Image */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {shortName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>Admin</Typography>
                    </Box>
                    <IconButton onClick={handleClick} sx={{ marginLeft: 'auto' }}>
                        <ArrowDropDownIcon />
                    </IconButton>
                </Box>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '200px',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

            <Box sx={{ borderBottom: '1px solid #ddd', marginTop: '10px' }} />
        </>
    );
};

export default Header1;
