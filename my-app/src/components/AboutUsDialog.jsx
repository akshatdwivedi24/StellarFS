import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Stack,
  Link,
} from '@mui/material';
import {
  Close as CloseIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Akshat Dwivedi',
    bio: 'Full-stack developer with expertise in distributed systems and cloud computing. Passionate about building scalable and efficient software solutions.',
    socials: {
      instagram: 'https://www.instagram.com/aksh.at_24?utm_source=qr&igsh=ZmZzajVlYndkbnkz',
      linkedin: 'https://www.linkedin.com/in/akshat-dwivedi1/',
      github: 'https://github.com/akshatdwivedi24',
      email: 'mailto:akshatdwivedi2000@gmail.com'
    }
  },
  {
    name: 'Swastik Jangir',
    bio: 'Software engineer specializing in system architecture and backend development. Enthusiastic about creating robust and maintainable code.',
    socials: {
      linkedin: 'https://linkedin.com/in/swastik-jangir',
      github: 'https://github.com/swastikjangir',
      email: 'mailto:swastik.jangir@example.com'
    }
  },
  {
    name: 'Suyog Magar',
    bio: 'Frontend developer with a keen eye for UI/UX design. Dedicated to creating intuitive and responsive user interfaces.',
    socials: {
      linkedin: 'https://linkedin.com/in/suyog-magar',
      github: 'https://github.com/suyogmagar',
      email: 'mailto:suyog.magar@example.com'
    }
  }
];

const AboutUsDialog = ({ open, onClose }) => {
  const [expandedMember, setExpandedMember] = useState(null);

  const handleExpandClick = (memberName) => {
    setExpandedMember(expandedMember === memberName ? null : memberName);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            About Us
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Meet the talented team behind StellarFS
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member) => (
            <Grid item xs={12} key={member.name}>
              <Card 
                sx={{ 
                  bgcolor: 'background.paper',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: (theme) => `0 12px 28px 0 ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 131, 143, 0.2)'}`,
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                    '&::after': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #00838F, #00BCD4, #00838F)',
                    backgroundSize: '200% 100%',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    animation: 'gradient 2s linear infinite',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 131, 143, 0.05) 100%)',
                    opacity: 0,
                    transform: 'translateY(10px)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    pointerEvents: 'none',
                  },
                  '@keyframes gradient': {
                    '0%': {
                      backgroundPosition: '0% 50%',
                    },
                    '50%': {
                      backgroundPosition: '100% 50%',
                    },
                    '100%': {
                      backgroundPosition: '0% 50%',
                    },
                  },
                }}
              >
                <CardContent>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    onClick={() => handleExpandClick(member.name)}
                    sx={{ 
                      cursor: 'pointer',
                      p: 1.5,
                      borderRadius: 2,
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: 'rgba(0, 131, 143, 0.08)',
                        transform: 'scale(1.02)',
                        '& .member-name': {
                          transform: 'translateX(12px)',
                          '& .gradient-text': {
                            opacity: 1,
                            transform: 'translateY(0)',
                          }
                        },
                        '& .expand-icon': {
                          transform: expandedMember === member.name 
                            ? 'rotate(180deg) scale(1.2)'
                            : 'rotate(0deg) scale(1.2)',
                          color: '#00838F',
                        },
                      },
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      className="member-name"
                      sx={{ 
                        fontWeight: 600,
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: -8,
                          width: '4px',
                          height: '0%',
                          bgcolor: '#00838F',
                          transition: 'height 0.3s ease, transform 0.3s ease',
                          transform: 'translateY(-50%)',
                        },
                        '&:hover::before': {
                          height: '80%',
                        },
                      }}
                    >
                      <Box
                        className="gradient-text"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(90deg, #00838F, #00BCD4)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          opacity: 0,
                          transform: 'translateY(10px)',
                          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        {member.name}
                      </Box>
                      {member.name}
                    </Typography>
                    <IconButton 
                      size="small"
                      className="expand-icon"
                      sx={{ 
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: expandedMember === member.name ? 'rotate(180deg)' : 'rotate(0deg)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 131, 143, 0.12)',
                        },
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                  <Collapse 
                    in={expandedMember === member.name}
                    timeout={400}
                    sx={{
                      '& .MuiCollapse-wrapper': {
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }
                    }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {member.bio}
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                        {member.socials.instagram && (
                          <Button
                            variant="contained"
                            startIcon={<InstagramIcon />}
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener"
                            sx={{
                              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                              color: 'white',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #e08423 0%, #d55b2f 25%, #cc1733 50%, #bb1255 75%, #ab1677 100%)',
                              },
                              textTransform: 'none',
                              fontWeight: 500,
                            }}
                          >
                            Follow on Instagram
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          startIcon={<LinkedInIcon />}
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            bgcolor: '#0A66C2',
                            color: 'white',
                            '&:hover': {
                              bgcolor: '#004182',
                            },
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          Connect on LinkedIn
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<GitHubIcon />}
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            bgcolor: '#171515',
                            color: 'white',
                            '&:hover': {
                              bgcolor: '#2EA44F',
                            },
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          View GitHub Profile
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<EmailIcon />}
                          href={member.socials.email}
                          sx={{
                            bgcolor: '#EA4335',
                            color: 'white',
                            '&:hover': {
                              bgcolor: '#B31412',
                            },
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          Send Email
                        </Button>
                      </Stack>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsDialog; 