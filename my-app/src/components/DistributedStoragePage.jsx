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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Storage as StorageIcon,
  CloudDone as CloudDoneIcon,
  CloudOff as CloudOffIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const DistributedStoragePage = ({ onNavigateBack }) => {
  const theme = useTheme();
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching storage nodes
    setTimeout(() => {
      setNodes([
        { id: 1, name: 'Node 1', status: 'online', storageUsed: 65, totalStorage: 100, files: 1250, location: 'US-East' },
        { id: 2, name: 'Node 2', status: 'online', storageUsed: 42, totalStorage: 100, files: 850, location: 'US-West' },
        { id: 3, name: 'Node 3', status: 'offline', storageUsed: 0, totalStorage: 100, files: 0, location: 'EU-Central' },
        { id: 4, name: 'Node 4', status: 'online', storageUsed: 78, totalStorage: 100, files: 1500, location: 'Asia-Pacific' },
        { id: 5, name: 'Node 5', status: 'degraded', storageUsed: 90, totalStorage: 100, files: 1800, location: 'South America' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case 'offline':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      case 'degraded':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      default:
        return <CloudOffIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  const getStatusChip = (status) => {
    let color = 'default';
    switch (status) {
      case 'online':
        color = 'success';
        break;
      case 'offline':
        color = 'error';
        break;
      case 'degraded':
        color = 'warning';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} size="small" />;
  };

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
              Distributed Storage
            </Typography>
            <Typography variant="subtitle1">
              Monitor and manage your distributed storage nodes
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Storage Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Storage Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Storage
                </Typography>
                <Typography variant="h4">
                  500 TB
                </Typography>
                <Typography color="textSecondary">
                  Across 5 nodes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Storage Used
                </Typography>
                <Typography variant="h4">
                  275 TB
                </Typography>
                <Typography color="textSecondary">
                  55% of total capacity
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Files Stored
                </Typography>
                <Typography variant="h4">
                  5,400
                </Typography>
                <Typography color="textSecondary">
                  Across all nodes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Node List */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Storage Nodes</Typography>
          <Button startIcon={<RefreshIcon />} variant="outlined" size="small">
            Refresh
          </Button>
        </Box>
        <Divider />
        <List>
          {nodes.map((node) => (
            <React.Fragment key={node.id}>
              <ListItem>
                <ListItemIcon>
                  {getStatusIcon(node.status)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">{node.name}</Typography>
                      {getStatusChip(node.status)}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Location: {node.location} • Files: {node.files}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={node.storageUsed} 
                            color={node.storageUsed > 90 ? 'error' : node.storageUsed > 70 ? 'warning' : 'primary'}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="textSecondary">
                            {node.storageUsed}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Button 
                    variant="outlined" 
                    size="small"
                    disabled={node.status === 'offline'}
                  >
                    Manage
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default DistributedStoragePage; 