import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Button,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Stack
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
  Build as BuildIcon,
  AutoFixHigh as AutoFixHighIcon
} from '@mui/icons-material';
import SystemMetricsPanel from './system/SystemMetricsPanel';
import BackupPanel from './system/BackupPanel';
import MaintenancePanel from './system/MaintenancePanel';
import ConfigurationPanel from './system/ConfigurationPanel';

function SystemOperations({ onNavigateBack }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [health, setHealth] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [metricsResponse, healthResponse] = await Promise.all([
        fetch('http://localhost:8080/api/system/metrics/current'),
        fetch('http://localhost:8080/api/system/health')
      ]);
      
      const metricsData = await metricsResponse.json();
      const healthData = await healthResponse.json();
      
      setMetrics(metricsData);
      setHealth(healthData);
    } catch (error) {
      showSnackbar('Error fetching system data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRefresh = () => {
    fetchInitialData();
  };

  const renderSystemStatus = () => {
    if (!health) return null;

    return (
      <Alert 
        severity={health.status === 'HEALTHY' ? 'success' : 'warning'}
        sx={{ mb: 3 }}
        action={
          <IconButton size="small" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        }
      >
        System Status: {health.status}
      </Alert>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <SystemMetricsPanel metrics={metrics} onRefresh={handleRefresh} />;
      case 1:
        return <BackupPanel onSuccess={(msg) => showSnackbar(msg)} onError={(msg) => showSnackbar(msg, 'error')} />;
      case 2:
        return <MaintenancePanel onSuccess={(msg) => showSnackbar(msg)} onError={(msg) => showSnackbar(msg, 'error')} />;
      case 3:
        return <ConfigurationPanel onSuccess={(msg) => showSnackbar(msg)} onError={(msg) => showSnackbar(msg, 'error')} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
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
                System Operations & Maintenance
              </Typography>
              <Typography variant="subtitle1">
                Monitor system performance, manage backups, and configure system settings
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {renderSystemStatus()}

      {loading ? (
        <LinearProgress sx={{ mb: 3 }} />
      ) : (
        <>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<SpeedIcon />} label="System Metrics" />
              <Tab icon={<BackupIcon />} label="Backup & Recovery" />
              <Tab icon={<BuildIcon />} label="Maintenance" />
              <Tab icon={<SettingsIcon />} label="Configuration" />
            </Tabs>
          </Paper>

          {renderContent()}
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SystemOperations; 