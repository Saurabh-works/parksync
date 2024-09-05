import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Divider, Select, MenuItem, FormControl, Button, ListItem, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, RadioGroup, FormControlLabel, Radio, Checkbox
} from '@mui/material';
import { CarRental, Search as SearchIcon } from '@mui/icons-material';
import Header1 from './Header1';


const AddReservation = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [carColors, setCarColors] = useState([]);
  const [openCarMakeDialog, setOpenCarMakeDialog] = useState(false);
  const [openCarColorDialog, setOpenCarColorDialog] = useState(false);

  useEffect(() => {
    const fetchCarColor = async () => {
      try {
        const response = await axios.get('https://test.appristine.in/api/car-color', {
          headers: {
            'Authorization': 'Bearer 1270|8EtfEIU9dWkKmAfd8KD5g7s3MxsaSNrq4ya0myhb9d42f50d',
          },
        });
        if (response.data.success) {
          setCarColors(response.data.data);
          console.log(response.data.data);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching car colors:', error);
      }
    };
    fetchCarColor();
  }, []);


  // Car Make Dialog Handlers
  const handleOpenCarMakeDialog = () => {
    setOpenCarMakeDialog(true);
  };

  const handleCloseCarMakeDialog = () => {
    setOpenCarMakeDialog(false);
  };

  // Car Color Dialog Handlers
  const handleOpenCarColorDialog = () => {
    setOpenCarColorDialog(true);
  };

  const handleCloseCarColorDialog = () => {
    setOpenCarColorDialog(false);
  };

  const handleCarSelection = (event) => {
    setSelectedCar(event.target.value);
  };

  return (
    <div>
      <Header1 data="Add Reservation" />

      <Box sx={{ padding: '20px' }}>
        {/* Guest Details */}
        <Typography variant="h6" sx={{ borderBottom: '2px solid brown', paddingBottom: '5px' }}>
          Guest Details
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />

        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>Guest Name*</Typography>
            <input
              type="text"
              placeholder="Enter Guest Name"
              style={{ width: '90%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>License Plate*</Typography>
            <input
              type="text"
              placeholder="Enter License Plate"
              style={{ width: '90%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </Box>
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2" sx={{ marginBottom: '5px' }}>Guest Mobile*</Typography>
          <input
            type="tel"
            placeholder="Enter Guest Mobile"
            style={{ width: '44%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Box>
        <Divider sx={{ margin: '20px 0', borderBottomWidth: '7px', borderColor: '#f6f8f9' }} />

        {/* Time and Location */}
        <Typography variant="body2" sx={{ marginBottom: '5px' }}>Time &amp; Location</Typography>
        <Box sx={{ backgroundColor: '#f6f8f9', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Start Date*</Typography>
              <input
                type="date"
                style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Start Time*</Typography>
              <input
                type="time"
                style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Checkout Date*</Typography>
              <input
                type="date"
                style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Checkout Time*</Typography>
              <input
                type="time"
                style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </Box>
          </Box>
          <Divider sx={{ borderStyle: 'dashed', margin: '20px 0', borderBottomWidth: '2px', }} />
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Location*</Typography>
              <FormControl fullWidth>
                <Select
                  defaultValue=""
                  style={{ width: '100%' }}
                >
                  <MenuItem value="Location1">Location 1</MenuItem>
                  <MenuItem value="Location2">Location 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>Rate*</Typography>
              <FormControl fullWidth>
                <Select
                  defaultValue=""
                  style={{ width: '100%' }}
                >
                  <MenuItem value="Rate1">Rate 1</MenuItem>
                  <MenuItem value="Rate2">Rate 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

        </Box>
        <Divider sx={{ borderColor: '#f6f8f9', margin: '20px 0', borderWidth: '5px' }} />

        {/* Car Details */}
        <Box sx={{ backgroundColor: '#f6f8f9', padding: '30px', borderRadius: '4px', marginBottom: '20px' }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            {/* Car Make */}
            <Box
              sx={{
                backgroundColor: '#42696d',
                borderRadius: '4px',
                padding: '10px',
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
              onClick={handleOpenCarMakeDialog} 
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px'
                }}
              >
                <CarRental sx={{ color: '#1b2728', fontSize: '16px' }} />
              </Box>
              <Typography variant="body2" sx={{ color: '#fff' }}>Car Make</Typography>
            </Box>

            {/* Car type*/}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '4px',
                padding: '10px',
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: "1px solid #42696d",
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#f6f8f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px'
                }}
              >
                <CarRental sx={{ color: '#1b2728', fontSize: '16px' }} />
              </Box>
              <Typography variant="body2" sx={{ color: 'black' }}>Car type</Typography>
            </Box>

            {/* Car Color*/}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '4px',
                padding: '10px',
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: "1px solid #42696d",
              }}
              onClick={handleOpenCarColorDialog}
            >
              <Box
                sx={{
                  backgroundColor: '#f6f8f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                }}
              >
                <CarRental sx={{ color: '#1b2728', fontSize: '16px' }} />
              </Box>
              <Typography variant="body2" sx={{ color: 'black' }}>Car Color</Typography>
            </Box>

          </Box>
        </Box>

        {/* Dialog for Car Make Selection */}
        <Dialog open={openCarMakeDialog} onClose={handleCloseCarMakeDialog}>
          <DialogTitle>Car Make</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              placeholder="Search Car Make"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '20px' }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
            <RadioGroup value={selectedCar} onChange={handleCarSelection}>
              <FormControlLabel value="Aura" control={<Radio />} label="Aura" />
              <FormControlLabel value="Alfa Romeo" control={<Radio />} label="Alfa Romeo" />
              <FormControlLabel value="Aston Martin" control={<Radio />} label="Aston Martin" />
              <FormControlLabel value="Audi" control={<Radio />} label="Audi" />
              <FormControlLabel value="BMW" control={<Radio />} label="BMW" />
            </RadioGroup>
          </DialogContent>
          <DialogActions sx={{ display: "flex", alignItems: "start", gap: 0 }}>
            <Button
              onClick={handleCloseCarMakeDialog}
              color="primary"
              sx={{ bgcolor: "white", color: "black", border: "1px solid black", flexGrow: 1 }}
            >
              OK
            </Button>
            <Button
              onClick={handleCloseCarMakeDialog}
              color="secondary"
              sx={{ bgcolor: "#1b2728", color: "white", border: "1px solid #1b2728", flexGrow: 1 }}
            >
              Cancel
            </Button>

          </DialogActions>

        </Dialog>

        {/* Dialog for Car Color */}
        <Dialog open={openCarColorDialog} onClose={handleCloseCarColorDialog}>
          <DialogTitle>Select Car Color</DialogTitle>
          <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <Select
                value={selectedCar}
                onChange={handleCarSelection}
                displayEmpty
                sx={{ width: '300px', textAlign: 'center'}}
              >
                <MenuItem value="" disabled>Select a color</MenuItem>

                {carColors.map((color, index) => {
                  const [colorName, hexCode] = color.split(' ');
                  return (
                    <MenuItem key={color.id} value={colorName} style={{ color: hexCode }} sx={{ bgcolor: "#1b2728" }}>{colorName}: {hexCode}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ display: "flex", alignItems: "start", gap: 0 }}>
            <Button
              onClick={handleCloseCarColorDialog}
              color="primary"
              sx={{ bgcolor: "white", color: "black", border: "1px solid black", flexGrow: 1 }}
            >
              Submit
            </Button>
            <Button
              onClick={handleCloseCarColorDialog}
              color="secondary"
              sx={{ bgcolor: "#1b2728", color: "white", border: "1px solid #1b2728", flexGrow: 1 }}
            >
              Cancel
            </Button>

          </DialogActions>
        </Dialog>

        {/* Settings */}
        <Box sx={{ backgroundColor: '#f6f8f9', padding: '35px', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', border: "1px solid black" }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'black' }}><b>In and Out Privilege</b></Typography>
            <Box sx={{ display: "flex", marginLeft: -2 }}>
              <Checkbox />
              <Typography variant="body2" sx={{ color: 'black', marginTop: 1 }}>Allow in and out privilege</Typography>
            </Box>
          </Box>
          <Box sx={{ maxWidth: '60%' }}>
            <Typography variant="body2" sx={{ color: 'black', textAlign: 'left' }}><b>About in and out privilege</b></Typography>
            <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
              This is some description text about in and out privileges. It should be brief. This is some description text about in and out privileges. It should be brief.
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
          <Button variant="contained" color="primary" sx={{ width: '150px', bgcolor: "#1b2728", borderRadius: 2 }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" sx={{ width: '150px', bgcolor: "white", color: "black", border: "1px solid black", borderRadius: 2 }}>
            Save and Add
          </Button>
        </Box>

      </Box>
    </div>
  );
};

export default AddReservation;

