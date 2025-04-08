import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Description as MetadataIcon,
  Sync as ReplicationIcon,
  Memory as NodeIcon,
  ArrowBack as ArrowBackIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const ServiceCard = ({ title, icon, description, onClick }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={3}
      onClick={onClick}
      sx={{
        p: 3,
        height: '100%',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}15)`,
        border: `1px solid ${theme.palette.primary.main}30`,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'white',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '80%' }}>
        {description}
      </Typography>
    </Paper>
  );
};

function SystemDashboard({ onNavigateBack }) {
  const theme = useTheme();

  const services = [
    {
      title: 'FileStorage Service',
      icon: <StorageIcon sx={{ fontSize: 32 }} />,
      description: 'Core file storage and retrieval system with advanced caching and optimization',
      path: 'file-storage'
    },
    {
      title: 'File Metadata Management Service',
      icon: <MetadataIcon sx={{ fontSize: 32 }} />,
      description: 'Comprehensive metadata tracking and management for all stored files',
      path: 'metadata-management'
    },
    {
      title: 'Replication Service',
      icon: <ReplicationIcon sx={{ fontSize: 32 }} />,
      description: 'Distributed file replication and synchronization across nodes',
      path: 'distributed-storage'
    },
    {
      title: 'Node Management & Health Monitoring',
      icon: <NodeIcon sx={{ fontSize: 32 }} />,
      description: 'Real-time node health monitoring and management system',
      path: 'user-authentication'
    },
  ];

  const handleServiceClick = (path) => {
    onNavigateBack(path);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={2}
        sx={{
          mb: 4, 
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          borderRadius: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          color: 'white',
        }}>
          <IconButton onClick={() => onNavigateBack('home')} sx={{ color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <DashboardIcon sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            System Dashboard
          </Typography>
        </Box>
      </Paper>

      <Grid 
        container 
        spacing={4} 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {services.map((service, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
              <ServiceCard 
                {...service} 
                onClick={() => handleServiceClick(service.path)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SystemDashboard; 