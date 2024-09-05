import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Search, FilterList, Add, Download, ExpandMore } from '@mui/icons-material';
import Header1 from './Header1';
import ReservationList from './ReservationList';
import axios from 'axios';

const Reservation = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://test.appristine.in/api/basic-location-list', {
          headers: {
            'Authorization': 'Bearer 1270|8EtfEIU9dWkKmAfd8KD5g7s3MxsaSNrq4ya0myhb9d42f50d'
          }
        });
        if (response.data.success) {
          setLocations(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <>
      <Header1 data="Location Setting > Reservation Lists" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: '5px 10px', width: '40%', height: '35px', fontSize: '0.875rem' }}
        />

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Filter Tab */}
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            sx={{ color: '#1b2728', borderColor: '#1b2728', padding: '5px 10px', fontSize: '0.875rem' }}
            onClick={() => setShowFilter(true)}
          >
            Filter
          </Button>

          {/* Add Reservation Button */}
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#599192', color: 'white' }}
            component={Link}
            to="/add"
          >
            Add Reservation
          </Button>

          {/* Download Report Button */}
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{ color: '#fff', bgcolor: "#1b2728" }}
          >
            Download Report
          </Button>
        </Box>
      </Box>

      {/* Filter Pop-up Modal */}
      <Dialog open={showFilter} onClose={() => setShowFilter(false)} maxWidth="sm">
        <DialogContent>
          {/* Location Label and Select */}
          <FormControl fullWidth sx={{ marginBottom: 2, color:"black" }}>
            <InputLabel id="location-select-label"><b>Location</b></InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              sx={{ color: 'black' }}
            >
              {locations.map(location => (
                <MenuItem key={location.id} value={location.id}>
                  {location.id}. {location.location_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Start DateTime */}
          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
            <label htmlFor="start-date-time" style={{color:"black", marginBottom:10}}><b>Start Date & Time</b></label>
            <input
              type="datetime-local"
              id="start-date-time"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              style={{ padding: '5px', color: 'black', fontSize: '1rem', width: '100%', marginBottom: '10px' }}
            />
          </Box>

          {/* End DateTime */}
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="end-date-time" style={{color:"black", marginBottom:10}}><b>End Date & Time</b></label>
            <input
              type="datetime-local"
              id="end-date-time"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              style={{ padding: '5px', color: 'black', fontSize: '1rem', width: '100%', marginBottom: '5px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowFilter(false)}
            sx={{ bgcolor: "white", color: "black", border: "1px solid black", flexGrow: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => { setShowFilter(false); }}
            sx={{ bgcolor: "#1b2728", color: "white", border: "1px solid #1b2728", flexGrow: 1 }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reservation List */}
      <ReservationList />
    </>
  );
};

export default Reservation;
