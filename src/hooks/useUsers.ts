import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, SortConfig, QueryParams } from '../types/User';

//pagination tek seferde gelen verilerden ne kadar gelsin
const PAGE_SIZE = 5;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });

  const navigate = useNavigate();
  const location = useLocation();

  const parseQueryParams = useCallback((): QueryParams => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get('search') || '',
      sortKey: params.get('sortKey') || 'name',
      sortDirection: params.get('sortDirection') || 'asc',
      page: parseInt(params.get('page') || '1', 10)
    };
  }, [location.search]);

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    params.set('sortKey', sortConfig.key);
    params.set('sortDirection', sortConfig.direction);
    params.set('page', currentPage.toString());
    
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [navigate, location.pathname, searchQuery, sortConfig, currentPage]);

  useEffect(() => {
    const params = parseQueryParams();
    setSearchQuery(params.search);
    setSortConfig({
      key: params.sortKey as 'name' | 'email',
      direction: params.sortDirection as 'asc' | 'desc'
    });
    setCurrentPage(params.page);
  }, [parseQueryParams]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      setLoading(false);
    }
  }, []);

  const retryFetch = () => {
    fetchUsers();
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      let result = [...users];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
        );
      }
      
      result.sort((a, b) => {
        const valueA = a[sortConfig.key].toLowerCase();
        const valueB = b[sortConfig.key].toLowerCase();
        
        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
      
      setFilteredUsers(result);
      setTotalPages(Math.ceil(result.length / PAGE_SIZE));
      if (searchQuery !== parseQueryParams().search) {
        setCurrentPage(1);
      }
      updateUrl();
    }, 300); 

    return () => clearTimeout(debounceTimeout);
  }, [users, searchQuery, sortConfig, updateUrl, parseQueryParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const paginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const handleSort = (key: 'name' | 'email') => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    loading,
    error,
    users: paginatedData(),
    totalUsers: filteredUsers.length,
    currentPage,
    totalPages,
    searchQuery,
    sortConfig,
    handleSort,
    handlePageChange,
    handleSearch,
    retryFetch
  };
}; 