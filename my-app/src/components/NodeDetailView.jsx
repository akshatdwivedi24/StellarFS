import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  RestartAlt as RestartAltIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import MetricsChart from './MetricsChart';

const DetailContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh'
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
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

const NodeDetailView = ({ nodeId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [node, setNode] = useState(null);
  const [metricsHistory, setMetricsHistory] = useState({
    cpu: [],
    memory: [],
    disk: [],
    network: []
  });

  useEffect(() => {
    fetchNodeDetails();
    fetchMetricsHistory();
  }, [nodeId]);

  const fetchNodeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/nodes/${nodeId}`);
      setNode(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch node details. Please try again later.');
      console.error('Error fetching node details:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetricsHistory = async () => {
    try {
      const metrics = ['cpu', 'memory', 'disk', 'network'];
      const history = {};
      
      for (const metric of metrics) {
        const response = await axios.get(
          `http://localhost:8080/api/nodes/${nodeId}/metrics/${metric}?hours=24`
        );
        history[metric] = response.data;
      }
      
      setMetricsHistory(history);
    } catch (err) {
      console.error('Error fetching metrics history:', err);
    }
  };

  const handleNodeAction = async (action) => {
    try {
      await axios.post(`http://localhost:8080/api/nodes/${nodeId}/${action}`);
      fetchNodeDetails();
    } catch (err) {
      console.error(`Error performing ${action} on node:`, err);
    }
  };

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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!node) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">Node not found</Typography>
      </Box>
    );
  }

  return (
    <DetailContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Node Details: {node.name}
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={() => handleNodeAction('restart')}
            sx={{ mr: 1 }}
          >
            Restart
          </Button>
          <Button
            variant="contained"
            startIcon={node.status === 'paused' ? <PlayArrowIcon /> : <PauseIcon />}
            onClick={() => handleNodeAction(node.status === 'paused' ? 'resume' : 'pause')}
          >
            {node.status === 'paused' ? 'Resume' : 'Pause'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>ID:</TableCell>
                  <TableCell>{node.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IP Address:</TableCell>
                  <TableCell>{node.ipAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type:</TableCell>
                  <TableCell>{node.nodeType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location:</TableCell>
                  <TableCell>{node.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>
                    <StatusChip
                      icon={getStatusIcon(node.status)}
                      label={node.status}
                      status={node.status}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Uptime:</TableCell>
                  <TableCell>
                    {Math.floor(node.uptime / 60)}h {node.uptime % 60}m
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </MetricCard>
        </Grid>

        {/* Current Performance Metrics */}
        <Grid item xs={12} md={8}>
          <MetricCard>
            <Typography variant="h6" gutterBottom>
              Current Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={2}>
                  <MemoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">CPU Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {node.cpuUsage}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={2}>
                  <StorageIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Memory Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {node.memoryUsage}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={2}>
                  <StorageIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Disk Usage</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {node.diskUsage}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SpeedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Network Throughput</Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {node.networkThroughput} MB/s
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {node.activeConnections} active connections
                </Typography>
              </Grid>
            </Grid>
          </MetricCard>
        </Grid>

        {/* Performance Charts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance History (Last 24 Hours)
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MetricsChart
                  data={metricsHistory.cpu}
                  title="CPU Usage"
                  dataKey="value"
                  color="#8884d8"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MetricsChart
                  data={metricsHistory.memory}
                  title="Memory Usage"
                  dataKey="value"
                  color="#82ca9d"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MetricsChart
                  data={metricsHistory.disk}
                  title="Disk Usage"
                  dataKey="value"
                  color="#ffc658"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MetricsChart
                  data={metricsHistory.network}
                  title="Network Throughput"
                  dataKey="value"
                  color="#ff7300"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Additional Metrics */}
        <Grid item xs={12}>
          <MetricCard>
            <Typography variant="h6" gutterBottom>
              Additional Metrics
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(node.performanceMetrics || {}).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                      <TableCell>{key.includes('rate') ? 'ops/s' : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MetricCard>
        </Grid>
      </Grid>
    </DetailContainer>
  );
};

export default NodeDetailView; 