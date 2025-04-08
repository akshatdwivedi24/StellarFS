import React, { useState, useMemo, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Switch,
  styled,
  FormControlLabel,
  Button,
  Avatar,
  Typography,
  Container,
  Alert
} from '@mui/material';
import { 
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Google as GoogleIcon,
  Info as InfoIcon,
  Storage as StorageIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import Home from './components/Home';
import FileManagement from './components/FileManagement';
import UserManagement from './components/UserManagement';
import SystemDashboard from './components/SystemDashboard';
import FileStoragePage from './components/FileStoragePage';
import MetadataManagementPage from './components/MetadataManagementPage';
import DistributedStoragePage from './components/DistributedStoragePage';
import UserAuthenticationPage from './components/UserAuthenticationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUsDialog from './components/AboutUsDialog';

// Styled Switch component
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 40,
  padding: 8,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(28px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 38,
    height: 38,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function App() {
  const [mode, setMode] = useState('light');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:8080/api/test')
      .then(response => response.text())
      .then(data => {
        console.log('Backend connection test:', data);
      })
      .catch(error => {
        console.error('Backend connection error:', error);
      });

    // Check for token in URL first (for new logins)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      try {
        // Store the token
        localStorage.setItem('token', token);
        
        // Decode the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          email: payload.sub,
          name: payload.name,
          picture: payload.picture
        });
        
        // Clear URL parameters without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error('Error processing token:', err);
        setError('Failed to process authentication token');
      }
    } else {
      // Check for existing token in localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Decode the token
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          
          // Check if token is expired
          const expirationTime = payload.exp * 1000; // Convert to milliseconds
          if (Date.now() < expirationTime) {
            setUser({
              email: payload.sub,
              name: payload.name,
              picture: payload.picture
            });
          } else {
            // Token expired, remove it
            localStorage.removeItem('token');
            setError('Your session has expired. Please log in again.');
          }
        } catch (err) {
          console.error('Error processing stored token:', err);
          localStorage.removeItem('token');
          setError('Invalid authentication token');
        }
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#00838F' : '#00BCD4',
        light: mode === 'light' ? '#4FB3BF' : '#4DD0E1',
        dark: mode === 'light' ? '#005662' : '#006064',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'light' ? '#1A237E' : '#FF6E40',
        light: mode === 'light' ? '#534BAE' : '#FF9E80',
        dark: mode === 'light' ? '#000051' : '#FF3D00',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? '#F8FAFB' : '#0A1929',
        paper: mode === 'light' ? '#FFFFFF' : '#132F4C',
      },
      text: {
        primary: mode === 'light' ? '#0A1929' : '#F8FAFB',
        secondary: mode === 'light' ? '#465A69' : '#B2BAC2',
      },
      error: {
        main: mode === 'light' ? '#D32F2F' : '#FF5252',
        light: mode === 'light' ? '#EF5350' : '#FF867F',
        dark: mode === 'light' ? '#C62828' : '#D50000',
      },
      warning: {
        main: mode === 'light' ? '#ED6C02' : '#FFB74D',
        light: mode === 'light' ? '#FF9800' : '#FFD54F',
        dark: mode === 'light' ? '#E65100' : '#F57C00',
      },
      success: {
        main: mode === 'light' ? '#2E7D32' : '#69F0AE',
        light: mode === 'light' ? '#4CAF50' : '#B9F6CA',
        dark: mode === 'light' ? '#1B5E20' : '#00C853',
      },
      divider: mode === 'light' ? 'rgba(10, 25, 41, 0.12)' : 'rgba(248, 250, 251, 0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.5px',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            padding: '8px 16px',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'light' 
                ? '0 4px 8px rgba(0, 131, 143, 0.15)'
                : '0 4px 8px rgba(0, 188, 212, 0.25)',
            },
          },
          contained: {
            boxShadow: mode === 'light'
              ? '0 2px 4px rgba(0, 131, 143, 0.1)'
              : '0 2px 4px rgba(0, 188, 212, 0.2)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 4px 12px rgba(0, 131, 143, 0.1)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: mode === 'light'
              ? '1px solid rgba(0, 131, 143, 0.05)'
              : '1px solid rgba(248, 250, 251, 0.05)',
            backdropFilter: 'blur(8px)',
            background: mode === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(19, 47, 76, 0.9)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: mode === 'light'
              ? '0 2px 8px rgba(0, 131, 143, 0.08)'
              : '0 2px 8px rgba(0, 0, 0, 0.25)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(19, 47, 76, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: 'none',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              backgroundColor: mode === 'light' ? '#00838F' : '#00BCD4',
            },
            '& .MuiSwitch-track': {
              backgroundColor: mode === 'light' ? '#4FB3BF' : '#006064',
              opacity: 0.4,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'light'
              ? '1px solid rgba(0, 131, 143, 0.1)'
              : '1px solid rgba(248, 250, 251, 0.05)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 8px 24px rgba(0, 131, 143, 0.15)'
              : '0 8px 24px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
  }), [mode]);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'file-management':
        return <FileManagement onNavigateBack={() => setCurrentView('home')} />;
      case 'users':
        return <UserManagement onNavigateBack={() => setCurrentView('home')} />;
      case 'system-dashboard':
        return <SystemDashboard onNavigateBack={(path) => {
          if (path === 'home') {
            setCurrentView('home');
          } else {
            setCurrentView(path);
          }
        }} />;
      case 'file-storage':
        return <FileStoragePage onNavigateBack={() => setCurrentView('system-dashboard')} />;
      case 'metadata-management':
        return <MetadataManagementPage onNavigateBack={() => setCurrentView('system-dashboard')} />;
      case 'distributed-storage':
        return <DistributedStoragePage onNavigateBack={() => setCurrentView('system-dashboard')} />;
      case 'user-authentication':
        return <UserAuthenticationPage onNavigateBack={() => setCurrentView('system-dashboard')} />;
      default:
        return <Home user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            bgcolor: mode === 'light' ? 'primary.main' : 'background.paper',
          }}
        >
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <StorageIcon sx={{ color: 'white' }} />
              <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                StellarFS
              </Typography>
              <Button
                variant="outlined"
                startIcon={<InfoIcon />}
                onClick={() => setAboutUsOpen(true)}
                sx={{ 
                  ml: 2,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                About Us
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControlLabel
                control={
                  <MaterialUISwitch 
                    checked={mode === 'dark'}
                    onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                  />
                }
                label=""
              />
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DashboardIcon />}
                    onClick={() => setCurrentView('system-dashboard')}
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    System Dashboard
                  </Button>
                  <Avatar src={user.picture} alt={user.name} />
                  <Button 
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleLogin}
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Sign in with Google
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {user ? renderView() : <Home />}
      </Box>

      <AboutUsDialog open={aboutUsOpen} onClose={() => setAboutUsOpen(false)} />
    </ThemeProvider>
  );
}

export default App;
