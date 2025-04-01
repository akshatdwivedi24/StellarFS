import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Folder as FolderIcon,
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  History as HistoryIcon,
  MoreVert as MoreVertIcon,
  FileCopy as FileCopyIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as TextIcon,
  Code as CodeIcon,
  Movie as VideoIcon,
  MusicNote as AudioIcon,
  Archive as ZipIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const FileManagement = ({ onNavigateBack }) => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  
  // State management
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileVersions, setFileVersions] = useState([]);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Fetch files from server
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // In a real app, this would fetch from the backend
        // const response = await fetch('/api/files');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockFiles = [
          {
            id: '1',
            name: 'project_report.pdf',
            type: 'pdf',
            size: 2458000,
            lastModified: '2023-04-15T10:30:00',
            owner: 'Akshat Dwivedi',
            permissions: ['read', 'write', 'delete'],
            path: '/documents/reports/',
            version: 3
          },
          {
            id: '2',
            name: 'profile_picture.jpg',
            type: 'image',
            size: 1240000,
            lastModified: '2023-04-10T14:20:00',
            owner: 'Akshat Dwivedi',
            permissions: ['read', 'write'],
            path: '/images/',
            version: 2
          },
          {
            id: '3',
            name: 'database_backup.sql',
            type: 'code',
            size: 8546000,
            lastModified: '2023-04-05T09:15:00',
            owner: 'System',
            permissions: ['read'],
            path: '/backups/',
            version: 5
          },
          {
            id: '4',
            name: 'presentation.pptx',
            type: 'document',
            size: 5230000,
            lastModified: '2023-04-12T11:45:00',
            owner: 'Akshat Dwivedi',
            permissions: ['read', 'write', 'delete', 'share'],
            path: '/documents/presentations/',
            version: 7
          },
          {
            id: '5',
            name: 'source_code.zip',
            type: 'archive',
            size: 12458000,
            lastModified: '2023-04-08T16:30:00',
            owner: 'Dev Team',
            permissions: ['read', 'write'],
            path: '/development/',
            version: 10
          },
          {
            id: '6',
            name: 'user_data.csv',
            type: 'document',
            size: 3240000,
            lastModified: '2023-04-14T13:20:00',
            owner: 'Akshat Dwivedi',
            permissions: ['read', 'write', 'delete'],
            path: '/data/exports/',
            version: 4
          },
          {
            id: '7',
            name: 'system_logs.txt',
            type: 'text',
            size: 958000,
            lastModified: '2023-04-15T09:10:00',
            owner: 'System',
            permissions: ['read'],
            path: '/logs/',
            version: 1
          },
          {
            id: '8',
            name: 'promotional_video.mp4',
            type: 'video',
            size: 28540000,
            lastModified: '2023-04-01T15:45:00',
            owner: 'Marketing Team',
            permissions: ['read', 'share'],
            path: '/media/videos/',
            version: 2
          }
        ];
        
        setFiles(mockFiles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load files. Please try again later.');
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // File icon mapping based on type
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PdfIcon sx={{ color: '#F40F02' }} />;
      case 'image':
        return <ImageIcon sx={{ color: '#08C7FB' }} />;
      case 'document':
        return <FileCopyIcon sx={{ color: '#0078D4' }} />;
      case 'text':
        return <TextIcon sx={{ color: '#767676' }} />;
      case 'code':
        return <CodeIcon sx={{ color: '#6E7681' }} />;
      case 'video':
        return <VideoIcon sx={{ color: '#FF6D01' }} />;
      case 'audio':
        return <AudioIcon sx={{ color: '#7358FF' }} />;
      case 'archive':
        return <ZipIcon sx={{ color: '#FFB300' }} />;
      default:
        return <FileCopyIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle file menu open
  const handleMenuOpen = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  // Handle file menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    setOpenUploadDialog(true);
  };

  // Handle file input change
  const handleFileInputChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  // Handle upload dialog close
  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false);
    setSelectedFiles([]);
    setUploadProgress(0);
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add new files to the list
          const newFiles = selectedFiles.map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            name: file.name,
            type: getFileTypeFromName(file.name),
            size: file.size,
            lastModified: new Date().toISOString(),
            owner: 'Akshat Dwivedi',
            permissions: ['read', 'write', 'delete'],
            path: '/uploads/',
            version: 1
          }));
          
          setFiles(prevFiles => [...newFiles, ...prevFiles]);
          handleUploadDialogClose();
          return 0;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  // Get file type from name
  const getFileTypeFromName = (name) => {
    const extension = name.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(extension)) return 'image';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv'].includes(extension)) return 'document';
    if (['txt', 'log', 'md'].includes(extension)) return 'text';
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'java', 'py', 'c', 'cpp', 'sql', 'json'].includes(extension)) return 'code';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) return 'audio';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) return 'archive';
    
    return 'document';
  };

  // Handle file download
  const handleDownload = () => {
    // In a real app, this would initiate a file download
    console.log('Downloading file:', selectedFile);
    handleMenuClose();
  };

  // Handle file delete
  const handleDelete = () => {
    // Filter out the deleted file
    setFiles(prevFiles => prevFiles.filter(file => file.id !== selectedFile.id));
    handleMenuClose();
  };

  // Handle view file versions
  const handleViewVersions = () => {
    // In a real app, this would fetch file versions from the server
    const mockVersions = [
      {
        version: selectedFile.version,
        date: new Date().toISOString(),
        size: selectedFile.size,
        changedBy: 'Akshat Dwivedi',
        isCurrent: true
      },
      {
        version: selectedFile.version - 1,
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        size: selectedFile.size * 0.95,
        changedBy: 'Akshat Dwivedi',
        isCurrent: false
      },
      {
        version: selectedFile.version - 2,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        size: selectedFile.size * 0.9,
        changedBy: 'Team Member',
        isCurrent: false
      }
    ].filter(version => version.version > 0);
    
    setFileVersions(mockVersions);
    setVersionDialogOpen(true);
    handleMenuClose();
  };

  // Handle filter by type
  const handleFilterType = (type) => {
    setFilterType(type);
  };

  // Filter files based on search term and type
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.path.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || file.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Render files based on current tab
  const renderFilesByTab = () => {
    switch (tabValue) {
      case 0: // All files
        return filteredFiles;
      case 1: // Recent files
        return filteredFiles
          .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
          .slice(0, 5);
      case 2: // My files
        return filteredFiles.filter(file => file.owner === 'Akshat Dwivedi');
      default:
        return filteredFiles;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
              File Management
            </Typography>
            <Typography variant="subtitle1">
              Upload, download, and manage your files across the distributed system
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* File Management Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            margin: 0,
          }}
        >
          {/* Search */}
          <Grid item xs={3} sx={{ pl: '8px !important' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search files..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  height: '56px'
                }
              }}
            />
          </Grid>

          {/* Upload Button */}
          <Grid item xs={3} sx={{ pl: '16px !important' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={() => setOpenUploadDialog(true)}
              sx={{
                height: '56px',
                backgroundColor: 'primary.main',
              }}
            >
              Upload Files
            </Button>
          </Grid>

          {/* New Folder Button */}
          <Grid item xs={3} sx={{ pl: '16px !important' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FolderIcon />}
              onClick={() => {/* Handle new folder */}}
              sx={{
                height: '56px',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.lighter',
                },
              }}
            >
              New Folder
            </Button>
          </Grid>

          {/* Sort Button */}
          <Grid item xs={3} sx={{ pl: '16px !important' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                height: '56px',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.lighter',
                },
              }}
            >
              Sort By
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* File Type Filters */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip 
          icon={<FileCopyIcon />} 
          label="All Files" 
          onClick={() => handleFilterType('all')}
          color={filterType === 'all' ? 'primary' : 'default'}
        />
        <Chip 
          icon={<ImageIcon />} 
          label="Images" 
          onClick={() => handleFilterType('image')}
          color={filterType === 'image' ? 'primary' : 'default'}
        />
        <Chip 
          icon={<PdfIcon />} 
          label="PDFs" 
          onClick={() => handleFilterType('pdf')}
          color={filterType === 'pdf' ? 'primary' : 'default'}
        />
        <Chip 
          icon={<FileCopyIcon />} 
          label="Documents" 
          onClick={() => handleFilterType('document')}
          color={filterType === 'document' ? 'primary' : 'default'}
        />
        <Chip 
          icon={<CodeIcon />} 
          label="Code" 
          onClick={() => handleFilterType('code')}
          color={filterType === 'code' ? 'primary' : 'default'}
        />
        <Chip 
          icon={<ZipIcon />} 
          label="Archives" 
          onClick={() => handleFilterType('archive')}
          color={filterType === 'archive' ? 'primary' : 'default'}
        />
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Files" />
          <Tab label="Recent Files" />
          <Tab label="My Files" />
        </Tabs>
      </Paper>

      {/* Files Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell width="40%">Name</TableCell>
              <TableCell width="15%">Size</TableCell>
              <TableCell width="25%">Last Modified</TableCell>
              <TableCell width="15%">Owner</TableCell>
              <TableCell width="5%">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderFilesByTab().map((file) => (
              <TableRow key={file.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getFileIcon(file.type)}
                    <Typography sx={{ ml: 2 }}>{file.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>{formatDate(file.lastModified)}</TableCell>
                <TableCell>{file.owner}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, file)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {renderFilesByTab().length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No files found. Try adjusting your search or filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* File Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDownload} disabled={!selectedFile}>
          <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={!selectedFile || (selectedFile && !selectedFile.permissions.includes('delete'))}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleViewVersions} disabled={!selectedFile || selectedFile.version <= 1}>
          <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
          Version History
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={handleUploadDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Select files to upload to the distributed storage system.
          </DialogContentText>
          
          <Box sx={{ mb: 2 }}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => fileInputRef.current.click()}
              fullWidth
            >
              Select Files
            </Button>
          </Box>

          {selectedFiles.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                Selected Files ({selectedFiles.length}):
              </Typography>
              <Box sx={{ maxHeight: 150, overflow: 'auto', mb: 2 }}>
                {selectedFiles.map((file, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getFileIcon(getFileTypeFromName(file.name))}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {file.name} ({formatFileSize(file.size)})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {uploading && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Uploading... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>Cancel</Button>
          <Button
            onClick={handleUpload}
            color="primary"
            disabled={selectedFiles.length === 0 || uploading}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* File Version History Dialog */}
      <Dialog open={versionDialogOpen} onClose={() => setVersionDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Version History: {selectedFile?.name}
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>Modified Date</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Changed By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fileVersions.map((version) => (
                  <TableRow key={version.version}>
                    <TableCell>
                      Version {version.version}
                      {version.isCurrent && (
                        <Chip
                          label="Current"
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{formatDate(version.date)}</TableCell>
                    <TableCell>{formatFileSize(version.size)}</TableCell>
                    <TableCell>{version.changedBy}</TableCell>
                    <TableCell>
                      <Tooltip title="Download this version">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!version.isCurrent && (
                        <Tooltip title="Restore this version">
                          <IconButton size="small">
                            <HistoryIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVersionDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FileManagement; 