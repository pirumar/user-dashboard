import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Skeleton,
  Button,
  Pagination,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { User, SortConfig } from '../types/User';
import UserDetailModal from './UserDetailModal';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  sortConfig: SortConfig;
  handleSort: (key: 'name' | 'email') => void;
  handlePageChange: (page: number) => void;
  handleSearch: (query: string) => void;
  retryFetch: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  error,
  totalUsers,
  currentPage,
  totalPages,
  searchQuery,
  sortConfig,
  handleSort,
  handlePageChange,
  handleSearch,
  retryFetch
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const SearchBar = () => (
    <Box mb={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );

  const PaginationBar = () => {
    if (totalPages <= 1) {
      return <Box mt={2}></Box>;
    }
    
    return (
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Showing {users.length} of {totalUsers} users
        </Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => handlePageChange(page)}
          color="primary"
        />
      </Box>
    );
  };

  if (loading) {
    return (
      <>
        <SearchBar />
        <TableContainer component={Paper} elevation={3}>
          <Box p={2}>
            <Skeleton variant="rectangular" height={40} />
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationBar />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchBar />
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={retryFetch}>
              Try Again
            </Button>
          }
        >
          {error}
        </Alert>
        <PaginationBar />
      </>
    );
  }

  if (users.length === 0 && !loading && !error) {
    return (
      <>
        <SearchBar />
        <Box textAlign="center" py={4} component={Paper} elevation={3}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery 
              ? 'No users found matching your search criteria.'
              : 'No users available.'}
          </Typography>
        </Box>
        <PaginationBar />
      </>
    );
  }

  return (
    <>
      <SearchBar />

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'email'}
                  direction={sortConfig.key === 'email' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id}
                hover
                onClick={() => handleRowClick(user)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBar />

      <UserDetailModal
        user={selectedUser}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default UserTable; 