export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface SortConfig {
  key: keyof Pick<User, 'name' | 'email'>;
  direction: 'asc' | 'desc';
}

export interface QueryParams {
  search: string;
  sortKey: string;
  sortDirection: string;
  page: number;
} 