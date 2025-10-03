import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { addUser, deleteUser, setUsers, updateUser } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Ngarko userat nga localStorage ose API
  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (stored) {
      dispatch(setUsers(JSON.parse(stored)));
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          dispatch(setUsers(data));
          localStorage.setItem('users', JSON.stringify(data));
        })
        .catch(err => console.error("Error fetching users:", err));
    }
  }, [dispatch]);

  // Ruaj çdo ndryshim të users në localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required!");
      return;
    }
    if (!emailRegex.test(newUser.email)) {
      alert("Invalid email format!");
      return;
    }

    dispatch(addUser(newUser));
    setNewUser({ name: '', email: '' });
  };

  const handleSort = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    dispatch(setUsers(sortedUsers));
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!editUser.name || !editUser.email) {
      alert("Name and Email are required!");
      return;
    }
    if (!emailRegex.test(editUser.email)) {
      alert("Invalid email format!");
      return;
    }

    dispatch(updateUser(editUser));
    setEditUser(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteUser(deleteId));
      setDeleteId(null);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User List</Typography>

      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSort}>
        Sort by Name
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company?.name || 'No company'}</TableCell>
                <TableCell>
                  <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: '5px' }}
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="warning"
                    style={{ marginRight: '5px' }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteId(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Form */}
      <Box mt={4}>
        <Typography variant="h5">Add New User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
            margin="normal"
            error={newUser.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)}
            helperText={
              newUser.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)
                ? "Invalid email"
                : ""
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </form>
      </Box>

      {/* Edit User Form */}
      {editUser && (
        <Box mt={4}>
          <Typography variant="h5">Edit User</Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Name"
              variant="outlined"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              fullWidth
              margin="normal"
              error={editUser.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.email)}
              helperText={
                editUser.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.email)
                  ? "Invalid email"
                  : ""
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ marginRight: '5px' }}
            >
              Save
            </Button>
            <Button variant="contained" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
          </form>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserList;
