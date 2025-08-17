const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week");
}

export async function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming");
}
