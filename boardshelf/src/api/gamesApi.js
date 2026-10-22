import titles from "../data/games.json";
import { CATEGORIES } from "../data/options";

const STORAGE_KEY = "boardshelf.games.v1";

function createInitialGames() {
  return titles.map((title, index) => {
    const category = CATEGORIES[index % CATEGORIES.length];
    const minPlayers = index % 4 === 0 ? 1 : 2;

    return {
      id: `game-${index + 1}`,
      title,
      category,
      minPlayers,
      maxPlayers: Math.max(minPlayers, 2 + (index % 5)),
      duration: 20 + (index % 12) * 10,
      rating: Number((6 + (index % 40) / 10).toFixed(1)),
      description:
        `${title} is part of the BoardShelf demonstration collection. ` +
        `Use this entry to explore the catalogue, compare games, ` +
        `and plan your next game night. ` +
        `Its category, player count, duration, and rating are sample data.`,
      createdAt: new Date(
        Date.UTC(2026, 0, 1, 0, index)
      ).toISOString(),
    };
  });
}

function readGames() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === null) {
    const initialGames = createInitialGames();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialGames));
    return initialGames;
  }

  let games;

  try {
    games = JSON.parse(stored);
  } catch {
    throw new Error("Saved catalogue data is not valid JSON.");
  }

  if (
    !Array.isArray(games) ||
    games.length < titles.length ||
    !games.every(
      (game) =>
        game &&
        typeof game.id === "string" &&
        typeof game.title === "string" &&
        typeof game.description === "string" &&
        CATEGORIES.includes(game.category) &&
        Number.isInteger(game.minPlayers) &&
        Number.isInteger(game.maxPlayers) &&
        Number.isFinite(game.duration) &&
        Number.isFinite(game.rating) &&
        Number.isFinite(Date.parse(game.createdAt))
    ) ||
    new Set(games.map((game) => game.id)).size !== games.length
  ) {
    throw new Error("Saved catalogue data has an invalid structure.");
  }

  return games;
}

function writeGames(games) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

function delay(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);

    function abort() {
      clearTimeout(timeoutId);
      signal?.removeEventListener("abort", abort);
      reject(new DOMException("Request aborted", "AbortError"));
    }

    signal?.addEventListener("abort", abort, { once: true });
  });
}

export function validateGame(values) {
  const errors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const minPlayers = Number(values.minPlayers);
  const maxPlayers = Number(values.maxPlayers);
  const duration = Number(values.duration);
  const rating = Number(values.rating);

  if (title.length < 2 || title.length > 80) {
    errors.title = "Enter a title between 2 and 80 characters.";
  }

  if (!CATEGORIES.includes(values.category)) {
    errors.category = "Choose a valid category.";
  }

  if (
    !Number.isInteger(minPlayers) ||
    minPlayers < 1 ||
    minPlayers > 20
  ) {
    errors.minPlayers = "Enter a whole number from 1 to 20.";
  }

  if (
    !Number.isInteger(maxPlayers) ||
    maxPlayers < 1 ||
    maxPlayers > 20
  ) {
    errors.maxPlayers = "Enter a whole number from 1 to 20.";
  } else if (maxPlayers < minPlayers) {
    errors.maxPlayers = "Maximum must be at least the minimum.";
  }

  if (
    !Number.isInteger(duration) ||
    duration < 5 ||
    duration > 600
  ) {
    errors.duration = "Enter a whole number from 5 to 600 minutes.";
  }

  if (
    values.rating === "" ||
    !Number.isFinite(rating) ||
    rating < 0 ||
    rating > 10 ||
    Math.abs(rating * 10 - Math.round(rating * 10)) > 0.000001
  ) {
    errors.rating = "Enter a rating from 0 to 10 with one decimal at most.";
  }

  if (description.length < 20 || description.length > 1500) {
    errors.description = "Write between 20 and 1500 characters.";
  }

  return errors;
}

export async function getGames({
  search = "",
  category = "",
  players = "",
  sort = "rating-desc",
  page = 1,
  pageSize = 12,
  signal,
}) {
  await delay(450, signal);

  const games = readGames();
  const normalizedSearch = search.trim().toLowerCase();

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      `${game.title} ${game.description}`
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCategory =
      category === "" || game.category === category;

    const playerCount = Number(players);

    const matchesPlayers =
      players === "" ||
      (game.minPlayers <= playerCount &&
        game.maxPlayers >= playerCount);

    return matchesSearch && matchesCategory && matchesPlayers;
  });

  const sortedGames = [...filteredGames].sort((first, second) => {
    let difference = 0;

    if (sort === "title-asc") {
      difference = first.title.localeCompare(second.title);
    } else if (sort === "duration-asc") {
      difference = first.duration - second.duration;
    } else if (sort === "newest") {
      difference =
        new Date(second.createdAt) - new Date(first.createdAt);
    } else {
      difference = second.rating - first.rating;
    }

    return difference || first.id.localeCompare(second.id);
  });

  const total = sortedGames.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * pageSize;

  return {
    items: sortedGames.slice(start, start + pageSize),
    total,
    collectionSize: games.length,
    totalPages,
    page: currentPage,
  };
}

export async function getGame(id, { signal } = {}) {
  await delay(450, signal);

  const game = readGames().find((item) => item.id === id);

  if (!game) {
    throw new Error("This game could not be found.");
  }

  return game;
}

export async function createGame(values, { signal } = {}) {
  await delay(600, signal);

  const errors = validateGame(values);

  if (Object.keys(errors).length > 0) {
    throw new Error("Please correct the form fields.");
  }

  const games = readGames();
  const title = values.title.trim();

  if (
    games.some(
      (game) => game.title.toLowerCase() === title.toLowerCase()
    )
  ) {
    throw new Error("A game with this title already exists.");
  }

  const game = {
    id: crypto.randomUUID(),
    title,
    category: values.category,
    minPlayers: Number(values.minPlayers),
    maxPlayers: Number(values.maxPlayers),
    duration: Number(values.duration),
    rating: Number(values.rating),
    description: values.description.trim(),
    createdAt: new Date().toISOString(),
  };

  writeGames([game, ...games]);

  return game;
}