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
        // Mock data
        const mockData = {
          totalCapacity: 2048, // 2TB in GB
          usedStorage: 1280, // 1.25TB in GB
          nodeData: [
            { 
              name: 'Node 1', 
              storage: 420, 
              capacity: 512,
              files: 15420,
              used: 420,
              total: 512
            },
            { 
              name: 'Node 2', 
              storage: 380, 
              capacity: 512,
              files: 12840,
              used: 380,
              total: 512
            },
            { 
              name: 'Node 3', 
              storage: 290, 
              capacity: 512,
              files: 9650,
              used: 290,
              total: 512
            },
            { 
              name: 'Node 4', 
              storage: 190, 
              capacity: 512,
              files: 7230,
              used: 190,
              total: 512
            }
          ],
          replicationStatus: [
            { 
              name: 'Fully Replicated',
              value: 65,
              fileType: 'Critical Data',
              copies: 3,
              status: 'healthy'
            },
            { 
              name: 'Partially Replicated',
              value: 25,
              fileType: 'Standard Data',
              copies: 2,
              status: 'warning'
            },
            { 
              name: 'Single Copy',
              value: 10,
              fileType: 'Archival Data',
              copies: 1,
              status: 'critical'
            }
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

  // Chart colors
  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main
  ];

  // Prepare data for storage capacity pie chart
  const pieData = [
    { name: 'Used Space', value: storageData.usedStorage },
    { name: 'Free Space', value: storageData.totalCapacity - storageData.usedStorage }
  ];

  const COLORS = pieChartColors;

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

      {/* Main Content - 2x2 Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
          width: '100%',
        }}
      >
        {/* Total Storage Capacity */}
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Total Storage Capacity
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Used Space', value: storageData.usedStorage },
                    { name: 'Free Space', value: storageData.totalCapacity - storageData.usedStorage }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Storage Usage per Node */}
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Storage Usage per Node
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={storageData.nodeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" fill="#8884d8" name="Used Storage" />
                <Bar dataKey="total" fill="#82ca9d" name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Data Replication Status */}
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Data Replication Status
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={storageData.replicationStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {storageData.replicationStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* File Distribution Map */}
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            File Distribution Map
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={storageData.nodeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="files" fill="#ffc658" name="Number of Files" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default StorageOverview; 