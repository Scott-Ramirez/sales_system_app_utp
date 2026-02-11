'use client';

import { ReactNode } from 'react';
import { Box, Typography, Card, Chip } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    icon: ReactNode;
    text: string;
    color: string;
    bgColor: string;
  };
  isAlert?: boolean;
  alertColor?: string;
  status?: {
    text: string;
    color: string;
    showIndicator?: boolean;
  };
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  isAlert,
  alertColor,
  status
}: StatsCardProps) {
  return (
    <Card 
      sx={{ 
        p: 3, 
        height: 144, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        borderRadius: 3, 
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        borderLeft: isAlert ? 4 : undefined,
        borderLeftColor: alertColor || 'transparent',
      }}
    >
      <Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 500, 
            mb: 0.5, 
            fontSize: '0.75rem' 
          }}
        >
          {title}
        </Typography>
        
        {status ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            {status.showIndicator && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: status.color,
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }}
              />
            )}
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                fontSize: '1.5rem',
                color: isAlert ? alertColor : 'text.primary'
              }}
            >
              {value}
            </Typography>
          </Box>
        ) : (
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1.5rem',
              color: isAlert ? alertColor : 'text.primary'
            }}
          >
            {value}
          </Typography>
        )}
      </Box>

      {trend && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5, 
            bgcolor: trend.bgColor,
            color: trend.color,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            alignSelf: 'flex-start'
          }}
        >
          {trend.icon}
          <Typography variant="caption" sx={{ 
            color: trend.color,
            fontWeight: 600,
            fontSize: '0.6875rem'
          }}>
            {trend.text}
          </Typography>
        </Box>
      )}

      {icon && !trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {icon}
        </Box>
      )}

      {subtitle && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 500, 
            fontSize: '0.6875rem' 
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Card>
  );
}