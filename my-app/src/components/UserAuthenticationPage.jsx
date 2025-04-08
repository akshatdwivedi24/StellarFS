import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const UserAuthenticationPage = ({ onNavigateBack }) => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add'); // 'add' or 'edit'

  useEffect(() => {
    // Simulate fetching users
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin', status: 'active', lastLogin: '2023-06-20T10:30:00', provider: 'google' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'editor', status: 'active', lastLogin: '2023-06-19T15:45:00', provider: 'email' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'viewer', status: 'inactive', lastLogin: '2023-06-10T09:20:00', provider: 'facebook' },
        { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'editor', status: 'active', lastLogin: '2023-06-18T14:15:00', provider: 'github' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'admin', status: 'active', lastLogin: '2023-06-17T11:30:00', provider: 'twitter' },
        { id: 6, name: 'Diana Miller', email: 'diana.miller@example.com', role: 'viewer', status: 'active', lastLogin: '2023-06-16T16:45:00', provider: 'email' },
        { id: 7, name: 'Edward Davis', email: 'edward.davis@example.com', role: 'editor', status: 'inactive', lastLogin: '2023-06-05T10:20:00', provider: 'google' },
        { id: 8, name: 'Fiona Clark', email: 'fiona.clark@example.com', role: 'viewer', status: 'active', lastLogin: '2023-06-15T13:10:00', provider: 'facebook' },
        { id: 9, name: 'George White', email: 'george.white@example.com', role: 'admin', status: 'active', lastLogin: '2023-06-14T09:30:00', provider: 'github' },
        { id: 10, name: 'Helen Turner', email: 'helen.turner@example.com', role: 'editor', status: 'inactive', lastLogin: '2023-06-01T11:45:00', provider: 'twitter' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'google':
        return <GoogleIcon />;
      case 'facebook':
        return <FacebookIcon />;
      case 'twitter':
        return <TwitterIcon />;
      case 'github':
        return <GitHubIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let icon = null;
    
    switch (status) {
      case 'active':
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'inactive':
        color = 'error';
        icon = <CancelIcon fontSize="small" />;
        break;
      case 'pending':
        color = 'warning';
        icon = <WarningIcon fontSize="small" />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        icon={icon} 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={color} 
        size="small" 
      />
    );
  };

  const getRoleChip = (role) => {
    let color = 'default';
    
    switch (role) {
      case 'admin':
        color = 'error';
        break;
      case 'editor':
        color = 'primary';
        break;
      case 'viewer':
        color = 'info';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={role.charAt(0).toUpperCase() + role.slice(1)} 
        color={color} 
        size="small" 
      />
    );
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={onNavigateBack} 
            sx={{ mr: 2, color: 'white' }} 
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              User Authentication
            </Typography>
            <Typography variant="subtitle1">
              Manage user accounts and authentication methods
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Authentication Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Authentication Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4">
                  {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Users
                </Typography>
                <Typography variant="h4">
                  {users.filter(user => user.status === 'active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Authentication Providers
                </Typography>
                <Typography variant="h4">
                  {new Set(users.map(user => user.provider)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Admin Users
                </Typography>
                <Typography variant="h4">
                  {users.filter(user => user.role === 'admin').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Authentication Providers */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Authentication Providers
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GoogleIcon sx={{ color: '#DB4437', mr: 1 }} />
                  <Typography>Google</Typography>
                </Box>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FacebookIcon sx={{ color: '#4267B2', mr: 1 }} />
                  <Typography>Facebook</Typography>
                </Box>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TwitterIcon sx={{ color: '#1DA1F2', mr: 1 }} />
                  <Typography>Twitter</Typography>
                </Box>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GitHubIcon sx={{ color: '#333', mr: 1 }} />
                  <Typography>GitHub</Typography>
                </Box>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* User List */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">User Accounts</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              startIcon={<AddIcon />} 
              variant="contained" 
              color="primary"
              onClick={() => handleOpenDialog('add')}
            >
              Add User
            </Button>
          </Box>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Typography>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleChip(user.role)}</TableCell>
                    <TableCell>{getStatusChip(user.status)}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getProviderIcon(user.provider)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleMenuClose(); handleOpenDialog('edit'); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit User</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reset Password</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SecurityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Permissions</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete User</ListItemText>
        </MenuItem>
      </Menu>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? 'Add New User' : 'Edit User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  defaultValue={selectedUser?.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  defaultValue={selectedUser?.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  select
                  variant="outlined"
                  defaultValue={selectedUser?.role || 'viewer'}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Authentication Provider"
                  select
                  variant="outlined"
                  defaultValue={selectedUser?.provider || 'email'}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="email">Email</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="github">GitHub</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleCloseDialog}>
            {dialogType === 'add' ? 'Add User' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserAuthenticationPage; 