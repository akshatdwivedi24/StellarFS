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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  FileCopy as FileCopyIcon,
  Label as LabelIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const MetadataManagementPage = ({ onNavigateBack }) => {
  const theme = useTheme();
  const [metadata, setMetadata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Simulate fetching metadata
    setTimeout(() => {
      setMetadata([
        { id: 1, filename: 'project_documentation.pdf', type: 'PDF', size: '2.4 MB', created: '2023-06-15', modified: '2023-06-20', owner: 'admin', tags: ['documentation', 'project'], version: '1.2' },
        { id: 2, filename: 'user_manual.docx', type: 'DOCX', size: '1.8 MB', created: '2023-06-10', modified: '2023-06-18', owner: 'editor', tags: ['manual', 'user'], version: '2.0' },
        { id: 3, filename: 'database_schema.sql', type: 'SQL', size: '0.5 MB', created: '2023-06-05', modified: '2023-06-15', owner: 'developer', tags: ['database', 'schema'], version: '1.0' },
        { id: 4, filename: 'api_specification.yaml', type: 'YAML', size: '0.3 MB', created: '2023-06-01', modified: '2023-06-12', owner: 'developer', tags: ['api', 'specification'], version: '1.5' },
        { id: 5, filename: 'presentation.pptx', type: 'PPTX', size: '5.2 MB', created: '2023-05-28', modified: '2023-06-10', owner: 'presenter', tags: ['presentation', 'slides'], version: '3.0' },
        { id: 6, filename: 'budget_spreadsheet.xlsx', type: 'XLSX', size: '1.1 MB', created: '2023-05-25', modified: '2023-06-08', owner: 'finance', tags: ['budget', 'finance'], version: '2.1' },
        { id: 7, filename: 'logo_design.psd', type: 'PSD', size: '8.7 MB', created: '2023-05-20', modified: '2023-06-05', owner: 'designer', tags: ['design', 'logo'], version: '1.0' },
        { id: 8, filename: 'configuration.json', type: 'JSON', size: '0.2 MB', created: '2023-05-15', modified: '2023-06-01', owner: 'developer', tags: ['config', 'settings'], version: '1.3' },
        { id: 9, filename: 'readme.md', type: 'MD', size: '0.1 MB', created: '2023-05-10', modified: '2023-05-30', owner: 'developer', tags: ['documentation', 'readme'], version: '1.0' },
        { id: 10, filename: 'backup_script.sh', type: 'SH', size: '0.4 MB', created: '2023-05-05', modified: '2023-05-25', owner: 'admin', tags: ['script', 'backup'], version: '2.0' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const filteredMetadata = metadata.filter(item => 
    item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              Metadata Management
            </Typography>
            <Typography variant="subtitle1">
              Track and manage file metadata across the system
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Metadata Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Metadata Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Files
                </Typography>
                <Typography variant="h4">
                  {metadata.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  File Types
                </Typography>
                <Typography variant="h4">
                  {new Set(metadata.map(item => item.type)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Size
                </Typography>
                <Typography variant="h4">
                  20.7 MB
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Unique Tags
                </Typography>
                <Typography variant="h4">
                  {new Set(metadata.flatMap(item => item.tags)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Metadata Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">File Metadata</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search metadata..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button startIcon={<FilterListIcon />} variant="outlined" size="small">
              Filter
            </Button>
            <Button startIcon={<SortIcon />} variant="outlined" size="small">
              Sort
            </Button>
            <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
              Export
            </Button>
          </Box>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Filename</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Modified</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMetadata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.filename}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>{item.modified}</TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {item.tags.map((tag, index) => (
                          <Chip key={index} label={tag} size="small" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>{item.version}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, item)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMetadata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Metadata</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <LabelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Tags</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View History</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default MetadataManagementPage; 