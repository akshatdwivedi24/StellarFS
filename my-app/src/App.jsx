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
  Typography
} from '@mui/material';
import { 
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import Home from './components/Home';

// Styled Switch component
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
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
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
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

    // Check for token in URL
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
        main: mode === 'light' ? '#3674B5' : '#610094',
        light: mode === 'light' ? '#578FCA' : '#3F0071',
        dark: mode === 'light' ? '#3674B5' : '#150050',
      },
      secondary: {
        main: mode === 'light' ? '#A1E3F9' : '#3F0071',
        light: mode === 'light' ? '#D1F8EF' : '#610094',
        dark: mode === 'light' ? '#578FCA' : '#150050',
      },
      background: {
        default: mode === 'light' ? '#D1F8EF' : '#000000',
        paper: mode === 'light' ? '#FFFFFF' : '#150050',
      },
      text: {
        primary: mode === 'light' ? '#3674B5' : '#FFFFFF',
        secondary: mode === 'light' ? '#578FCA' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0 4px 6px rgba(54, 116, 181, 0.2)'
              : '0 4px 6px rgba(21, 0, 80, 0.5)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            height: '100%',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              backgroundColor: mode === 'light' ? '#3674B5' : '#610094',
            },
            '& .MuiSwitch-track': {
              backgroundColor: mode === 'light' ? '#A1E3F9' : '#150050',
            },
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              StellarFS
            </Typography>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  checked={mode === 'dark'}
                  onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                />
              }
              label={mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            />
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{user.name}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLogout}
                  startIcon={
                    <Avatar
                      src={user.picture}
                      sx={{ width: 24, height: 24 }}
                    />
                  }
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          {error && (
            <Box sx={{ 
              p: 2, 
              mb: 2, 
              bgcolor: 'error.main', 
              color: 'error.contrastText',
              borderRadius: 1,
              textAlign: 'center'
            }}>
              {error}
            </Box>
          )}
          <Home user={user} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
