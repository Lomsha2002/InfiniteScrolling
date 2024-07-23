# Infinite Scrolling in React

This project demonstrates how to implement infinite scrolling in a React application using the `jsonplaceholder` API.

## Features

- Fetches posts from an API endpoint.
- Implements infinite scrolling to load more posts as the user scrolls down.
- Uses `axios` for API requests.
- Uses React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) for state management and side effects.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Lomsha2002/InfiniteScrolling.git
```

2. Navigate to the project directory:

```bash
cd InfiniteScrolling
```

3. Install the dependencies:

```bash
npm install
```

## Usage

1. Start the development server:

```bash
npm start
```

2. Open your browser and go to `http://localhost:3000`.

## Approach

### State Management

- **posts**: Stores the fetched posts.
- **page**: Tracks the current page number for API requests.
- **loading**: Manages the loading state.
- **hasMore**: Checks if there are more posts to load.

### Intersection Observer

- **observer**: A `useRef` hook to store the intersection observer.
- **lastPostElementRef**: A callback ref that sets up the observer on the last post element to trigger fetching more posts when it comes into view.

### Fetching Data

- **useEffect**: Triggers when the `page` changes, making an API call to fetch the next set of posts. Posts are appended to the existing list of posts.

### Rendering Posts

- Maps through the `posts` array and renders each post.
- Sets the `ref` to the last post element to observe it for triggering the next page load.
