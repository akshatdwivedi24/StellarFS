import React from 'react';
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
} from '@mui/icons-material';

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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    title: 'System Operations & Maintenance ⚙️',
    description: 'System administration and optimization tools',
    icon: <SettingsIcon />,
    details: [
      'Replication Status - Show how data is copied across nodes',
      'Backup & Recovery Tools - Options to create and restore backups',
      'Auto-Scaling Settings - Configure dynamic node addition/removal',
      'Data Deduplication & Compression - Display efficiency reports'
    ]
  },
  {
    title: 'Real-Time Alerts & Notifications 🚨',
    description: 'Proactive monitoring and alerting system',
    icon: <NotificationsIcon />,
    details: [
      'Storage Full Alerts - Notify admins when storage reaches a threshold',
      'File Access Notifications - Alert users about critical file changes',
      'Security Warnings - Detect and report unauthorized access attempts'
    ]
  }
];

const Dashboard = ({ user }) => {
  const theme = useTheme();

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
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          System Dashboard
        </Typography>
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
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                  cursor: 'pointer',
                  '& .feature-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    className="feature-icon"
                    sx={{
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                    }}
                  >
                    {React.cloneElement(feature.icon, {
                      sx: { 
                        color: 'primary.main',
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
                      fontWeight: 600,
                      fontSize: '1.2rem',
                    }}
                  >
                    {feature.title}
                  </Typography>
                }
              />
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  {feature.description}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <List dense>
                  {feature.details.map((detail, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <AssessmentIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={detail}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 