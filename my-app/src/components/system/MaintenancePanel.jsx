import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Storage as StorageIcon,
  Compress as CompressIcon,
  FindReplace as DeduplicateIcon,
  Build as OptimizeIcon
} from '@mui/icons-material';

function MaintenancePanel({ onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });

  const maintenanceActions = [
    {
      title: 'Optimize Storage',
      description: 'Reorganize data for optimal performance and space utilization',
      icon: <OptimizeIcon fontSize="large" />,
      action: 'optimize',
      endpoint: '/api/system/maintenance/optimize'
    },
    {
      title: 'Data Deduplication',
      description: 'Remove duplicate data to save storage space',
      icon: <DeduplicateIcon fontSize="large" />,
      action: 'deduplicate',
      endpoint: '/api/system/maintenance/deduplicate'
    },
    {
      title: 'Compress Data',
      description: 'Compress stored data to reduce storage usage',
      icon: <CompressIcon fontSize="large" />,
      action: 'compress',
      endpoint: '/api/system/maintenance/compress'
    }
  ];

  const handleMaintenanceAction = async (endpoint) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST'
      });
      onSuccess('Maintenance task completed successfully');
    } catch (error) {
      onError('Error performing maintenance task');
    } finally {
      setLoading(false);
      setConfirmDialog({ open: false, action: null });
    }
  };

  const getActionDescription = (action) => {
    switch (action) {
      case 'optimize':
        return 'This will reorganize data across storage nodes for optimal performance. The process may take several minutes.';
      case 'deduplicate':
        return 'This will scan all stored data for duplicates and remove them. This process may take a while depending on the amount of data.';
      case 'compress':
        return 'This will compress stored data to save space. The process may temporarily affect system performance.';
      default:
        return '';
    }
  };

  return (
    <Box>
      {loading && <LinearProgress sx={{ mb: 3 }} />}

      <Grid container spacing={3}>
        {maintenanceActions.map((action) => (
          <Grid item xs={12} md={4} key={action.action}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {action.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setConfirmDialog({ open: true, action })}
                  disabled={loading}
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null })}
      >
        <DialogTitle>
          Confirm {confirmDialog.action?.title}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {getActionDescription(confirmDialog.action?.action)}
          </Typography>
          <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
            Are you sure you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, action: null })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleMaintenanceAction(confirmDialog.action?.endpoint)}
            color="primary"
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MaintenancePanel; 