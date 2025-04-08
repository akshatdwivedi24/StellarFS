import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

const MetricsChart = ({ data, title, dataKey, color = '#8884d8', type = 'line' }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatValue = (value) => {
    return `${value}%`;
  };

  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box height={300}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={formatValue}
            domain={[0, 100]}
            interval="preserveStartEnd"
          />
          <Tooltip
            labelFormatter={formatTimestamp}
            formatter={(value) => [formatValue(value), dataKey]}
          />
          <Legend />
          {type === 'line' ? (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={0.3}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MetricsChart; 