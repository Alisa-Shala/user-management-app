import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

function UserDetails() {
  const { id } = useParams();  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to right, #e0f7fa, #fce4ec)",
        padding: 2
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {user.name}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <LocationOnIcon sx={{ color: "red", marginRight: 1 }} />
            <strong>Address:</strong>&nbsp;
            {user.address?.street}, {user.address?.city}
          </Typography>

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <PhoneIcon sx={{ color: "green", marginRight: 1 }} />
            <strong>Phone:</strong>&nbsp;
            {user.phone}
          </Typography>

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <LanguageIcon sx={{ color: "blue", marginRight: 1 }} />
            <strong>Website:</strong>&nbsp;
            {user.website}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetails;
