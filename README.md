# User Dashboard

This project is a React application that displays a list of users fetched from the JSONPlaceholder API. The application includes features such as sorting, filtering, pagination, and user detail viewing.

## Features

- Data from JSONPlaceholder API (https://jsonplaceholder.typicode.com/users)
- Name and email list with sortable columns
- Real-time filtering by name or email with 300ms debounce
- Pagination
- URL synchronization (filter and sort parameters in query string)
- User detail modal displaying all user information
- State management for loading, error, and empty states
- Dark/Light theme toggle with localStorage persistence

## Technologies Used

- React with TypeScript
- Material-UI for components and theming
- Axios for API requests
- React Router for URL handling

## How to Run

1. Make sure you have Node.js and npm installed on your machine.
2. Clone this repository or download the source code.
3. Navigate to the project directory in your terminal.
4. Run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

5. Open your browser and go to http://localhost:3000 to view the application.

## Project Structure

- `src/components/` - UI components
- `src/context/` - Theme context for dark/light mode
- `src/hooks/` - Custom hooks for data fetching and manipulation
- `src/types/` - TypeScript type definitions
