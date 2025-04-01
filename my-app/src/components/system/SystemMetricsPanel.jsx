import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  CloudQueue as CloudIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SystemMetricsPanel({ metrics, onRefresh }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/system/metrics/historical?hours=24');
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  };

  const renderMetricCard = (title, value, icon, color, subtitle = '') => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ color }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const getChartData = () => {
    const labels = historicalData.map(d => new Date(d.timestamp).toLocaleTimeString());
    
    return {
      labels,
      datasets: [
        {
          label: 'CPU Usage',
          data: historicalData.map(d => d.systemCpuUsage),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Memory Usage',
          data: historicalData.map(d => d.systemMemoryUsage),
          borderColor: 'rgb(53, 162, 235)',
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Resource Usage Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Usage %'
        }
      }
    }
  };

  if (!metrics) return null;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => {
          onRefresh();
          fetchHistoricalData();
        }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {renderMetricCard(
            'CPU Usage',
            `${metrics.systemCpuUsage.toFixed(1)}%`,
            <SpeedIcon color="primary" />,
            metrics.systemCpuUsage > 80 ? 'error.main' : 'success.main'
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderMetricCard(
            'Memory Usage',
            `${metrics.systemMemoryUsage.toFixed(1)}%`,
            <MemoryIcon color="primary" />,
            metrics.systemMemoryUsage > 85 ? 'error.main' : 'success.main'
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderMetricCard(
            'Storage Usage',
            `${((metrics.usedStorage / metrics.totalStorageCapacity) * 100).toFixed(1)}%`,
            <StorageIcon color="primary" />,
            (metrics.usedStorage / metrics.totalStorageCapacity) > 0.9 ? 'error.main' : 'success.main',
            `${formatBytes(metrics.usedStorage)} / ${formatBytes(metrics.totalStorageCapacity)}`
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderMetricCard(
            'Active Nodes',
            `${metrics.activeNodes}/${metrics.totalNodes}`,
            <CloudIcon color="primary" />,
            metrics.activeNodes === metrics.totalNodes ? 'success.main' : 'warning.main'
          )}
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            {loading ? (
              <LinearProgress />
            ) : (
              <Line data={getChartData()} options={chartOptions} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SystemMetricsPanel; 