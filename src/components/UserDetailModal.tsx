import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  Box,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../types/User';

interface UserDetailModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, open, onClose }) => {
  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">User Details</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{user.username}</Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">Contact</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">Phone: {user.phone}</Typography>
              <Typography variant="body1">
                Website: <Link href={`https://${user.website}`} target="_blank" rel="noopener">{user.website}</Link>
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">Address</Typography>
              <Typography variant="body1">{user.address.street}, {user.address.suite}</Typography>
              <Typography variant="body1">{user.address.city}, {user.address.zipcode}</Typography>
              <Typography variant="body1">
                Geo: {user.address.geo.lat}, {user.address.geo.lng}
              </Typography>
            </Box>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Company</Typography>
            <Typography variant="body1">{user.company.name}</Typography>
            <Typography variant="body2">{user.company.catchPhrase}</Typography>
            <Typography variant="body2" color="text.secondary">{user.company.bs}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal; 