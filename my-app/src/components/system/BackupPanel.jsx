import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Paper
} from '@mui/material';
import {
  Backup as BackupIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

function BackupPanel({ onSuccess, onError }) {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', backup: null });

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/system/backup');
      const data = await response.json();
      setBackups(data);
    } catch (error) {
      onError('Error fetching backups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/system/backup', {
        method: 'POST'
      });
      const backupId = await response.text();
      onSuccess('Backup created successfully');
      fetchBackups();
    } catch (error) {
      onError('Error creating backup');
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080/api/system/backup/${backupId}/restore`, {
        method: 'POST'
      });
      onSuccess('System restored from backup successfully');
      setConfirmDialog({ open: false, type: '', backup: null });
    } catch (error) {
      onError('Error restoring from backup');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBackup = async (backupId) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080/api/system/backup/${backupId}`, {
        method: 'DELETE'
      });
      onSuccess('Backup deleted successfully');
      fetchBackups();
      setConfirmDialog({ open: false, type: '', backup: null });
    } catch (error) {
      onError('Error deleting backup');
    } finally {
      setLoading(false);
    }
  };

  const formatBackupDate = (backupId) => {
    try {
      const parts = backupId.split('_');
      const dateStr = parts[1];
      const timeStr = parts[2];
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const hour = timeStr.substring(0, 2);
      const minute = timeStr.substring(2, 4);
      return `${year}-${month}-${day} ${hour}:${minute}`;
    } catch (e) {
      return backupId;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          startIcon={<BackupIcon />}
          onClick={handleCreateBackup}
          disabled={loading}
        >
          Create New Backup
        </Button>
        <IconButton onClick={fetchBackups} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Paper>
        {loading && <LinearProgress />}
        <List>
          {backups.map((backup) => (
            <ListItem key={backup} divider>
              <ListItemText
                primary={formatBackupDate(backup)}
                secondary={`Backup ID: ${backup}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => setConfirmDialog({ open: true, type: 'restore', backup })}
                  sx={{ mr: 1 }}
                >
                  <RestoreIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => setConfirmDialog({ open: true, type: 'delete', backup })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: '', backup: null })}
      >
        <DialogTitle>
          {confirmDialog.type === 'restore' ? 'Restore System' : 'Delete Backup'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmDialog.type === 'restore'
              ? 'Are you sure you want to restore the system from this backup? This action cannot be undone.'
              : 'Are you sure you want to delete this backup? This action cannot be undone.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, type: '', backup: null })}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (confirmDialog.type === 'restore') {
                handleRestoreBackup(confirmDialog.backup);
              } else {
                handleDeleteBackup(confirmDialog.backup);
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BackupPanel; 