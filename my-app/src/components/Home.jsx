import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  useTheme,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  Backup as BackupIcon,
  CloudUpload as CloudUploadIcon,
  Group as GroupIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import AboutUsDialog from './AboutUsDialog';

const features = [
  {
    title: 'File Storage & Retrieval',
    description: 'Upload and download files with ease in our distributed system.',
    icon: <CloudUploadIcon />,
  },
  {
    title: 'Distributed Storage',
    description: 'Files are automatically distributed across multiple nodes for reliability.',
    icon: <StorageIcon />,
  },
  {
    title: 'Metadata Management',
    description: 'Comprehensive file tracking and management system.',
    icon: <SearchIcon />,
  },
  {
    title: 'User Authentication',
    description: 'Secure access with Google OAuth and role-based permissions.',
    icon: <SecurityIcon />,
  },
  {
    title: 'File Search & Management',
    description: 'Advanced search capabilities and file management tools.',
    icon: <SearchIcon />,
  },
  {
    title: 'Data Integrity',
    description: 'Automatic data recovery and checksum validation.',
    icon: <BackupIcon />,
  },
];

const Home = () => {
  const theme = useTheme();
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  const handleOpenAboutUs = () => {
    setAboutUsOpen(true);
  };

  const handleCloseAboutUs = () => {
    setAboutUsOpen(false);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, sm: 12, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  fontWeight: 700,
                }}
              >
                StellarFS
              </Typography>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                }}
              >
                A Scalable Distributed File System
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  maxWidth: '600px',
                }}
              >
                Store, manage, and retrieve files efficiently across multiple nodes with
                built-in fault tolerance and high availability.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ 
                  mt: 2,
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 1, sm: 1.5, md: 2 },
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <GroupIcon 
                sx={{ 
                  fontSize: { xs: 150, sm: 180, md: 200 }, 
                  opacity: 0.8 
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, sm: 6, md: 8 } }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Key Features
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              px: 2,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            }}
          >
            Discover the powerful capabilities of StellarFS that make it the perfect solution for your distributed storage needs
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'stretch',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 'calc(33.333% - 24px)',
                },
                minWidth: 0,
                display: 'flex',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      sx={{
                        backgroundColor: 'primary.light',
                        borderRadius: '50%',
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: { 
                          fontSize: 32,
                          color: 'primary.main',
                        }
                      })}
                    </Box>
                  }
                  title={
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      }}
                    >
                      {feature.title}
                    </Typography>
                  }
                  sx={{
                    p: 3,
                    pb: 1,
                  }}
                />
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    p: 3,
                    pt: 1,
                  }}
                >
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      <AboutUsDialog open={aboutUsOpen} onClose={handleCloseAboutUs} />
    </Box>
  );
};

export default Home; 