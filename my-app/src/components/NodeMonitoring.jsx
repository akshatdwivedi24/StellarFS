import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tooltip,
  Divider,
  Container
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  RestartAlt as RestartAltIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import MetricsChart from './MetricsChart';

// Styled components
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh'
}));

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)'
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'online' ? theme.palette.success.light :
                  status === 'warning' ? theme.palette.warning.light :
                  status === 'critical' ? theme.palette.error.light :
                  theme.palette.grey.light,
  color: status === 'online' ? theme.palette.success.dark :
         status === 'warning' ? theme.palette.warning.dark :
         status === 'critical' ? theme.palette.error.dark :
         theme.palette.grey.dark,
  fontWeight: 500
}));

const NodeMonitoring = ({ onNavigateBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDetailOpen, setNodeDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNodes();
    fetchSystemMetrics();
  }, []);

  const fetchNodes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/nodes');
      setNodes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch nodes. Please try again later.');
      console.error('Error fetching nodes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/nodes/metrics/summary');
      setSystemMetrics(response.data);
    } catch (err) {
      console.error('Error fetching system metrics:', err);
    }
  };

  const handleNodeAction = async (nodeId, action) => {
    try {
      await axios.post(`http://localhost:8080/api/nodes/${nodeId}/${action}`);
      fetchNodes();
    } catch (err) {
      console.error(`Error performing ${action} on node:`, err);
    }
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setNodeDetailOpen(true);
  };

  const filteredNodes = nodes.filter(node => {
    const matchesType = filterType === 'all' || node.nodeType === filterType;
    const matchesLocation = filterLocation === 'all' || node.location === filterLocation;
    const matchesStatus = filterStatus === 'all' || node.status === filterStatus;
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         node.ipAddress.includes(searchQuery);
    return matchesType && matchesLocation && matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'critical':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  if (loading) {
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
                  Node Monitoring & Performance
                </Typography>
                <Typography variant="subtitle1">
                  Monitor and manage system nodes, track performance metrics, and ensure optimal operation
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchNodes}
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

        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
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
                Node Monitoring & Performance
              </Typography>
              <Typography variant="subtitle1">
                Monitor and manage system nodes, track performance metrics, and ensure optimal operation
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchNodes}
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* System Metrics Summary */}
      {systemMetrics && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={3}>
            <MetricCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <MemoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">CPU Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {systemMetrics.cpuUsage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemMetrics.cpuUsage}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </MetricCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <StorageIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Memory Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {systemMetrics.memoryUsage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemMetrics.memoryUsage}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </MetricCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <StorageIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Disk Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {systemMetrics.diskUsage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemMetrics.diskUsage}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </MetricCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <SpeedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Network Throughput</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {systemMetrics.networkThroughput} MB/s
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {systemMetrics.activeConnections} active connections
                </Typography>
              </CardContent>
            </MetricCard>
          </Grid>
        </Grid>
      )}

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Node Type</InputLabel>
              <Select
                value={filterType}
                label="Node Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="storage">Storage</MenuItem>
                <MenuItem value="compute">Compute</MenuItem>
                <MenuItem value="gateway">Gateway</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={filterLocation}
                label="Location"
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="US-East">US East</MenuItem>
                <MenuItem value="US-West">US West</MenuItem>
                <MenuItem value="EU">EU</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search Nodes"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Nodes Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>CPU Usage</TableCell>
              <TableCell>Memory Usage</TableCell>
              <TableCell>Disk Usage</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Uptime</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNodes.map((node) => (
              <TableRow key={node.id}>
                <TableCell>
                  <StatusChip
                    icon={getStatusIcon(node.status)}
                    label={node.status}
                    status={node.status}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleNodeSelect(node)}
                  >
                    {node.name}
                  </Button>
                </TableCell>
                <TableCell>{node.nodeType}</TableCell>
                <TableCell>{node.location}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {node.cpuUsage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={node.cpuUsage}
                      sx={{ width: 100 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {node.memoryUsage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={node.memoryUsage}
                      sx={{ width: 100 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {node.diskUsage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={node.diskUsage}
                      sx={{ width: 100 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {node.networkThroughput} MB/s
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {node.activeConnections} connections
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {Math.floor(node.uptime / 60)}h {node.uptime % 60}m
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Tooltip title="Restart Node">
                      <IconButton
                        color="primary"
                        onClick={() => handleNodeAction(node.id, 'restart')}
                      >
                        <RestartAltIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={node.status === 'paused' ? 'Resume Node' : 'Pause Node'}>
                      <IconButton
                        color="primary"
                        onClick={() => handleNodeAction(node.id, node.status === 'paused' ? 'resume' : 'pause')}
                      >
                        {node.status === 'paused' ? <PlayArrowIcon /> : <PauseIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Node Detail Dialog */}
      <Dialog
        open={nodeDetailOpen}
        onClose={() => setNodeDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Node Details: {selectedNode?.name}
        </DialogTitle>
        <DialogContent>
          {selectedNode && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Basic Information</Typography>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>ID:</TableCell>
                        <TableCell>{selectedNode.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>IP Address:</TableCell>
                        <TableCell>{selectedNode.ipAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Type:</TableCell>
                        <TableCell>{selectedNode.nodeType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Location:</TableCell>
                        <TableCell>{selectedNode.location}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status:</TableCell>
                        <TableCell>
                          <StatusChip
                            icon={getStatusIcon(selectedNode.status)}
                            label={selectedNode.status}
                            status={selectedNode.status}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Uptime:</TableCell>
                        <TableCell>
                          {Math.floor(selectedNode.uptime / 60)}h {selectedNode.uptime % 60}m
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>CPU Usage:</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {selectedNode.cpuUsage}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={selectedNode.cpuUsage}
                              sx={{ width: 100 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Memory Usage:</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {selectedNode.memoryUsage}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={selectedNode.memoryUsage}
                              sx={{ width: 100 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Disk Usage:</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {selectedNode.diskUsage}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={selectedNode.diskUsage}
                              sx={{ width: 100 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Network Throughput:</TableCell>
                        <TableCell>
                          {selectedNode.networkThroughput} MB/s
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Active Connections:</TableCell>
                        <TableCell>
                          {selectedNode.activeConnections}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNodeDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NodeMonitoring; 