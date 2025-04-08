import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Storage as StorageIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocumentIcon,
  Code as CodeIcon,
  Archive as ArchiveIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const FileStoragePage = ({ onNavigateBack }) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching files
    setTimeout(() => {
      setFiles([
        { id: 1, name: 'Project Documentation.pdf', type: 'pdf', size: 2456789, lastModified: '2023-06-15T10:30:00' },
        { id: 2, name: 'Product Roadmap.docx', type: 'document', size: 1234567, lastModified: '2023-06-14T15:45:00' },
        { id: 3, name: 'Team Photo.jpg', type: 'image', size: 3456789, lastModified: '2023-06-13T09:20:00' },
        { id: 4, name: 'Source Code.zip', type: 'archive', size: 4567890, lastModified: '2023-06-12T14:15:00' },
        { id: 5, name: 'Database Schema.sql', type: 'code', size: 567890, lastModified: '2023-06-11T11:30:00' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case 'folder':
        return <FolderIcon sx={{ color: theme.palette.primary.main }} />;
      case 'image':
        return <ImageIcon sx={{ color: theme.palette.info.main }} />;
      case 'pdf':
        return <PdfIcon sx={{ color: theme.palette.error.main }} />;
      case 'document':
        return <DocumentIcon sx={{ color: theme.palette.primary.main }} />;
      case 'code':
        return <CodeIcon sx={{ color: theme.palette.secondary.main }} />;
      case 'archive':
        return <ArchiveIcon sx={{ color: theme.palette.warning.main }} />;
      default:
        return <FileIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              File Storage Service
            </Typography>
            <Typography variant="subtitle1">
              Upload, download, and manage your files securely
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* File Management Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ height: '56px' }}
            >
              Upload Files
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FolderIcon />}
              sx={{ height: '56px' }}
            >
              Create Folder
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ height: '56px' }}
            >
              Download Selected
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* File List */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <List>
          {files.map((file) => (
            <React.Fragment key={file.id}>
              <ListItem
                button
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  {getFileIcon(file.type)}
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`${formatFileSize(file.size)} • Last modified: ${formatDate(file.lastModified)}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="more">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FileStoragePage; 