import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, TextField, Button, Box } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const EditableTableCell = ({ initialRoomNumber }) => {
    const [isEditing, setIsEditing] = useState(false); 
    const [roomNumber, setRoomNumber] = useState(initialRoomNumber); 
    const [tempRoomNumber, setTempRoomNumber] = useState(initialRoomNumber); 


    const handleSave = () => {
        setRoomNumber(tempRoomNumber); 
        setIsEditing(false); 
    };


    const handleCancel = () => {
        setTempRoomNumber(roomNumber); 
        setIsEditing(false); 
    };

    return (
        <TableCell>
            {isEditing ? (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            value={tempRoomNumber}
                            onChange={(e) => setTempRoomNumber(e.target.value)}
                            size="small"
                            sx={{ marginBottom: 1, maxWidth: 60 }}
                            inputProps={{ style: { fontSize: 12, padding: 4 } }} 
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSave}
                            size="small"
                            sx={{ fontSize: '10px', padding: '2px 5px', marginRight: 1 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleCancel}
                            size="small"
                            sx={{ fontSize: '10px', padding: '2px 5px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    
                    {roomNumber || '0'}
                    <IconButton
                        size="small"
                        style={{ color: '#ff955a', marginLeft: 10 }}
                        onClick={() => setIsEditing(true)} 
                    >
                        <BorderColorIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                </Box>
            )}
        </TableCell>
    );
};

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10); 

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('https://test.appristine.in/api/reservation-list', {
                    params: {
                        location_id: 64,
                        start_date: '',  
                        end_date: ''     
                    },
                    headers: {
                        'Authorization': 'Bearer 1270|8EtfEIU9dWkKmAfd8KD5g7s3MxsaSNrq4ya0myhb9d42f50d'  // Replace with your actual token
                    }
                });

                if (response.data.success) {
                    setReservations(response.data.data);
                } else {
                    setError('No data available');
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setError('Error fetching reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f3f7ff', color: '#fff' }}>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Current Status</TableCell>
                            <TableCell>Ticket Number</TableCell>
                            <TableCell>Room Number</TableCell>
                            <TableCell>Ext Billing</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.length > 0 ? (
                            reservations.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((reservation) => (
                                <TableRow key={reservation.id} style={{ backgroundColor: 'white' }}>
                                    <TableCell>{reservation.customer_name || '0'}</TableCell>
                                    <TableCell>{reservation.start_date || '0'} <small>{reservation.start_time || '0'}</small></TableCell>
                                    <TableCell>{reservation.end_date || '0'}, <small>{reservation.end_time || '0'}</small></TableCell>
                                    <TableCell>{reservation.status || '0'}</TableCell>
                                    <TableCell>{reservation.ticket_number || '0'}</TableCell>
                                    <EditableTableCell initialRoomNumber={reservation.room_number || '0'} />
                                    <TableCell><span style={{ color: "red", padding: "4px", backgroundColor: "#f2b2a2" }}>{reservation.ext_billing || '0'}</span></TableCell>
                                    <TableCell>
                                        <IconButton size="small" style={{ color: '#ff955a'}}>
                                            <span style={{backgroundColor:"#f2b2a2", padding:4}}><BorderColorIcon sx={{fontSize:15}} /></span>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8}>No reservations available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <Typography sx={{ color: "#b5b0c0"}}>Showing data {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, reservations.length)} of {reservations.length} records</Typography>
                <Pagination
                    count={Math.ceil(reservations.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            borderColor: '#3D5B77',
                        },
                        '& .MuiPaginationItem-previousNext': {
                            color: '#3D5B77', 
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#3D5B77', 
                            color: 'black', 
                            '&:hover': {
                                backgroundColor: '#2c4a60', 
                            }
                        },
                        '& .MuiPaginationItem': {
                            color: '#3D5B77', 
                        },
                        '& .MuiPaginationItem-ellipsis': {
                            color: '#3D5B77',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ReservationList;
