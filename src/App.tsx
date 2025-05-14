import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import UserTable from './components/UserTable';
import { useUsers } from './hooks/useUsers';

// Create a wrapper component that uses the useUsers hook
// This ensures the hook is used inside the Router context
const UserDashboard = () => {
  const {
    loading,
    error,
    users,
    totalUsers,
    currentPage,
    totalPages,
    searchQuery,
    sortConfig,
    handleSort,
    handlePageChange,
    handleSearch,
    retryFetch
  } = useUsers();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Paper sx={{ p: 3 }} elevation={2}>
          <UserTable
            users={users}
            loading={loading}
            error={error}
            totalUsers={totalUsers}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            sortConfig={sortConfig}
            handleSort={handleSort}
            handlePageChange={handlePageChange}
            handleSearch={handleSearch}
            retryFetch={retryFetch}
          />
        </Paper>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserDashboard />
      </ThemeProvider>
    </Router>
  );
}

export default App;
