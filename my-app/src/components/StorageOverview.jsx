import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  LinearProgress,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Devices as DevicesIcon,
  Backup as BackupIcon,
  Map as MapIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const StorageOverview = ({ onNavigateBack }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storageData, setStorageData] = useState({
    totalCapacity: 0,
    usedStorage: 0,
    nodeData: [],
    replicationStatus: [],
  });

  // Mock data - to be replaced with actual API calls
  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // In production, this would be an actual API call
        // const response = await fetch('/api/storage/overview');
        // const data = await response.json();
        
        // Mock data
        const mockData = {
          totalCapacity: 1024, // GB
          usedStorage: 486, // GB
          nodeData: [
            { name: 'Node 1', storage: 180, capacity: 256 },
            { name: 'Node 2', storage: 145, capacity: 256 },
            { name: 'Node 3', storage: 98, capacity: 256 },
            { name: 'Node 4', storage: 63, capacity: 256 },
          ],
          replicationStatus: [
            { fileType: 'Documents', copies: 3, status: 'healthy' },
            { fileType: 'Images', copies: 3, status: 'healthy' },
            { fileType: 'Videos', copies: 2, status: 'warning' },
            { fileType: 'Archives', copies: 1, status: 'critical' },
          ],
        };
        
        setStorageData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load storage data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const pieData = [
    { name: 'Used', value: storageData.usedStorage },
    { name: 'Free', value: storageData.totalCapacity - storageData.usedStorage },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.grey[300]];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'critical':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
              Storage Overview
            </Typography>
            <Typography variant="subtitle1">
              Comprehensive analytics and monitoring for your distributed storage system
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Total Storage Capacity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Total Storage Capacity" 
              avatar={<StorageIcon color="primary" />}
            />
            <CardContent>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} GB`} />
                  </PieChart>
                </ResponsiveContainer>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  {storageData.usedStorage} GB used of {storageData.totalCapacity} GB total
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(storageData.usedStorage / storageData.totalCapacity) * 100} 
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Storage Usage Per Node */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Storage Usage Per Node" 
              avatar={<DevicesIcon color="primary" />}
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={storageData.nodeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Storage (GB)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `${value} GB`} />
                    <Legend />
                    <Bar dataKey="storage" name="Used Storage" fill={theme.palette.primary.main} />
                    <Bar dataKey="capacity" name="Total Capacity" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Replication Status */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Data Replication Status" 
              avatar={<BackupIcon color="primary" />}
            />
            <CardContent>
              <List>
                {storageData.replicationStatus.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {getStatusIcon(item.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.fileType}
                        secondary={`${item.copies} ${item.copies === 1 ? 'copy' : 'copies'} across the cluster`}
                      />
                    </ListItem>
                    {index < storageData.replicationStatus.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Replication Policy:
                </Typography>
                <Typography variant="body2">
                  Critical data: 3 copies | Standard data: 2 copies | Archival data: 1 copy
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* File Distribution Map */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="File Distribution Map" 
              avatar={<MapIcon color="primary" />}
            />
            <CardContent>
              <Box sx={{ 
                p: 2, 
                height: 300, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                bgcolor: 'background.paper', 
                borderRadius: 1 
              }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  The visual node map is being developed. It will show the geographical or logical distribution of files across nodes.
                </Typography>
                
                {/* Simple node representation */}
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 2, 
                  justifyContent: 'center',
                  maxWidth: '80%' 
                }}>
                  {storageData.nodeData.map((node, index) => (
                    <Paper
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        borderRadius: 2,
                        position: 'relative',
                      }}
                    >
                      <DevicesIcon />
                      <Typography variant="body2">{node.name}</Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          height: `${(node.storage / node.capacity) * 100}%`,
                          bgcolor: 'rgba(0,0,0,0.2)',
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StorageOverview; 