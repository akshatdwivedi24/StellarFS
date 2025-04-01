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
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.shadows[4],
                  }
                }}
              >
                <CardContent>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    onClick={() => handleExpandClick(member.name)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
                      {member.name}
                    </Typography>
                    <IconButton size="small">
                      {expandedMember === member.name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedMember === member.name}>
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