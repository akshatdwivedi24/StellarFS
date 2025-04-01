import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  LinearProgress,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';

function ConfigurationPanel({ onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [systemConfig, setSystemConfig] = useState(null);
  const [autoScalingConfig, setAutoScalingConfig] = useState(null);
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(false);

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const [configResponse, autoScalingResponse] = await Promise.all([
        fetch('http://localhost:8080/api/system/configuration'),
        fetch('http://localhost:8080/api/system/autoscaling/config')
      ]);
      
      const configData = await configResponse.json();
      const autoScalingData = await autoScalingResponse.json();
      
      setSystemConfig(configData);
      setAutoScalingConfig(autoScalingData);
    } catch (error) {
      onError('Error fetching configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleSystemConfigChange = (key, value) => {
    setSystemConfig({
      ...systemConfig,
      [key]: value
    });
  };

  const handleAutoScalingConfigChange = (key, value) => {
    setAutoScalingConfig({
      ...autoScalingConfig,
      [key]: value
    });
  };

  const handleSaveSystemConfig = async () => {
    try {
      setLoading(true);
      await fetch('http://localhost:8080/api/system/configuration', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(systemConfig)
      });
      onSuccess('System configuration updated successfully');
    } catch (error) {
      onError('Error updating system configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutoScalingConfig = async () => {
    try {
      setLoading(true);
      await fetch('http://localhost:8080/api/system/autoscaling/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoScalingConfig)
      });
      onSuccess('Auto-scaling configuration updated successfully');
    } catch (error) {
      onError('Error updating auto-scaling configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAutoScaling = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080/api/system/autoscaling/${autoScalingEnabled ? 'disable' : 'enable'}`, {
        method: 'POST'
      });
      setAutoScalingEnabled(!autoScalingEnabled);
      onSuccess(`Auto-scaling ${autoScalingEnabled ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      onError('Error toggling auto-scaling');
    } finally {
      setLoading(false);
    }
  };

  const handleResetConfig = async () => {
    if (window.confirm('Are you sure you want to reset all configurations to default values?')) {
      try {
        setLoading(true);
        await fetch('http://localhost:8080/api/system/configuration/reset', {
          method: 'POST'
        });
        onSuccess('Configurations reset to defaults');
        fetchConfigurations();
      } catch (error) {
        onError('Error resetting configurations');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!systemConfig || !autoScalingConfig) return null;

  return (
    <Box>
      {loading && <LinearProgress sx={{ mb: 3 }} />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Configuration
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={3}>
              <TextField
                label="Max Storage Per Node (GB)"
                type="number"
                value={systemConfig.maxStoragePerNode}
                onChange={(e) => handleSystemConfigChange('maxStoragePerNode', parseFloat(e.target.value))}
                fullWidth
              />
              
              <TextField
                label="Replication Factor"
                type="number"
                value={systemConfig.replicationFactor}
                onChange={(e) => handleSystemConfigChange('replicationFactor', parseInt(e.target.value))}
                fullWidth
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={systemConfig.compressionEnabled}
                    onChange={(e) => handleSystemConfigChange('compressionEnabled', e.target.checked)}
                  />
                }
                label="Enable Compression"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={systemConfig.deduplicationEnabled}
                    onChange={(e) => handleSystemConfigChange('deduplicationEnabled', e.target.checked)}
                  />
                }
                label="Enable Deduplication"
              />

              <TextField
                label="Backup Schedule"
                select
                value={systemConfig.backupSchedule}
                onChange={(e) => handleSystemConfigChange('backupSchedule', e.target.value)}
                fullWidth
                SelectProps={{
                  native: true
                }}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </TextField>

              <TextField
                label="Retention Period (days)"
                type="number"
                value={systemConfig.retentionPeriod}
                onChange={(e) => handleSystemConfigChange('retentionPeriod', parseInt(e.target.value))}
                fullWidth
              />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSystemConfig}
                disabled={loading}
              >
                Save System Configuration
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Auto-Scaling Configuration
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoScalingEnabled}
                    onChange={handleToggleAutoScaling}
                    disabled={loading}
                  />
                }
                label="Enable Auto-Scaling"
              />

              <TextField
                label="Minimum Nodes"
                type="number"
                value={autoScalingConfig.minNodes}
                onChange={(e) => handleAutoScalingConfigChange('minNodes', parseInt(e.target.value))}
                fullWidth
              />

              <TextField
                label="Maximum Nodes"
                type="number"
                value={autoScalingConfig.maxNodes}
                onChange={(e) => handleAutoScalingConfigChange('maxNodes', parseInt(e.target.value))}
                fullWidth
              />

              <TextField
                label="CPU Threshold (%)"
                type="number"
                value={autoScalingConfig.cpuThreshold}
                onChange={(e) => handleAutoScalingConfigChange('cpuThreshold', parseFloat(e.target.value))}
                fullWidth
              />

              <TextField
                label="Memory Threshold (%)"
                type="number"
                value={autoScalingConfig.memoryThreshold}
                onChange={(e) => handleAutoScalingConfigChange('memoryThreshold', parseFloat(e.target.value))}
                fullWidth
              />

              <TextField
                label="Storage Threshold (%)"
                type="number"
                value={autoScalingConfig.storageThreshold}
                onChange={(e) => handleAutoScalingConfigChange('storageThreshold', parseFloat(e.target.value))}
                fullWidth
              />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveAutoScalingConfig}
                disabled={loading}
              >
                Save Auto-Scaling Configuration
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchConfigurations}
          disabled={loading}
        >
          Refresh
        </Button>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<ResetIcon />}
          onClick={handleResetConfig}
          disabled={loading}
        >
          Reset to Defaults
        </Button>
      </Box>
    </Box>
  );
}

export default ConfigurationPanel; 