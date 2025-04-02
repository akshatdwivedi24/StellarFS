import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  Backup as BackupIcon,
  CloudUpload as CloudUploadIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Folder as FolderIcon,
  Computer as ComputerIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Storage as StorageOverviewIcon,
  Upload as UploadIcon,
  Memory as MemoryIcon,
  Security as SecurityOverviewIcon,
  Build as BuildIcon,
  Warning as WarningIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import AboutUsDialog from './AboutUsDialog';

const features = [
  {
    title: 'Storage Overview 📊',
    description: 'Comprehensive storage analytics and monitoring',
    icon: <StorageOverviewIcon />,
    details: [
      'Total Storage Capacity - Display total available and used storage',
      'Storage Usage Per Node - Show how much data each node is storing',
      'Data Replication Status - Indicate how many copies exist for each file',
      'File Distribution Map - Visual representation of file locations across nodes'
    ],
    view: 'storage-overview'
  },
  {
    title: 'File Management Panel 📂',
    description: 'Complete file handling and organization system',
    icon: <FolderIcon />,
    details: [
      'Upload/Download Files - Allow users to interact with stored files',
      'View File Metadata - Show file size, creation date, last modified date, and access permissions',
      'Search & Filter Files - Enable searching based on filename, type, owner, or date',
      'File Versioning - Show previous versions of files for rollback'
    ],
    view: 'file-management'
  },
  {
    title: 'Node Health & Performance Monitoring 🖥️',
    description: 'Real-time system health and performance tracking',
    icon: <ComputerIcon />,
    details: [
      'List of Active/Inactive Nodes - Show which servers are online/offline',
      'CPU & Memory Usage - Monitor real-time resource consumption of each node',
      'Network Latency - Measure file access speeds between nodes',
      'Fault Detection Alerts - Notify when a node fails or storage runs low'
    ],
    view: 'nodes'
  },
  {
    title: 'User & Access Control 🔑',
    description: 'Comprehensive user management and security',
    icon: <LockIcon />,
    details: [
      'User Authentication - Secure access with login/signup',
      'Role-Based Access Control - Assign different permissions to users',
      'Audit Logs - Track who accessed or modified files and when',
      'Activity Logs - Log file uploads, deletions, and transfers'
    ],
    view: 'users'
  },
  {
    title: 'System Operations & Maintenance ⚙️',
    description: 'System administration and optimization tools',
    icon: <SettingsIcon />,
    details: [
      'System Metrics - Monitor system performance and health',
      'Backup & Recovery - Create and manage system backups',
      'Maintenance Tasks - Optimize storage and perform maintenance',
      'System Configuration - Configure system settings and auto-scaling'
    ],
    view: 'system-operations'
  },
  {
    title: 'Real-Time Alerts & Notifications 🚨',
    description: 'Proactive monitoring and alerting system',
    icon: <NotificationsIcon />,
    details: [
      'Storage Full Alerts - Notify admins when storage reaches a threshold',
      'File Access Notifications - Alert users about critical file changes',
      'Security Warnings - Detect and report unauthorized access attempts'
    ],
    view: 'real-time-alerts'
  }
];

const Dashboard = ({ user, onNavigate }) => {
  const theme = useTheme();
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  const handleOpenAboutUs = () => {
    setAboutUsOpen(true);
  };

  const handleCloseAboutUs = () => {
    setAboutUsOpen(false);
  };

  const handleFeatureClick = (view) => {
    if (onNavigate && view) {
      onNavigate(view);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          mb: 4,
          borderRadius: 0,
          boxShadow: theme.shadows[3],
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={user?.picture}
                sx={{
                  width: 80,
                  height: 80,
                  border: '3px solid white',
                  boxShadow: theme.shadows[3],
                }}
              />
            </Grid>
            <Grid item>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Welcome, {user?.name}!
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{
                  opacity: 0.9,
                  fontSize: '1.1rem',
                }}
              >
                Manage your files and storage with StellarFS
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Grid */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 4,
            mb: 4,
            width: '100%',
            borderRadius: 2,
            boxShadow: theme.shadows[3],
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              System Dashboard
            </Typography>
          </Container>
        </Paper>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  cursor: 'pointer',
                  '& .feature-icon': {
                    transform: 'scale(1.1) translateY(-2px)',
                  },
                },
              }}
              onClick={() => handleFeatureClick(feature.view)}
            >
              <CardHeader
                avatar={
                  <Box
                    className="feature-icon"
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: '12px',
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    {React.cloneElement(feature.icon, {
                      sx: { 
                        color: 'white',
                        fontSize: '2rem',
                      }
                    })}
                  </Box>
                }
                title={
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      mb: 0.5,
                    }}
                  >
                    {feature.title}
                  </Typography>
                }
                sx={{
                  pb: 0,
                  '& .MuiCardHeader-avatar': {
                    marginRight: 2.5,
                  },
                }}
              />
              <CardContent sx={{ pt: 2, pb: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant="caption" 
                    color="primary.main"
                    sx={{ 
                      fontWeight: 600,
                      display: 'block',
                      mb: 1.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Key Features
                  </Typography>
                  <List 
                    dense 
                    sx={{ 
                      '& .MuiListItem-root': { 
                        px: 0, 
                        py: 0.5,
                      } 
                    }}
                  >
                    {feature.details.map((detail, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon sx={{ minWidth: 28, color: 'primary.main' }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: '1rem' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={detail} 
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.secondary',
                            sx: { lineHeight: 1.4 }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <AboutUsDialog open={aboutUsOpen} onClose={handleCloseAboutUs} />
    </Box>
  );
};

export default Dashboard; 