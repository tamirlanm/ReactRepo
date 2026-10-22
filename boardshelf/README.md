# BoardShelf

BoardShelf is a responsive React Single Page Application for exploring
and expanding a board game catalogue.

## Features

- 100 initial board game entries
- Catalogue and individual game pages
- Controlled form for adding games
- Client-side and simulated API validation
- Search by title and description
- Category filtering
- Player count filtering
- Sorting by rating, title, duration, and creation date
- Pagination with 12 games per page
- Loading, error, empty, and success states
- Persistent browser storage
- Responsive layout
- Request cancellation and search debounce

## Technology

- React
- Vite
- React Router
- JavaScript
- CSS
- Simulated asynchronous API
- localStorage

## Installation

```bash
npm install
npm run dev
```

Use a current Node.js LTS version compatible with Vite.

## Validation

```bash
npm run lint
npm run build
npm run preview
```

## Data source

The application uses one simulated API located in
`src/api/gamesApi.js`.

Initial titles come from `src/data/games.json`.

The API creates 100 initial records, simulates request delays
using Promises, and stores JSON data in localStorage.

Categories, player counts, durations, ratings, and descriptions
in the initial collection are demonstration data.
They are not official publisher information.

New games are stored in the current browser and origin.
They are not shared between users, browsers, or devices.
Clearing site storage removes locally added games.

## Routes

- `/#/` — catalogue
- `/#/games/:id` — game details
- `/#/add` — add a game

HashRouter allows page refreshes on static hosting without
server-side route rewrites.

## Components

- Layout
- StatusMessage
- GameArtwork
- GameCard
- GameFilters
- Pagination
- GameForm

## State management

Catalogue filters and pagination are stored in CatalogPage.

Form values, validation errors, and submission status
are stored in GameForm.

Game loading state is stored in GameDetailsContent.

Props and callbacks connect reusable components.

## Effects and cleanup

Catalogue requests use a 300 ms debounce.

Effects cancel pending timers and simulated requests
when dependencies change or components unmount.

Aborted requests cannot replace the current UI state.

GameDetailsContent uses the game ID as its key so that
navigating to another game resets its local state.

## Manual checks

1. Open the catalogue and confirm 100 initial games.
2. Search for an existing title.
3. Search for an unknown title and verify the empty state.
4. Combine category and player count filters.
5. Change sorting.
6. Navigate between pages.
7. Open and refresh a game detail page.
8. Submit an invalid form.
9. Add a valid game.
10. Refresh and confirm persistence.
11. Try adding a duplicate title.
12. Open an unknown game ID and verify the error state.
13. Verify the layout on a narrow screen.

## Deployment

Import the GitHub repository into Vercel.

Framework preset: Vite
Build command: npm run build
Output directory: dist